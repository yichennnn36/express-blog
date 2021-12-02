import $ from 'jquery';
import { getComments, addComments } from './api';
import { formTemplate, cssTemplates } from './templates';
import { appendCommentToDOM, appendStyle } from './utils';

export const init = (options) => {
  let cursor = null;
  let isLastPage = false;
  const { siteKey, apiUrl, containerSelector } = options;
  const formSelector = `.add-comments-form`;
  const commentSelector = `.comments`;
  const loadButton = `#load-btn`;

  const containerElement = $(containerSelector);
  containerElement.append(formTemplate);
  appendStyle(cssTemplates);

  const renderComments = () => {
    getComments(apiUrl, siteKey, cursor, (data) => {
      const comments = data.discussions;
      isLastPage = data.is_last_page;

      if (isLastPage) {
        for (const comment of comments) {
          appendCommentToDOM(commentsDOM, comment);
        }
        return $(loadButton).hide();
      }
      for (let i = 0; i < 5; i++) {
        appendCommentToDOM(commentsDOM, comments[i]);
      }
      $(loadButton).show();
      cursor = comments[comments.length - 2].id;
    });
  };

  const commentsDOM = $(commentSelector);
  renderComments();

  $(formSelector).submit((e) => {
    e.preventDefault();
    const submitButton = `#input-submit`;
    const nicknameDOM = `input[name=nickname]`;
    const contentDOM = `textarea[name=content]`;

    $(submitButton).attr('disabled', true);
    setTimeout(() => {
      $(submitButton).removeAttr('disabled');
    }, 1000);

    addComments(() => {
      getComments(siteKey, null, (data) => {
        const comments = data.discussions;
        appendCommentToDOM(commentsDOM, comments[0], true);
      });
      $(nicknameDOM).val('');
      $(contentDOM).val('');
    });
  });

  $(loadButton).click(() => {
    renderComments();
  });
};
