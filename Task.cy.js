import * as helpers from '../TestSwag/helpers.cy';


const USERS = {
    standard: 'standard_user',
    locked: 'locked_out_user',
    problem: 'problem_user',
    performance: 'performance_glitch_user',
    password: 'secret_sauce'
}
const SORTOPTIONS = {
    nameAsinding: 'Name (A to Z)',
    nameDesinding: 'Name (Z to A)',
    priseAsinding: 'Price (low to high)',
    priceDesinding: 'Price (high to low)',
}

const checkout_info = {
    firstName: 'Batool ',
    lastName: 'Nawasra',
    postalCode: 'P201',

}



const ITEMS = {
    Backpack: {
        name: 'Sauce Labs Backpack', price: 15.99,
        label: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton."
    },
    Light: {
        name: 'Sauce Labs Bike Light', price: 9.99,
        label: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
    },
    T_Shirt: {
        name: 'Sauce Labs Bolt T-Shirt', price: 15.99,
        label: "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt."
    },
    Jacket: {
        name: 'Sauce Labs Fleece Jacket', price: 49.99,
        label: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office."
    },
    Onesie: {
        name: 'Sauce Labs Onesie', price: 7.99,
        label: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel."
    },
    ShirtRed: {
        name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99,
        label: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton."
    },
}

function areObjectValuesSorted(obj, order = 'asc') {
    const values = Object.values(obj);

    for (let i = 1; i < values.length; i++) {
        if (order === 'asc') {
            if (values[i] < values[i - 1]) {
                return false;
            }
        } else if (order === 'desc') {
            if (values[i] > values[i - 1]) {
                return false;
            }
        } else {
            throw new Error('Invalid order parameter. Use "asc" or "desc".');
        }
    }
    return true;
}






describe('example Swag Labs app', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
        cy.log(helpers.LOCATORS.ProductsPage)
    })

    it('Slould Visit web site', () => {
        helpers.visit();
    })

    it('Log in with standerd user', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
    })

    it('add 2 items to cart from individual item page', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.verifyCartCount(0)
        helpers.visitItemPage(ITEMS.ShirtRed.name)
        helpers.verifyVisitItemPage(ITEMS.ShirtRed)
        helpers.addToCart()
        helpers.backToProducts()
        helpers.verifyCartCount(1)
        helpers.visitItemPage(ITEMS.Light.name)
        helpers.verifyVisitItemPage(ITEMS.Light)
        helpers.addToCart()
        helpers.backToProducts()
        helpers.verifyCartCount(2)
    });

    //this case fail in problm user 
    it('add item to chart using Button', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.verifyCartCount(0)
        helpers.addItemToCartFromProductsPage(ITEMS.Onesie.name)
        helpers.verifyCartCount(1)
        helpers.addItemToCartFromProductsPage(ITEMS.Jacket.name)
        helpers.verifyCartCount(2)
    });

    it('visit cart delete item ', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.addItemToCartFromProductsPage(ITEMS.Light.name)
        helpers.visitTheCart()
        helpers.verifyItemInCart(ITEMS.Light)
        helpers.removeFromCart(ITEMS.Light.name)
        helpers.continueShopping()
    });

    it('delete item from cart from products page', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.addItemToCartFromProductsPage(ITEMS.Light.name)

        //the same way of adding 
        cy.get(helpers.LOCATORS.productsList)
            .contains(ITEMS.Light.name)
            .parent()
            .parent()
            // click to remove 
            .find('.pricebar button')
            .click()
    });

    it.only('sort pproducts acoording to thier prices Desinding', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.selectSortOption(SORTOPTIONS.priceDesinding)

        const pricesAfterSort = helpers.getPrices()
        cy.log(Array.isArray(pricesAfterSort))

        let newList = pricesAfterSort.slice().sort((a, b) => b - a)
        cy.log(Array.isArray(newList))


        expect(JSON.stringify(newList)).to.equal(JSON.stringify(pricesAfterSort))
        expect((JSON.stringify(newList) === JSON.stringify(pricesAfterSort))).to.be.true;
        //verify sorted ?
    });



    it('lololo', () => {
        let A = [1, 2, 30, 60]
        let B = [1, 2, 30, 60]
        expect(helpers.equalArrays(A, B)).to.be.true;
        expect(JSON.stringify(A)).to.equal(JSON.stringify(B))

    })
    it('sort products according to their prices Asinding', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()

        let prices = helpers.getPrices()

        helpers.selectSortOption(SORTOPTIONS.priseAsinding)
        const pricesAfterSort = helpers.getPrices();

        expect(helpers.equalArrays(prices, pricesAfterSort)).to.be.true;

        // cy.log(Array.isArray(pricesAfterSort))

        // let newList = pricesAfterSort.slice().sort((a, b) => b - a)
        // cy.log(Array.isArray(newList))


        // expect(JSON.stringify(newList)).to.equal(JS ON.stringify(pricesAfterSort))
        // expect((JSON.stringify(newList) === JSON.stringify(pricesAfterSort))).to.be.true;

    })



    it('sort products according to their names Asinding', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.selectSortOption(SORTOPTIONS.nameAsinding)
        helpers.getNames()
        //verify is sorted
    });

    it('visit cart and checkout the order', () => {
        helpers.visit()
        helpers.logIn(USERS.standard)
        helpers.verifyInProductsPage()
        helpers.addItemToCartFromProductsPage(ITEMS.Light.name)
        helpers.visitTheCart()
        helpers.checkout(checkout_info)

        cy.get('[class="checkout_buttons"]  #continue').click()
        // Calculate expected total price based on the item price 
        // Verify that the displayed total matches the expected total price
        cy.get('.summary_tax_label').invoke('text').then(taxText => {
            const taxAmount = parseFloat(taxText.replace('Tax: $', ''));

            // Calculate expected total price including tax
            const itemPrice = parseFloat(ITEMS.Light.price);
            const itemCount = 1;
            const subtotal = itemPrice * itemCount;
            const totalWithTax = (subtotal + taxAmount).toFixed(2);
            cy.log(totalWithTax)
            cy.get('.summary_total_label')
                .contains('Total:')
                .should('contain', totalWithTax);
        })

        helpers.finishCheckOut()
        helpers.backToProducts()
        helpers.verifyCartCount(0)
    });//done
    it('Log in then logout', () => {
        helpers.visit()
        helpers.logIn(USERS.problem)
        helpers.verifyInProductsPage()
        helpers.logout()
    });//done
})