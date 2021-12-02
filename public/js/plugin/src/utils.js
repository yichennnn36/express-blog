export const escape = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const appendCommentToDOM = (container, comment, isPrepend) => {
  const html = `
    <div class="card mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span class="card-header-name">@ ${escape(comment.nickname)}</span>
        <span class="card-header-time">・${escape(comment.created_at)}</span>
      </div>
      <div class="card-body">
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `;
  isPrepend ? container.prepend(html) : container.append(html);
};

export const appendStyle = (cssTemplates) => {
  const styleElement = document.createElement('style');
  styleElement.appendChild(document.createTextNode(cssTemplates));
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}
