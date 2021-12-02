export const formTemplate = `
  <div>
    <h1 class="board-title mb-5 fw-bolder">Write your Message Here!</h1>
    <div class="row">
      <div>
        <form class="add-comments-form">
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">@</span>
            <input type="text" name="nickname" class="form-control" placeholder="請輸入暱稱" aria-label="nickname" aria-describedby="addon-wrapping">
          </div>
          <div class="input-group mt-3">
            <textarea type="text" name="content" class="form-control" rows="8" placeholder="請輸入留言：）" aria-label="input content" aria-describedby="button-addon2"></textarea>
          </div>
          <div class="submit-btn text-end"><button class="btn mt-3 mb-5" type="submit" id="input-submit">送出</button></div>
        </form>
      </div>
      <div>
        <div class="comments">
        <!-- js 動態產生內容 -->
        </div>
        <div class="submit-btn text-center mt-4">
          <button type="button" class="hide btn btn-sm" id="load-btn">Read more...</button>
        </div>
      </div>
    </div>
  </div>
`;

export const cssTemplates = `
  * {
    font-family: 'Varela Round', sans-serif;
  }
  .board-title {
    font-size: 30px;
    color: #E7A675;
  }
  .btn {
    background-color: #E7A675;
    color: white;
  }
  .card-header-time {
    font-size: 12px;
    color: #E7A675;
    min-width: 137px;
    margin-left: 5px;
  }
  .card-text {
    white-space: pre-line;
  }
  .hide {
    display: none;
  }
`;
