var mainData = require('../src/main.js');
var fixtures = require('./fixtures.js');

'use strict';

describe('pos', () => {
    let inputs;
let allItems;

beforeEach(() => {
    allItems = fixtures.loadAllItems();
inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
});

it('should print correct text', () => {

    spyOn(console, 'log');

printReceipt(inputs);

const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

expect(console.log).toHaveBeenCalledWith(expectText);
});

it('build cartItems', () => {

    const expectCartItems = [
        {
            item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            count: 5
        },
        {
            item: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            count: 2
        },
        {
            item: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            },
            count: 3
        }
    ];
expect(mainData.buildCartItems(inputs, allItems)).toEqual(expectCartItems);
});
});

describe('buildReceiptItems', ()=> {
    let cartItems;
let promotions;

beforeEach(()=> {
    promotions = fixtures.loadPromotions();
cartItems = [
    {
        item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        count: 5
    },
    {
        item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        count: 2
    },
    {
        item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        },
        count: 3
    }
];
});

it('should print receiptItems ', ()=> {
    const expectText = [
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00
                },
                count: 5
            },

            saved: 3.00,
            subTotal: 12.00
        },
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                count: 2
            },
            saved: 0.00,
            subTotal: 30.00

        },
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 3
            },
            saved: 4.5,
            subTotal: 9.00
        }
    ];
expect(mainData.buildReceiptItems(cartItems, promotions)).toEqual(expectText);
});
});

describe('buildReceipt', ()=> {
    let receiptItems = [
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00
                },
                count: 5
            },

            saved: 3.00,
            subTotal: 12.00
        },
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                count: 2
            },
            saved: 0.00,
            subTotal: 30.00

        },
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 3
            },
            saved: 4.5,
            subTotal: 9.00
        }
    ];

it('build receipt', ()=> {
    const expectText =
    {
        receiptItems: [
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3.00
                    },
                    count: 5
                },
                saved: 3.00,
                subTotal: 12.00
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15.00
                    },
                    count: 2
                },
                saved: 0.00,
                subTotal: 30.00

            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000005',
                        name: '方便面',
                        unit: '袋',
                        price: 4.50
                    },
                    count: 3
                },
                saved: 4.5,
                subTotal: 9.00
            }],
        allSaved: 7.50,
        allTotal: 51.00
    };
expect(mainData.buildReceipt(receiptItems)).toEqual(expectText);
});

});

describe('buildReceiptText', ()=> {
    var receipt =
    {
        receiptItems: [
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3.00
                    },
                    count: 5
                },
                saved: 3.00,
                subTotal: 12.00
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15.00
                    },
                    count: 2
                },
                saved: 0.00,
                subTotal: 30.00

            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000005',
                        name: '方便面',
                        unit: '袋',
                        price: 4.50
                    },
                    count: 3
                },
                saved: 4.5,
                subTotal: 9.00
            }],
        allSaved: 7.50,
        allTotal: 51.00
    };

it('build receiptText', ()=> {
    const receiptText =
        `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
expect(mainData.buildReceiptText(receipt)).toEqual(receiptText);
})
});
