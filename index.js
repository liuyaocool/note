
const {createApp} = Vue;
const vm = createApp({
    data() {
        return {
            md: markdownit({highlight: this.highlight}),
            version: '0.1',
            showMenu: true,
            showTitle: false,
            windowwidth: window.innerWidth,
            currentPath: '',
            codeStr: {}, // {id: str} for copy
            /**
             *  {
             *      path: {
             *          name: '',
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
        }
    },
    created() {
        this.getFileText('articles.json', text => {
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
            if (location.hash) {
                this.openArticle(location.hash.substr(1));
            }
        });
    },
    methods: {
        openArticle(path) {
            let pobj = this.articles[path];
            if (!pobj.html) {
                this.getFileText(path, text => this.setArticle(path, text));
            }
            if (!this.tags[pobj.parent]) {
                this.tags[pobj.parent] = {};
            }
            this.tags[pobj.parent][path] = pobj.name;
            this.currentPath = path;
            this.showMenu = false;
            this.showTitle = false;
            location.hash = path;
        },
        setArticle(path, text) {
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
        getFileText(path, success) {
            fetch(`${path}?v=${this.version}`).then(resp => {
                if(resp.ok) resp.text().then(str => success(str));
            });
        },
        copyCode(id) {
            copyToClipboard(this.codeStr[id])
            document.getElementById(id).innerText = 'copied';
            setTimeout(() => {
                document.getElementById(id).innerText = 'copy';
            }, 1000);
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
