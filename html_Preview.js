function togglePreview(btn) {
  const container = btn.closest('.code-sandbox');
  const previewBox = container.querySelector('.preview-container');
  const iframe = container.querySelector('.preview-iframe');
  const code = container.querySelector('code').innerText;

  // 判断当前是否正在显示
  if (previewBox.style.display === 'none') {
    // --- 执行显示逻辑 ---
    previewBox.style.display = 'block';
    btn.innerText = '关闭预览';
    btn.style.backgroundColor = '#ff4d4d'; // 变成红色表示关闭

    // 填充内容
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
  } else {
    // --- 执行隐藏逻辑 ---
    previewBox.style.display = 'none';
    btn.innerText = '运行预览';
    btn.style.backgroundColor = '#4CAF50'; // 恢复绿色
  }
}
