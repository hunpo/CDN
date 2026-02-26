window.runBloggerDemo = function (btn) {
  const wrapper = btn.closest('.custom-demo-wrapper');
  const previewArea = wrapper.querySelector('.preview-area');
  const iframe = wrapper.querySelector('.demo-frame');

  // --- 逻辑 1: 实现点击切换显示/隐藏 ---
  if (previewArea.style.display === 'block') {
    previewArea.style.display = 'none';
    btn.textContent = '点击运行预览';
    btn.style.background = '#007bff';
    return;
  }

  // --- 逻辑 2: 获取并清理代码 ---
  let html = wrapper.querySelector('.raw-html').textContent;
  html = html.replace(/<link.*?>/gi, ''); // 清理 link 标签
  const css = wrapper.querySelector('.raw-css').textContent;
  const js = wrapper.querySelector('.raw-js').textContent;

  // --- 逻辑 3: 构建缩放自适应内容 ---
  const fullContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                html, body { margin: 0; padding: 0; font-family: sans-serif; overflow-x: hidden; }
                body { padding: 0; display: inline-block; transform-origin: 0 0; }
                ${css}
            </style>
        </head>
        <body>
            <div id="inner-canvas" style="display: inline-block; min-width: 1200px; transform-origin: 0 0;">
                ${html}
            </div>
            <script>
                function adapt() {
                    const canvas = document.getElementById('inner-canvas');
                    const iframeWidth = window.innerWidth;
                    const baseWidth = 1200; // 你的设计基准宽度
                    
                    if (iframeWidth < baseWidth) {
                        const scale = iframeWidth / baseWidth;
                        canvas.style.transform = 'scale(' + scale + ')';
                    }
                    
                    // 发送高度给父级，加上 20px 缓冲
                    const h = canvas.getBoundingClientRect().height;
                    window.parent.postMessage({ type: 'resize', height: h + 20 }, '*');
                }
                window.onload = adapt;
                window.onresize = adapt;
                ${js}
            <\/script>
        </body>
        </html>
    `;

  // --- 逻辑 4: 执行渲染 ---
  iframe.srcdoc = fullContent;
  previewArea.style.display = 'block';
  btn.textContent = '隐藏预览窗口';
  btn.style.background = '#dc3545'; // 运行后变红色提示关闭

  // 监听高度调整
  if (!window.hasIframeListener) {
    window.addEventListener('message', function (e) {
      if (e.data.type === 'resize') {
        // 找到所有的 iframe，只调整发消息的那一个（可选优化）
        // 这里简单处理：调整当前可见的 iframe
        const iframes = document.querySelectorAll('.demo-frame');
        iframes.forEach((f) => {
          if (f.contentWindow === e.source)
            f.style.height = e.data.height + 'px';
        });
      }
    });
    window.hasIframeListener = true;
  }
};
