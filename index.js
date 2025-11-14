
const {createApp} = Vue;
const vm = Vue.createApp({
    data() {
        let pc = !isMobile();
        return {
            md: markdownit({
                html: true,
                // xhtmlOut: false,
                // breaks: false,
                // linkify: true,
                // typographer: false,
                highlight: this.highlight
            }),
            // location.hostname 不包含端口
            isLocal: location.hostname == 'localhost'
                || location.hostname.endsWith('.localhost')
                || location.hostname.endsWith('.w.com')
                || location.hostname.startsWith('192.168.')
                || location.hostname.startsWith('127.')
            ,
            showMenu: true,
            isPc: pc,
            showTitle: pc,
            windowwidth: window.innerWidth,
            currentPath: '',
            codeStr: {}, // {id: str} for copy
            /**
             *  {
             *      path: {
             *          name: '',
             *          file: '', // 原始文件文本.split('\n')
             *          html: '',
             *          parent: '',
             *          titles: [{
             *              id: '',
             *              name: '',
             *              style: {},
             *              level: 1, // 1~6
             *          }]
             *      }
             *  }
             */
            articles: {},
            /*
             *  {
             *      parent: {
             *          path: 'name',
             *      }
             *  }
             */
            tags: {},
            /**
             *  [
             *      {
             *          path: '',
             *          title: '', // parent:name
             *          titleHL: '', // hight light
             *          lines: [], // match lines
             *          linesHL: [], // hight light
             *      }
             *  ]
             */
            searchList: [],
            searchListHis: {}, // {hotkey: searchList}
            searchHL: new HightlightAnd(k => `<span class="search-high-light">${k}</span>`),
            searchIdx: 0,
            showSearch: false,
            searchInput: '',
        }
    },
    async created() {
        addEscListener(this.esc);
        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'Escape': this.esc(); break;
                case '/': this.openSearch(); break;
                default: return;
            }
            // 不加这个会触发浏览器事件 导致触发blur事件
            e.preventDefault();
        });
        let text = await fetchTextFile('articles.json');
            let mjson = JSON.parse(text);
            let mstr = '', mmstr;
            let articles = {};
            for(var k in mjson) {
                mmstr = '';
                mjson[k].forEach(e => {
                    articles[e[1]] = {
                        name: e[0],
                        parent: k,
                    };
                    mmstr += `<li onclick="vm.openArticle('${e[1]}')">${e[0]}</li>`;
                });
                mstr += `<li>${k}<ol>${mmstr}</ol></li>`;
            }
            this.articles = articles;
            document.getElementById('menu_list').innerHTML = mstr;
        if (mstr = location.hash.substring(1)) {
            this.articles[mstr].file = (await fetchTextFile(mstr)).split('\n');
            this.openArticle(mstr);
        }
        for(let path in this.articles) {
            if (!this.articles[path].file) {
                fetchTextFile(path).then(text => 
                    this.articles[path].file = text.split('\n'));
            }
        }
    },
    methods: {
        openMenu() {
            let showMenu = this.showMenu;
            this.esc();
            this.showMenu = !showMenu;
        },
        openArticle(path) {
            let pobj = this.articles[path];
            if (!pobj.html) {
                this.toMd(path, this.articles[path].file.join('\n'));
            }
            if (!this.tags[pobj.parent]) {
                this.tags[pobj.parent] = {};
            }
            this.tags[pobj.parent][path] = pobj.name;
            this.currentPath = path;
            this.showTitle = (this.isPc || false);
            location.hash = path;
            this.esc();
        },
        toMd(path, text) {
            let temp = document.createElement('div');
            temp.innerHTML = this.md.render(text);
            let titles = temp.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let titlesHtml = [];
            let sty, level, idPre = Date.now();
            for (let i = 0; i < titles.length; i++) {
                level = titles[i].tagName.charAt(1)*1;
                // sty = level < 3 ? {} : {'padding-left': (level-2) * 20 + 'px'};
                titles[i].id = `${idPre}-${i}`;
                titlesHtml.push({
                    id: titles[i].id,
                    name: titles[i].innerText,
                    style: sty,
                    level: level
                });
            }
            this.articles[path].titles = titlesHtml;
            this.articles[path].html = temp.outerHTML;
        },
        jumpTo(id) {
            var section = document.getElementById(id);
            // 使用 scrollIntoView 方法滚动页面使得指定元素可见
            section.scrollIntoView({ behavior: 'smooth' });
        },
        copyCode(id) {
            copyToClipboard(this.codeStr[id])
            document.getElementById(id).innerText = 'copied';
            setTimeout(() => {
                document.getElementById(id).innerText = 'copy';
            }, 1000);
        },
        async refresh() {
            this.toMd(this.currentPath, await fetchTextFile(`${this.currentPath}?${uuid()}`));
        },
        openSearch() {
            this.esc();
            this.searchList = [];
            this.showSearch = true; // 异步渲染
            this.searchListHis = {};
            // 使用 $refs 来访问元素
            this.$nextTick(() => {
                this.$refs.searchInput.focus()
                // 浏览器会将原本的按键事件应用到新获得焦点的输入框中 这里清空输入框，反正是要清空的
                this.$refs.searchInput.value = '';
            });
        },
        doSearch(e) {
            const prevInput = this.searchInput, key = e.target.value.trim();
            this.searchInput = key;
            // 输入一致, 去除 空格 tab等
            if (key == prevInput) {
                return;
            }
            // 有效字符不小于2个
            if (key.length < 2) {
                this.searchList = [];
                return;
            }
            // 是否追加词
            const isAdd = key.startsWith(prevInput);
            // 先前输入没有匹配到， 后续就不必要走匹配逻辑了 ??
            if (isAdd && this.searchList.length == 0 && key.replaceAll(' ', '').length > 2) {
                return;
            }
            this.searchIdx = 0;
            // 完全匹配 一般是尾删
            if (this.searchListHis[key]) {
                this.searchList = this.searchListHis[key];
                return;
            }
            this.searchHL.setKeyword(key);
            // 中部删除 或 追加(尾部去几个即是) 或 中部追加(也是尾部删除)
            let findKey = e.target.value.substring(0, e.target.selectionStart - (e.data || '').length).trim();
            let searchList = [], findList = this.searchListHis[findKey];
            for (let i = key.length-1; i > 1 && !findList; i--) {
                findList = this.searchListHis[key.substring(0, i)];
            }
            if (findList) {
                findList.forEach(e => this.fillSearch(searchList, e.path, e.title, e.lines));
            } else {
                for (let path in this.articles) {
                    this.fillSearch(searchList, path,
                        `${this.articles[path].parent} :: ${this.articles[path].name}`,
                        this.articles[path].file);
                }
            }
            this.searchList = searchList;
            this.searchListHis[key] = searchList;
        },
        fillSearch (searchList, path, title, lines) {
            let lineHL, lineList = [], lineListHL = [], 
                titleHl = this.searchHL.highlight(title);
            lines.forEach(line => {
                if (lineHL = this.searchHL.highlight(line.replaceAll('<', '〈'))) {
                    lineList.push(line);
                    lineListHL.push(lineHL);
                }
            });
            if (titleHl || lineList.length > 0) {
                searchList.push({
                    path: path,
                    // 这俩 下次匹配
                    title: title, // parent:name
                    lines: lineList, // match lines
                    // 这俩 页面显示
                    titleHL: titleHl || title,
                    linesHL: lineListHL,
                });
            }
        },
        searchNext(offset) {
            this.searchIdx = (this.searchIdx + offset) % this.searchList.length;
        },
        searchEnter() {
            this.openArticle(this.searchList[this.searchIdx].path);
        },
        esc() {
            this.showSearch = false;
            this.showMenu = false;
        },
        highlight(code, lang, info) {
            let preCode = (typeof hljs !== "undefined" && null !== hljs && hljs.getLanguage(lang))
                ? hljs.highlight(code, { language: lang }).value : code;
            let id = uuid();
            this.codeStr[id] = code;
            preCode = preCode.split('\n');
            code = `<div class="language-tip">${lang} <span class="copy" id="${id}" onclick="vm.copyCode('${id}')">copy</span></div><ol class="code-ol">`;
            for (let i = 0; i < preCode.length; i++) {
                if(i == preCode.length-1 && !preCode[i]) break;
                code += `<li>${preCode[i]}</li>`;
            }
            return code + '</ol>';
        }
    }
}).mount('#app');
