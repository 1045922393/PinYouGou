$(() => {


  let jsonStr = localStorage.getItem('myshopcar');
  let sqlArr = JSON.parse(jsonStr) || [];   //定义数据库的数组

  if (sqlArr.length == 0) {                 //判断本地数据库是否为空
    $('.cart-header').addClass('hidden');     //将该有的显示,不该有的隐藏
    $('.item-list').addClass('hidden');
  } else {
    $('.empty-tip').addClass('hidden');       //将该有的显示,不该有的隐藏
    $('.total-of').removeClass('hidden');
    let html = '';                              //将本地数据库的数组转化为结构输出
    sqlArr.forEach(function (e) {
      html += `<div class="item" data-id=${e.pID}>
      <div class="row">
        <div class="cell col-1 row">
          <div class="cell col-1">
            <input type="checkbox" class="item-ck" checked="true">
          </div>
          <div class="cell col-4">
            <img src=${e.imgSrc} alt="">
          </div>
        </div>
        <div class="cell col-4 row">
          <div class="item-name">${e.name}</div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="price">${e.price}</em>
        </div>
        <div class="cell col-1 tc lh70">
          <div class="item-count">
            <a href="javascript:void(0);" class="reduce fl">-</a>
            <input autocomplete="off" type="text" class="number fl" value=${e.number}>
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${e.price * e.number}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
    </div>`;
    })
    $('.item-list').html(html);
    computting();

    $('.pick-all').on('click', function () {
      let selectAll = $(this).prop('checked');
      $('.item-ck').prop('checked', selectAll);
      $('.pick-all').prop('checked', selectAll);
      computting();
    })
    $('.item-list').on('click', '.item-ck', function () {
      // $('.item-ck').on('click', function () {
      let selectEach = $('.item-ck').length == $('.item-ck:checked').length;
      $('.pick-all').prop('checked', selectEach);
      computting();


    })
  }
  function computting() {
    let selectedCount = 0;
    let selectedMoney = 0;
    $('.item-ck:checked').each((i, e) => {
      // console.log()
      let selectID = $(e).parents('.item').attr('data-id')
      let obj = sqlArr.find(function (e) {
        return e.pID == selectID
      })
      selectedCount += obj.number;
      selectedMoney += obj.number * obj.price;
    })
    $('.total-of .selected').text(selectedCount);
    $('.total-of .total-money').text(selectedMoney);
  }

})