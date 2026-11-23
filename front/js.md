# 录制video视频

> 将下边代码修改 斌复制到开发者工具执行, 执行前先播放视频

```javascript
(function(){
    let video = document.getxxx;
    console.log('开始录制（最高画质模式 + 音频）');

    // 创建 Canvas 并设置为视频原始分辨率
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    // ========== 1. 获取视频流和音频流 ==========
    // 视频流：从 Canvas 获取
    const videoStream = canvas.captureStream(30); // 30fps
    
    // 音频流：从 video 元素获取
    const audioStream = video.captureStream().getAudioTracks();
    
    // 合并视频和音频流
    const combinedStream = new MediaStream();
    
    // 添加视频轨道
    videoStream.getVideoTracks().forEach(track => {
        combinedStream.addTrack(track);
    });
    
    // 添加音频轨道
    audioStream.forEach(track => {
        combinedStream.addTrack(track);
    });
    
    console.log('视频轨道数:', videoStream.getVideoTracks().length);
    console.log('音频轨道数:', audioStream.length);

    // ========== 2. 检测最佳编码器 ==========
    let mimeType = 'video/webm;codecs=vp9,opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8,opus';
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=h264,opus';
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
    }

    console.log('使用编码器:', mimeType);

    // ========== 3. 配置录制参数 ==========
    const options = {
        mimeType: mimeType,
        videoBitsPerSecond: 25000000, // 25 Mbps
        audioBitsPerSecond: 320000    // 320 kbps
    };

    let mediaRecorder = new MediaRecorder(combinedStream, options);
    const videoData = [];
    let animationId = null;

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            videoData.push(e.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(videoData, { type: mimeType });
        const a = document.createElement('a');
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        a.href = URL.createObjectURL(blob);
        a.download = `${document.title || 'video'}_high_quality.${ext}`;
        a.click();
        URL.revokeObjectURL(a.href);
        canvas.remove();
        console.log('录制完成，文件大小:', (blob.size / 1024 / 1024).toFixed(2), 'MB');
    };

    // ========== 4. 绘制每一帧到 Canvas ==========
    function drawFrame() {
        if (!video.paused && !video.ended && video.readyState >= 2) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        if (!video.ended) {
            animationId = requestAnimationFrame(drawFrame);
        }
    }

    // ========== 5. 处理结束事件 ==========
    video.addEventListener('ended', () => {
        console.log('视频结束，停止录制');
        if (animationId) cancelAnimationFrame(animationId);
        if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }
    });

    // ========== 6. 启动录制 ==========
    video.currentTime = 0;
    mediaRecorder.start(1000);
    video.play();
    drawFrame();
    
    console.log('录制已启动');
    console.log('分辨率:', canvas.width, 'x', canvas.height);
    console.log('音频已启用');
})();
```

# js 方法

```javascript

function uuid() {
    return crypto.randomUUID().replaceAll('-', '');
}

// 页面 esc 事件
function pageEscListener(listener) {
    let func = () => listener();
    window.addEventListener('blur', func);
    document.addEventListener('scroll', func); 
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') listener();
    });
    document.addEventListener("keydown", e => {
        if (e.key === 'Escape') listener();
    });
}
```