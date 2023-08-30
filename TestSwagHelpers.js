export let prices;
export let names;
export const ITEMS = {
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
export const USERS = {
    standard: 'standard_user',
    locked: 'locked_out_user',
    problem: 'problem_user',
    performance: 'performance_glitch_user',
    password: 'secret_sauce'
}
export const SORTOPTIONS = {
    nameAsinding: 'Name (A to Z)',
    nameDesinding: 'Name (Z to A)',
    priseAsinding: 'Price (low to high)',
    priceDesinding: 'Price (high to low)',
}
export const URLS = {
    testSwagPage: 'https://www.saucedemo.com',
    ProductsPage: 'https://www.saucedemo.com/inventory.html',
}
export const LOCATORS = {
    userName: '#user-name',
    password: '#password',
    logInButton: '#login-button',


    productsList: '.inventory_list  .inventory_item',
    productName: '.inventory_item_name',
    productPrice: '.inventory_item_price',
    addButtonInMainPage: '.pricebar button',
    addButtonInProductPage: '[class="btn btn_primary btn_small btn_inventory"]',

    cartlist: '.cart_list .cart_item',
    title: '.title',

    checkoutFname: '#first-name',
    checkoutLname: '#last-name',
    checkoutCode: '#postal-code',

    backToProductsButton: '[id="back-to-products"]',
    finishButton: '[id="finish"]',
    continueShoppingButton: '[id="continue-shopping"]',
    sortList: '[class="product_sort_container"]',
    cartCount: '[class="shopping_cart_badge"]',
    cartButton: '#shopping_cart_container',
    logo: '.login_logo',
    countinueCheckoutbutton: '#continue',
    anchor: 'a',
    addToCartButton: '.inventory_details_desc_container button',
    checkoutButton: '#checkout'
}

export const orderPrice = {
    Asinding: 'AS',
    Desinding: 'Ds',
}

export const isArraySorted = (arr, order = orderPrice.Asinding) => {
    length = arr.length;
    for (let i = 0; i < length + 1; i++) {
        if (order == orderPrice.Asinding) {
            let test = arr[i + 1] - arr[i];
            if (test < 0) {
                return false;
            }
        }
        else if (order == orderPrice.Desinding) {
            let test = arr[i + 1] - arr[i]
            if (test > 0)
                return false
        }
    }
    return true
}

export const visitTestSwag = () => {
    cy.visit(URLS.testSwagPage)
    cy.get(LOCATORS.logo).contains('Swag Labs').should('be.visible');
}

export const logIn = (user) => {
    cy.get(LOCATORS.userName)
        .clear()
        .type(user)
    cy.get(LOCATORS.password)
        .clear()
        .type(USERS.password)
    cy.get(LOCATORS.logInButton)
        .click()
    cy.url().should('include', URLS.ProductsPage);
    cy.get(LOCATORS.productsList).should('exist');
    cy.get(LOCATORS.title).should('contain', 'Products')
}

export const backToProducts = () => {
    cy.get(LOCATORS.backToProductsButton).click()
    cy.get(LOCATORS.title).should('contain', 'Products')
}

export const continueShopping = () => {
    cy.get(LOCATORS.continueShoppingButton)
        .click()
}

export const selectSortOption = (sortOption) => {
    cy.get(LOCATORS.sortList)
        .should('contain', sortOption)
        .select(sortOption)
}

export const checkItemInCart = (item) => {
    cy.get(LOCATORS.cartButton).click()
    cy.get(LOCATORS.title).should('contain', 'Your Cart')
   
    cy.contains(item.name).should('be.visible')
    .parent()
    .parent()
    .should('contain' , item.label)
    .should('contain', item.price )
}

export const finishCheckOut = () => {
    cy.get(LOCATORS.finishButton).click()
    cy.contains('Thank you for your order!').should('be.visible');
}

export const verifyCartCount = (num) => {
    if (num == 0) {
        cy.get(LOCATORS.cartCount).should('not.exist');
    } else {
        cy.get(LOCATORS.cartCount).should('have.text', num);
    }
}

export const goToItemPage = (item) => {
    cy.get(LOCATORS.productsList)
        .contains(item.name)
        .parent()
        .find(LOCATORS.anchor)
        // .last() //using name 
        .first()// using img
        .click()
    cy.contains(item.name).should('be.visible');
    cy.contains(item.label).should('be.visible')
    cy.contains(item.price).should('be.visible')
    cy.get(LOCATORS.addToCartButton).should('be.enabled')
}

export const goToCart = () => {
    cy.get(LOCATORS.cartButton).click()
    cy.get(LOCATORS.title).should('contain', 'Your Cart')
}

export const addToCartFromProductPage = () => {
    cy.get(LOCATORS.addToCartButton).click()
}

export const addItemFromMainPage = (item) => {
    cy.get(LOCATORS.productsList)
        .contains(item.name)
        .parent()
        .parent()
        .find(LOCATORS.addButtonInMainPage).click()
}

export const deleteItemFromMainPage = (item) => {
    cy.get(LOCATORS.productsList)
        .contains(item.name)
        .parent()
        .parent()
        .find(LOCATORS.addButtonInMainPage).click()
}

export const deletItemFromCart = (item) => {
    cy.get(LOCATORS.cartlist).click()
        .contains(item.price)
        .parent()
        .find('button')
        .click()
}

export const fillCheckoutInformation = (Info) => {
    cy.get(LOCATORS.checkoutButton).click()
    cy.get(LOCATORS.checkoutFname).clear().type(Info.firstName)
    cy.get(LOCATORS.checkoutLname).clear().type(Info.lastName)
    cy.get(LOCATORS.checkoutCode).clear().type(Info.postalCode)
}


//must update to checkout many item not only one
export const checkout = (item) => {
    cy.get(LOCATORS.countinueCheckoutbutton).click()
    cy.get('.summary_tax_label').invoke('text').then(taxText => {
        const taxAmount = parseFloat(taxText.replace('Tax: $', ''));
        const itemPrice = parseFloat(item.price);
        const itemCount = 1;
        const subtotal = itemPrice * itemCount;
        const totalWithTax = (subtotal + taxAmount).toFixed(2);
        cy.log(totalWithTax)
        cy.get('.summary_total_label')
            .contains('Total:')
            .should('contain', totalWithTax);
    })
}

export const logout = () => {
    cy.get('[class="bm-burger-button"]').click()
    cy.get('#logout_sidebar_link')
        .contains('Logout').click();
    cy.url().should('include', URLS.testSwagPage);
    cy.get(LOCATORS.logo).contains('Swag Labs').should('be.visible');
}

export const sortProducts = (sortOption) => {
    cy.get(LOCATORS.sortList)
        .should('contain', sortOption)
        .select(sortOption)
}
export const is2ArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

export const getPrices = () => {
    prices = new Array()
    cy.get(LOCATORS.productsList).then(items => {
        const numOfProducts = items.length;
        cy.log(numOfProducts);
        for (let i = 0; i < numOfProducts; i++) {
            const item = items[i];
            const priceText = Cypress.$(item).find(LOCATORS.productPrice).text();
            const price = parseFloat(priceText.replace('$', ''));
            cy.log(price);
            prices.push(price);
        }
    })
}

export const getNames = () => {
    names = new Array();
    cy.get(LOCATORS.productsList).each(item => {
        const name = Cypress.$(item).find(LOCATORS.productName).text();
        names.push(name);
    })
}