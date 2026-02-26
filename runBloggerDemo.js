window.runBloggerDemo = function (btn) {
  const wrapper = btn.closest('.custom-demo-wrapper');
  if (!wrapper) return;

  // 获取数据并清理 HTML 里的错误引用
  let html = wrapper.querySelector('.raw-html').textContent;
  // 自动删除代码中可能残留的本地 CSS 引用，防止报错
  html = html.replace(/<link.*?>/gi, '');

  const css = wrapper.querySelector('.raw-css').textContent;
  const js = wrapper.querySelector('.raw-js').textContent;
  const previewArea = wrapper.querySelector('.preview-area');
  const iframe = wrapper.querySelector('.demo-frame');

  // 组装内容：增加基础 CSS 确保 iframe 内部内容自适应
  const fullContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* 强制修正：确保演示内容不超出容器 */
                body { margin: 0; padding: 10px; font-family: sans-serif; overflow-x: hidden; }
                img, div, section { max-width: 100%; box-sizing: border-box; }
                ${css}
            </style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;

  // 替代 document.write() 的方案：使用 srcdoc
  iframe.srcdoc = fullContent;

  // 显示预览区域
  previewArea.style.display = 'block';
  btn.textContent = '刷新预览';
};
