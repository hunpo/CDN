function runBloggerDemo(btn) {
  const wrapper = btn.closest('.custom-demo-wrapper');
  const html = wrapper.querySelector('.raw-html').textContent;
  const css = wrapper.querySelector('.raw-css').textContent;
  const js = wrapper.querySelector('.raw-js').textContent;
  const previewArea = wrapper.querySelector('.preview-area');
  const iframe = wrapper.querySelector('.demo-frame');

  // 组装内容
  const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { margin: 0; padding: 20px; font-family: sans-serif; }
                ${css}
            <\/style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;

  // 填充 iframe
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(content);
  doc.close();

  // 显示预览区域
  previewArea.style.display = 'block';
  btn.textContent = '刷新预览';
}
