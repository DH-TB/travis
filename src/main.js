'use strict';

var fixtures = require('../spec/fixtures.js');

function printReceipt(tags) {
    const allItems = fixtures.loadAllItems();
    const cartItems = buildCartItems(tags, allItems);

    const promotions = fixtures.loadPromotions();
    const receiptItems = buildReceiptItems(cartItems, promotions);

    const receipt = buildReceipt(receiptItems);
    const receiptText = buildReceiptText(receipt);

    console.log(receiptText);
}

function buildCartItems(inputs, allItems) {
    let cartItems = [];

    for (let input of inputs) {
        let str = input.split('-');
        let barcode = str[0];
        let count = parseFloat(str[1] || 1);

        let cartItem = cartItems.find(cartItem=>cartItem.item.barcode === barcode);

        if (cartItem) {
            cartItem.count++;
        }
        else {
            let item = allItems.find(item=>item.barcode === barcode);
            cartItems.push({item: item, count: count});
        }
    }

    return cartItems;
}

function buildReceiptItems(cartItems, promotions) {
    return cartItems.map(cartItem=> {
        let promotionType = findPromotionType(cartItem.item.barcode, promotions);
        let {saved, subTotal, saveCount} = disCount(cartItem, promotionType);
        return {cartItem, saved, subTotal, saveCount, promotionType};
    })
}

function findPromotionType(barcode, promotions) {
    let promotion = promotions.find(promotion=>promotion.barcodes.includes(barcode));

    return promotion ? promotion.type : '';
}

function disCount (cartItem, promotionType) {
    let saved = 0;
    let saveCount = 0;
    let subTotal = cartItem.count * cartItem.item.price;

    if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
        saveCount = parseInt(cartItem.count / 3);
        saved = saveCount * cartItem.item.price;
    }
    if (promotionType === '95_DISCOUNT') {
        saved = subTotal * 0.05;
    }
    subTotal -= saved;
    return {saved, subTotal, saveCount};
}

function buildReceipt(receiptItems) {
    let allSaved = 0;
    let allTotal = 0;
    for (let receiptItem of receiptItems) {
        allSaved += receiptItem.saved;
        allTotal += receiptItem.subTotal;
    }
    return {receiptItems, allSaved, allTotal};
}
/*
function promotionsText(receiptItems) {
    var text = '';
    var title = '';

    receiptItems.forEach(function (receiptItem) {
        var item = receiptItem.cartItem.item;

        if (receiptItem.promotionType == 'BUY_TWO_GET_ONE_FREE') {
            title = (receiptItem.promotionType) ? ('----------------------\n买二赠一商品：') : '';

            text += '\n'+ '名称：' + item.name + '，数量：' + receiptItem.saveCount + item.unit;
        }
    });
    text = title + text;
    return text;
}*/

function promotionsText(receiptItems) {
    let title = '';

    let text = receiptItems.map(receiptItem=> {
        const cartItem = receiptItem.cartItem;
        if (receiptItem.promotionType == 'BUY_TWO_GET_ONE_FREE') {
            title = (receiptItem.promotionType) ? (`----------------------
买二赠一商品：`) : ``;
            return `名称：${cartItem.item.name}，数量：${receiptItem.saveCount}${cartItem.item.unit}`;
        }
    }).join('\n');

    return `${title}${text}`;



function text(receiptItems) {
   return receiptItems.map(receiptItem=> {
        let cartItem = receiptItem.cartItem;
        return `名称：${cartItem.item.name}，\
数量：${cartItem.count}${cartItem.item.unit}，\
单价：${formate(cartItem.item.price)}(元)，\
小计：${formate(receiptItem.subTotal)}(元)`;
    }).join('\n');
}

function buildReceiptText(receipt) {
    return `***<没钱赚商店>收据***
${text(receipt.receiptItems)}
${promotionsText(receipt.receiptItems) || ''}
----------------------
总计：${formate(receipt.allTotal)}(元)
节省：${formate(receipt.allSaved)}(元)
**********************`;
}

let formate = (price)=> {
    return price.toFixed(2);
}

module.exports = {
    buildCartItems: buildCartItems,
    buildReceiptItems: buildReceiptItems,
    buildReceipt: buildReceipt,
    printReceipt: printReceipt,
    buildReceiptText: buildReceiptText,
    promotionsText:promotionsText
};
