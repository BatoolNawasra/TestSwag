import * as TestSwagHelpers from './TestSwagHelpers';

const checkout_information = {
    firstName: 'Batool ',
    lastName: 'Nawasra',
    postalCode: 'P201',

}


describe('example Swag Labs app', () => {
    beforeEach(() => {
        TestSwagHelpers.visit();
        TestSwagHelpers.logIn(TestSwagHelpers.USERS.standard)
    })

    it('add 2 items to cart from thier page', () => {
        TestSwagHelpers.verifyCartCount(0)
        TestSwagHelpers.goItemPage(TestSwagHelpers.ITEMS.ShirtRed)
        TestSwagHelpers.addToCart()
        TestSwagHelpers.verifyCartCount(1)
        TestSwagHelpers.backToProducts()
        TestSwagHelpers.goItemPage(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.addToCart()
        TestSwagHelpers.verifyCartCount(2)
        TestSwagHelpers.backToProducts()
    });

    it('add item to cart from main page', () => {
        TestSwagHelpers.verifyCartCount(0)
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Onesie)
        TestSwagHelpers.verifyCartCount(1)
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Jacket)
        TestSwagHelpers.verifyCartCount(2)
    });

    it('delete item from cart', () => {
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.checkItemInCart(TestSwagHelpers.ITEMS.Light)
      
        TestSwagHelpers.deletItemFromCart(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.continueShopping()
    });

    it('delete item from cart from products page', () => {
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.deleteItemFromMainPage(TestSwagHelpers.ITEMS.Light)
    });

    it('visit cart and checkout the order', () => {
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.goToCart()
        TestSwagHelpers.fillCheckoutInformation(checkout_information)
        TestSwagHelpers.checkout(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.finishCheckOut()
        TestSwagHelpers.backToProducts()
        TestSwagHelpers.verifyCartCount(0)
    });

    it('Log in then logout', () => {
        TestSwagHelpers.logout()
    })

    it('lololo', () => {
        let A = [1, 72, 25, 60]
        let B = [60, 30, 5]
        //  cy.log(A[2])
        //cy.log(Array.isArray(A))
        // B.forEach(item => {
        //     cy.log(item);
        // });

        cy.log(TestSwagHelpers.isArraySorted(A, 'AS'))
        expect(TestSwagHelpers.equalArrays(A, B)).not.to.be.true;
        // expect(JSON.stringify(A)).to.equal(JSON.stringify(B))

    })

    it('sort pproducts acoording to thier prices Desinding', () => {
        TestSwagHelpers.selectSortOption(TestSwagHelpers.SORTOPTIONS.priceDesinding)
        let pricesAfterSort = TestSwagHelpers.getPrices()
        cy.then(() => {
            let pricesAfterSort = TestSwagHelpers.prices
            expect(TestSwagHelpers.isArraySorted(pricesAfterSort, 'DS')).to.be.true;
        })
    });

    it('sort pproducts acoording to thier prices Asinding', () => {
        TestSwagHelpers.selectSortOption(TestSwagHelpers.SORTOPTIONS.priseAsinding)
        TestSwagHelpers.getPrices()
        cy.then(() => {
            let pricesAfterSort = TestSwagHelpers.prices
            expect(TestSwagHelpers.isArraySorted(pricesAfterSort, 'AS')).to.be.true;
        })
    });

    it('sort products according to their names Asinding', () => {
        TestSwagHelpers.selectSortOption(TestSwagHelpers.SORTOPTIONS.nameAsinding)
        TestSwagHelpers.getNames()
        cy.then(() => {
            let namesAfterSort = TestSwagHelpers.names
            let testList = namesAfterSort.slice().sort((a, b) => a.localeCompare(b));
            expect(JSON.stringify(testList)).to.equal(JSON.stringify(namesAfterSort))
            expect((JSON.stringify(testList) === JSON.stringify(namesAfterSort))).to.be.true;

        })
    });

    it('sort products according to their names Desinding', () => {
        TestSwagHelpers.selectSortOption(TestSwagHelpers.SORTOPTIONS.nameDesinding)
        TestSwagHelpers.getNames()
        cy.then(() => {
            let namesAfterSort = TestSwagHelpers.names
            // namesAfterSort.forEach((name) => cy.log(name + '\n'))
            let testList = namesAfterSort.slice().sort((a, b) => b.localeCompare(a));
            expect(JSON.stringify(testList)).to.equal(JSON.stringify(namesAfterSort))
            expect((JSON.stringify(testList) === JSON.stringify(namesAfterSort))).to.be.true;
        })
    });




})