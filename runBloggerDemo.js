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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* 确保内容从左上角开始缩放 */
                html, body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: sans-serif; 
                    overflow-x: hidden; /* 防止横向滚动条 */
                }
                body { padding: 10px; box-sizing: border-box; }
                
                /* 强制覆盖用户的固定大宽度，确保基础响应式 */
                * { max-width: 100% !important; box-sizing: border-box !important; }
                
                ${css}
            </style>
        </head>
        <body>
            <div id="demo-content-wrapper">
                ${html}
            </div>
            <script>
                // 通知父窗口高度
                function sendHeight() {
                    const height = document.documentElement.scrollHeight;
                    window.parent.postMessage({ type: 'resize', height: height }, '*');
                }
                window.onload = sendHeight;
                // 如果有图片加载，重新计算高度
                window.addEventListener('resize', sendHeight);
                ${js}
            <\/script>
        </body>
        </html>
    `;

  // 1. 设置内容
  iframe.srcdoc = fullContent;

  // 2. 监听来自 iframe 的高度调整请求
  window.addEventListener(
    'message',
    function (e) {
      if (e.data.type === 'resize') {
        iframe.style.height = e.data.height + 'px';
      }
    },
    false,
  );

  // 3. UI 切换
  previewArea.style.display = 'block';
  btn.textContent = '刷新预览';
};
