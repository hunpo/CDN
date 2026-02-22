//博客里的html预览
function runPreview(btn) {
  // 1. 获取当前按钮所在的父容器
  const container = btn.parentElement;
  // 2. 提取代码块中的文本内容
  const code = container.querySelector('code').innerText;
  // 3. 找到预览容器和 iframe
  const previewBox = container.querySelector('.preview-container');
  const iframe = container.querySelector('.preview-iframe');

  // 4. 显示预览容器
  previewBox.style.display = 'block';

  // 5. 将代码写入 iframe
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();

  // 滚动到预览位置（可选）
  previewBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
