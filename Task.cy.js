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

function isSorted(arr, ascending = true) {
    const sortedArray = ascending ? [...arr].sort((a, b) => a - b) : [...arr].sort((a, b) => b - a);
    return JSON.stringify(arr) === JSON.stringify(sortedArray);
}



describe('example Swag Labs app', () => {
    // beforeEach(() => {
    //     cy.visit('https://www.saucedemo.com/');
    //     cy.get('.login-box .form_group #user-name').type(USERS.standard);
    //     cy.get('.login-box .form_group #password').type(USERS.password);
    //     cy.get('.login-box #login-button').click();
    //   });


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

    // it('sort pproducts acoording to thier prices', () => {
    //     helpers.visit()
    //     helpers.logIn(USERS.standard)
    //     helpers.verifyInProductsPage()
    //     //click to add 
    //     cy.get(helpers.LOCATORS.productsList).then(items => {
    //         const numOfProducts = items.length;
    //         cy.log(numOfProducts)


    //         const prices = [];
    //         for (let i = 0; i < items.length; i++) {
    //             const item = items[i];
    //             const priceText = Cypress.$(item).find('.inventory_item_price').text();
    //             const price = parseFloat(priceText.replace('$', '')); // Assuming price is in the format $X.XX
    //             cy.log(price)
    //             prices.push(price);
    //         }

    //     })


    //     const pricesAfterSort = [];
    //     cy.get('[class="product_sort_container"]')

    //         .should('contain', SORTOPTIONS.priceDesinding)
    //         .select(SORTOPTIONS.priceDesinding)

    //     cy.get(helpers.LOCATORS.productsList).then(items => {
    //         const numOfProducts = items.length;
    //         cy.log(numOfProducts)



    //         for (let i = 0; i < items.length; i++) {
    //             const item = items[i];
    //             const priceText = Cypress.$(item).find('.inventory_item_price').text();
    //             const price = parseFloat(priceText.replace('$', '')); // Assuming price is in the format $X.XX
    //             cy.log(price)
    //             pricesAfterSort.push(price);
    //         }




    //         expect(isSorted(pricesAfterSort, false)).to.be.true;
    //     })

    // });

    // it('sort products according to their prices', () => {
    //     helpers.visit()
    //     helpers.logIn(USERS.standard)
    //     helpers.verifyInProductsPage()

    //     // Click to sort products
    //     cy.get('[class="product_sort_container"]').should('contain', SORTOPTIONS.priceDesinding).select(SORTOPTIONS.priceDesinding)

    //     // Extract prices after sorting
    //     const pricesAfterSort = [];
    //     cy.get(helpers.LOCATORS.productsList).each(item => {
    //         const priceText = Cypress.$(item).find('.inventory_item_price').text();
    //         const price = parseFloat(priceText.replace('$', ''));
    //         cy.log(price);
    //         pricesAfterSort.push(price);
    //     })

    // });

    // it('sort products according to their names', () => {
    //     helpers.visit()
    //     helpers.logIn(USERS.standard)
    //     helpers.verifyInProductsPage()

    //     // Click to sort products
    //     cy.get('[class="product_sort_container"]')
    //         .should('contain', SORTOPTIONS.nameAsinding)
    //         .select(SORTOPTIONS.nameAsinding)

    //     // Extract product names after sorting
    //     const namesAfterSort = [];
    //     cy.get('.inventory_list .inventory_item').each(item => {
    //         const name = Cypress.$(item).find('.inventory_item_name').text();
    //         cy.log(name);
    //         namesAfterSort.push(name);
    //     })
    // });

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
        //back to product page 
        helpers.backToProducts()
        helpers.verifyInProductsPage();

        //after check out the cart being empty
        helpers.verifyCartCount(0)
    });//done
    it('Log in then logout', () => {
        helpers.visit()
        helpers.logIn(USERS.problem)
        helpers.verifyInProductsPage()
        helpers.logout()
    });//done
})