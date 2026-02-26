window.runBloggerDemo = function (btn) {
  const wrapper = btn.closest('.custom-demo-wrapper');
  if (!wrapper) return;

  let html = wrapper.querySelector('.raw-html').textContent;
  html = html.replace(/<link.*?>/gi, '');

  const css = wrapper.querySelector('.raw-css').textContent;
  const js = wrapper.querySelector('.raw-js').textContent;
  const previewArea = wrapper.querySelector('.preview-area');
  const iframe = wrapper.querySelector('.demo-frame');

  const fullContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                html, body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: sans-serif;
                    /* 允许横向滚动以测量真实宽度，但我们要通过缩放解决它 */
                }
                body { padding: 0; box-sizing: border-box; position: absolute; left: 0; top: 0; }
                
                ${css}
            </style>
        </head>
        <body>
            <div id="inner-canvas" style="display: inline-block; min-width: 1200px; transform-origin: 0 0;">
                ${html}
            </div>
            <script>
                function adaptLayout() {
                    const canvas = document.getElementById('inner-canvas');
                    const iframeWidth = window.innerWidth;
                    // 假设你的设计基准宽度是 1200px (即你想要完整看到的宽度)
                    const baseWidth = 1200; 
                    
                    if (iframeWidth < baseWidth) {
                        const scale = iframeWidth / baseWidth;
                        canvas.style.transform = 'scale(' + scale + ')';
                    } else {
                        canvas.style.transform = 'none';
                        canvas.style.width = '100%';
                    }

                    // 通知父窗体高度（缩放后的高度）
                    const actualHeight = canvas.getBoundingClientRect().height;
                    window.parent.postMessage({ type: 'resize', height: actualHeight + 20 }, '*');
                }

                window.onload = adaptLayout;
                window.onresize = adaptLayout;
                ${js}
            <\/script>
        </body>
        </html>
    `;

  iframe.srcdoc = fullContent;

  // 监听高度调整
  const messageHandler = function (e) {
    if (e.data.type === 'resize') {
      iframe.style.height = e.data.height + 'px';
    }
  };
  // 防止重复绑定监听器
  window.removeEventListener('message', messageHandler);
  window.addEventListener('message', messageHandler, false);

  previewArea.style.display = 'block';
  btn.textContent = '刷新预览';
};
