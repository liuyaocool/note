# 录制video视频

> 将下边代码修改 斌复制到开发者工具执行, 执行前先播放视频

```javascript
(function(){
    // 这里替换, 获得video dom元素
    let video = document.getxxx;
    console.log('开始录屏');
    const videoData = [];
    video.captureStream = video.captureStream || video.mozCaptureStream;
    let mediaRecorder = new MediaRecorder(video.captureStream());
    mediaRecorder.ondataavailable = (e) => {
        console.log(e)
        videoData.push(e.data);
    };
    mediaRecorder.onstop = (e) => {
        const blob = new Blob(videoData, { type: 'video/mp4;codecs=vp8,opus' });
        let adom = document.createElement('a');
        adom.href = window.URL.createObjectURL(blob);
        adom.download = document.title;
        adom.click();
    }
    video.addEventListener('ended', function() {
        console.log('录制结束');
        mediaRecorder.stop();
    });
    mediaRecorder.start();
    video.currentTime = 0;
    video.play();
})();
```