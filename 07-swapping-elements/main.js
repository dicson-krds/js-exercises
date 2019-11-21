const stockId = document.getElementById('stock'),
  cartId = document.getElementById('cart'),
  totalId = document.getElementById('total');

let tempAry = [],
  itemLi = document.querySelectorAll('li'),
  stockLi = document.querySelectorAll('#stock li'),
  cartLi = document.querySelectorAll('#cart li');

const view = {
  stockHandle: () => {
    tempAry = [];
    Array.from(document.querySelectorAll('#stock li')).forEach(function (ele) {
      ele.addEventListener('click', control.stock);
    });
  },
  cartHandle: (e) => {
    Array.from(document.querySelectorAll('#cart li')).forEach(function (ele) {
      ele.addEventListener('click', control.cart);
    });
  },
  totalHandle: (e) => {
    totalId.innerHTML = 'Cart (' + e + ')';
  },
  init: () => {
    document.getElementsByTagName('button')[0].addEventListener('click', control.clearCart);
    view.stockHandle();
    view.cartHandle();
  }
}



const control = {
  stock: (e) => {
    let SKcount = e.currentTarget.textContent.match(/(\d+)/)[0],
      SKitem = e.currentTarget.textContent.match(/[A-Z, a-z]/g).join(''),
      cartLi = document.querySelectorAll('#cart li'),
      tempcartLiAry = [],
      tempCount = 0;

    Array.from(cartLi).map(eve => {
      let SKCTitem = eve.textContent.match(/[A-Z, a-z]/g).join(''),
        SKCTcount = eve.textContent.match(/(\d+)/)[0];

      tempcartLiAry[SKCTitem] = parseInt(SKCTcount);

      return eve
    });

    if (SKcount != 0) {
      SKcount = --SKcount;
      e.currentTarget.innerHTML = SKitem + '(' + SKcount + ')';

      if (typeof (tempcartLiAry[SKitem]) != 'undefined') {

        tempcartLiAry[SKitem] = tempcartLiAry[SKitem] + 1;
        cartLi[Object.keys(tempcartLiAry).indexOf(SKitem)].innerHTML = SKitem + '(' + tempcartLiAry[SKitem] + ')';

        view.totalHandle(Object.values(tempcartLiAry).reduce(function (a, b) { return a + b }));

      } else {
        cartId.innerHTML += '<li>' + SKitem + '(' + ++tempCount + ')</li>';

        cartLi = document.querySelectorAll('#cart li');
        Array.from(cartLi).map(eve => {
          let SKCTitem = eve.textContent.match(/[A-Z, a-z]/g).join(''),
            SKCTcount = eve.textContent.match(/(\d+)/)[0];

          tempcartLiAry[SKCTitem] = parseInt(SKCTcount);

          return eve
        });

        view.totalHandle(Object.values(tempcartLiAry).reduce(function (a, b) { return a + b }));
      }
      if (SKcount == 0) {
        e.currentTarget.style.backgroundColor = "red";
      }
    }

    view.cartHandle();
  },
  cart: (e) => {
    let Ctcount = e.currentTarget.textContent.match(/(\d+)/)[0],
      Ctitem = e.currentTarget.textContent.match(/[A-Z, a-z]/g).join(''),
      tempstockLiAry = [],
      tempstockLiAry2 = [];

    Array.from(document.querySelectorAll('#stock li')).map(eve => {
      let CTSKitem = eve.textContent.match(/[A-Z, a-z]/g).join(''),
        CTSKcount = eve.textContent.match(/(\d+)/)[0];

      tempstockLiAry[CTSKitem] = parseInt(CTSKcount);

      return eve
    });


    Array.from(document.querySelectorAll('#cart li')).map(even => {
      let CTSKitem2 = even.textContent.match(/[A-Z, a-z]/g).join(''),
        CTSKcount2 = even.textContent.match(/(\d+)/)[0];


      tempstockLiAry2[CTSKitem2] = parseInt(CTSKcount2);

      return even
    });

    if (Ctcount != 0) {
      Ctcount = --Ctcount;
      e.currentTarget.innerHTML = Ctitem + '(' + Ctcount + ')';

      if (typeof (tempstockLiAry[Ctitem]) != 'undefined') {

        tempstockLiAry[Ctitem] = tempstockLiAry[Ctitem] + 1;
        stockLi[Object.keys(tempstockLiAry).indexOf(Ctitem)].innerHTML = Ctitem + '(' + tempstockLiAry[Ctitem] + ')';
        stockLi[Object.keys(tempstockLiAry).indexOf(Ctitem)].style.backgroundColor = "royalblue";


        view.totalHandle(Object.values(tempstockLiAry2).reduce(function (a, b) { return a + b }) - 1);

      }
      if (Ctcount == 0) {
        e.currentTarget.parentNode.removeChild(e.currentTarget);
      }
    }
  },
  total: () => {

  },
  clearCart: () => {
    itemLi = document.querySelectorAll('li');
    view.totalHandle(0);
    cartId.innerHTML = '';
    stockId.innerHTML = '';

    Array.from(itemLi).map(eve => {
      let itemStr = eve.textContent.match(/[A-Z, a-z]/g).join(''),
        itemNo = eve.textContent.match(/(\d+)/)[0];

      if (typeof (tempAry[itemStr]) == 'undefined') {
        tempAry[itemStr] = parseInt(itemNo);
      } else {
        tempAry[itemStr] = parseInt(itemNo) + tempAry[itemStr];
      }

      return eve
    })

    for (let i in tempAry) {
      stockId.innerHTML += '<li>' + i + '(' + tempAry[i] + ')</li>';
    }
    view.stockHandle();
  }
}

view.init();
