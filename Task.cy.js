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
        TestSwagHelpers.removeFromCart(TestSwagHelpers.ITEMS.Light.name)
        TestSwagHelpers.continueShopping()
    });

    it('delete item from cart from products page', () => {
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.deleteItemFromMainPage(TestSwagHelpers.ITEMS.Light)
    });


    it('visit cart and checkout the order', () => {
        TestSwagHelpers.addItemFromMainPage(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.goTheCart()
        TestSwagHelpers.fillCheckoutInformation(checkout_information)
        TestSwagHelpers.checkout(TestSwagHelpers.ITEMS.Light)
        TestSwagHelpers.finishCheckOut()
        TestSwagHelpers.backToProducts()
        TestSwagHelpers.verifyCartCount(0)
    });//done

    it('Log in then logout', () => {
        TestSwagHelpers.logout()
    })

    it('lololo', () => {
        let A = [1, 2, 30, 60]
        let B = [1, 2, 30, 60]
        cy.log(A[2])
        cy.log(Array.isArray(A))

        B.forEach(item => {
            cy.log(item);
        });

        expect(TestSwagHelpers.equalArrays(A, B)).to.be.true;
        expect(JSON.stringify(A)).to.equal(JSON.stringify(B))

    })

    it.only('sort pproducts acoording to thier prices Desinding', () => {
        TestSwagHelpers.selectSortOption(TestSwagHelpers.SORTOPTIONS.priceDesinding)

        let p = TestSwagHelpers.getPrices()
        cy.then(() => {
           TestSwagHelpers.prices[2]
        })




        //  cy.log(pricesAfterSort[5])
        //   let newList = pricesAfterSort.slice().sort((a, b) => b - a )


        //cy.log(Array.isArray(newList))
        //expect(TestSwagHelpers.equalArrays(pricesAfterSort, newList)).to.be.true;

        //  expect(JSON.stringify(newList)).to.equal(JSON.stringify(pricesAfterSort))
        // expect((JSON.stringify(newList) === JSON.stringify(pricesAfterSort))).to.be.true;
        //verify sorted ?
    });






































    it.only('sort products according to their names Asinding', () => {


        TestSwagHelpers.selectSortOption(TestSwagHelpers.SORTOPTIONS.nameAsinding)
        let LOL = TestSwagHelpers.getNames()


        cy.log(LOL)
        //verify is sorted
    });



})