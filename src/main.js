'use strict';
function printReceipt(tags) {

    const allItems = loadAllItems();
    const cartItems = buildCartItems(tags, allItems);

    const allPromotions = loadPromotions();
    const receiptItems = buildReceiptItems(cartItems, allPromotions);

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

let buildReceiptItems = (cartItems,promotions)=>{
    return cartItems.map(cartItem=>{
            let promotionType = getPromotionType (cartItem.item.barcode,promotions);
    let {saved ,subTotal} = discount(cartItem,promotionType);
    return {cartItem,saved,subTotal};
})
}

let getPromotionType=(barcode,promotions)=>{
    let promotion = promotions.find(promotion=>promotion.barcodes.includes(barcode));

    return promotion?promotion.type:'';
}

let discount=(cartItem,promotionType)=>{
    let saveCount = 0;
    if(promotionType='BUY_TWO_GET_ONE_FREE'){
        saveCount = parseInt(cartItem.count /3);
    }
    let saved = saveCount*cartItem.item.price;
    let subTotal = cartItem.count * cartItem.item.price -saved;

    return {saved,subTotal};
}

let buildReceipt =(receiptItems)=>{
    let allSaved = 0;
    let allTotal = 0;
    for(let receiptItem of receiptItems){
        allSaved += receiptItem.saved;
        allTotal += receiptItem.subTotal;
    }
    return {receiptItems,allSaved,allTotal};
}

let buildReceiptText = (receipt)=>{

    let receiptItems = receipt.receiptItems.map(receiptItem=> {
            let cartItem = receiptItem.cartItem;
    return `名称：${cartItem.item.name}，\
数量：${cartItem.count}${cartItem.item.unit}，\
单价：${formate(cartItem.item.price)}(元)，\
小计：${formate(receiptItem.subTotal)}(元)`;
}).join('\n');

    return `***<没钱赚商店>收据***
${receiptItems}
----------------------
总计：${formate(receipt.allTotal)}(元)
节省：${formate(receipt.allSaved)}(元)
**********************`;
}

let formate = (price)=>{
    return price.toFixed(2);
}
module.exports = {
    buildCartItems:buildCartItems,
    buildReceiptItems:buildReceiptItems,
    buildReceipt:buildReceipt,
    printReceipt:printReceipt,
    buildReceiptText:buildReceiptText
};