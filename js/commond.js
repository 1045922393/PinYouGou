let PYG = {};

PYG.littleCar = function () {
    let dataString = localStorage.getItem('myshopcar');
    let shopArr = JSON.parse(dataString);
    let number = 0;
    shopArr.forEach(function (e, i) {
        number += e.number;
    })
    $('.shopcar .count').text(number);
}