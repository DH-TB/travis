xdescribe('pos', () => {
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

        mainData.printReceipt(inputs);

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

xdescribe('buildReceiptItems', ()=> {
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

xdescribe('buildReceipt', ()=> {
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

xdescribe('buildReceiptText', ()=> {
    const receipt =
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



const mainData = require('../src/main.js');
const fixtures = require('./fixtures.js');
describe("buildCartItems", function () {
    let allItems;
    let inputs;

    beforeEach(function () {
        allItems = fixtures.loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it("print a countItems array", function () {
        const expectText = [
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
                    price: 5.50
                },
                count: 2
            }
        ];

        expect(mainData.buildCartItems(inputs, allItems)).toEqual(expectText);
    });
});

describe("buildReceiptItems", function () {
    let cartItems;
    let promotions;

    beforeEach(function () {
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
                    price: 5.50
                },
                count: 2
            }
        ];
    });

    it("print a receiptItems array", function () {
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
                subTotal: 12.00,
                saveCount: 1,
                promotionType: 'BUY_TWO_GET_ONE_FREE'
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
                subTotal: 30.00,
                saveCount: 0,
                promotionType: 'BUY_TWO_GET_ONE_FREE'
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000005',
                        name: '方便面',
                        unit: '袋',
                        price: 5.50
                    },
                    count: 2
                },
                saved: 0.55,
                subTotal: 10.45,
                saveCount: 0,
                promotionType: '95_DISCOUNT'
            }];

        expect(mainData.buildReceiptItems(cartItems, promotions)).toEqual(expectText);
    });
});


describe('intergation test', function () {

    let allItems;
    let inputs;

    beforeEach(function () {
        allItems = fixtures.loadAllItems();

        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('print correct text', function () {

        spyOn(console, 'log');

        mainData.printReceipt(inputs);

        const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：2袋，单价：5.50(元)，小计：10.45(元)
----------------------
总计：52.45(元)
节省：3.55(元)
**********************`;

        expect(console.log).toHaveBeenCalledWith(expectText);

    });
});


describe('unit test', function () {
    describe("buildReceipt", function () {
        let receiptItems;

        beforeEach(function () {
            receiptItems = [
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
                    saved: 0,
                    subTotal: 30.00
                },
                {
                    cartItem: {
                        item: {
                            barcode: 'ITEM000005',
                            name: '方便面',
                            unit: '袋',
                            price: 5.50
                        },
                        count: 2
                    },
                    saved: 0.55,
                    subTotal: 10.45
                }];
        });

        it("print a receipt object", function () {
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
                        saved: 0,
                        subTotal: 30.00
                    },
                    {
                        cartItem: {
                            item: {
                                barcode: 'ITEM000005',
                                name: '方便面',
                                unit: '袋',
                                price: 5.50
                            },
                            count: 2
                        },
                        saved: 0.55,
                        subTotal: 10.45
                    }],
                savedTotal: 3.55,
                total: 52.45
            };

            expect(mainData.buildReceipt(receiptItems)).toEqual(expectText);
        });
    });

});


describe("buildPromotionType", function () {
    const receiptItems = [
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
            subTotal: 12.00,
            saveCount: 1,
            promotionType: 'BUY_TWO_GET_ONE_FREE'
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
            subTotal: 30.00,
            saveCount: 0,
            promotionType: 'BUY_TWO_GET_ONE_FREE'
        },
        {
            cartItem: {
                item: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 5.50
                },
                count: 2
            },
            saved: 0.55,
            subTotal: 10.45,
            saveCount: 0,
            promotionType: '95_DISCOUNT'
        }];


    it("print a promotion text", function () {
        const expectText =
            '----------------------\n' +
            '买二赠一商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：荔枝，数量：0斤\n';

        expect(mainData.promotionsText(receiptItems)).toEqual(expectText);
    });
});