require('../src/main.js');
describe("travis", function () {

    var input1 = 1;
    var input2 = 2;

    it("should add two number", function () {
        var expectText = 3;

        expect(add(input1, input2)).toEqual(expectText);
    })
});