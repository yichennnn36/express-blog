import $ from 'jquery';

export const getComments = (apiUrl, siteKey, cursor, callback) => {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  $.ajax({
    type: 'GET',
    url,
    success: (response) => {
      if (!response.ok) {
        alert(response.error_message);
        return;
      }
      callback(response);
    }
  });
};

export const addComments = (siteKey, apiUrl, callback) => {
  const newCommentDOM = {
    site_key: siteKey,
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  };
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data: newCommentDOM,
    success: (response) => {
      if (!response.ok) {
        alert(response.error_message);
        return;
      }
      callback(response);
    }
  });
};
