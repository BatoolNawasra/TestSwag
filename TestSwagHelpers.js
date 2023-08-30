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
export const PAGES = {
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


    checkoutFname: ' #first-name',
    checkoutLname: ' #last-name',
    checkoutCode: ' #postal-code',

    checkoutButton: '[id="back-to-products"]',
    finishButton: '[id="finish"]',
    continueShoppingButton: '[id="continue-shopping"]',
    sortList: '[class="product_sort_container"]',
    cartCount: '[class="shopping_cart_badge"]',
    cartButton: '#shopping_cart_container',
    logo: '.login_logo',


}

export const isArraySorted = (arr, order = 'AS') => {
    length = arr.length;
    for (let i = 0; i < length; i++) {
        if (order == 'AS') {
            let test = arr[i + 1] - arr[i];
            if (test < 0) {
                return false;
            }
        }
        else if (order == 'DS') {
            let test = arr[i + 1] - arr[i]
            if (test > 0)
                return false
        }

    }
    return true

}

export const visit = () => {
    cy.visit(PAGES.testSwagPage)
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
    cy.url().should('include', PAGES.ProductsPage);

    cy.get('.inventory_list').should('exist');
    cy.get('.title').should('contain', 'Products')

}
export const backToProducts = () => {
    cy.get(LOCATORS.checkoutButton).click()
    cy.get('.title').should('contain', 'Products')


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
    cy.contains(item.name).should('be.visible');
    cy.contains(item.label).should('be.visible')
    cy.contains(item.price).should('be.visible')

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

export const goItemPage = (item) => {
    cy.get(LOCATORS.productsList)
        .contains(item.name)
        .parent()
        .find('[href="#"]')
        // .last() //using name 
        .first()// using img
        .click()

    cy.contains(item.name).should('be.visible');
    cy.contains(item.label).should('be.visible')
    cy.contains(item.price).should('be.visible')
    cy.get('.inventory_details_desc_container button').should('be.enabled')
}

export const goTheCart = () => {
    cy.get(LOCATORS.cartButton).click()

}

export const addToCart = () => {
    cy.get('.inventory_details_desc_container button').click()
}

export const removeFromCart = (itemName) => {
    cy.get(LOCATORS.cartlist)
        .contains(itemName)
        .parent()
        .parent()
        .find('button')
        .click()
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
    cy.get(LOCATORS.cartlist)
        .contains(item.price)
        .parent()
        .find('button')
        .click()




}
export const fillCheckoutInformation = (Info) => {
    cy.get('#checkout').click()
    //fill personal check out info
    cy.get('  #first-name').clear().type(Info.firstName)
    cy.get('  #last-name').clear().type(Info.lastName)
    cy.get('   #postal-code').clear().type(Info.postalCode)

}
export const checkout = (item) => {
    cy.get('#continue').click()

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
    cy.url().should('include', PAGES.testSwagPage);
    cy.get(LOCATORS.logo).contains('Swag Labs').should('be.visible');

}
export const sortProducts = (sortOption) => {
    // Click to sort products
    cy.get(LOCATORS.sortList)
        .should('contain', sortOption)
        .select(sortOption)
}

export const equalArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {

        return false; // Arrays have different lengths, so they can't be equal
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false; // Elements at index i are not equal
        }
    }
    return true; // All elements are equal at respective indices

}
export const getPrices = () => {
    prices = new Array()
    cy.get(LOCATORS.productsList).then(items => {
        const numOfProducts = items.length;
        cy.log(numOfProducts);
        for (let i = 0; i < numOfProducts; i++) {
            const item = items[i];
            const priceText = Cypress.$(item).find(LOCATORS.productPrice).text();
            const price = parseFloat(priceText.replace('$', '')); // Assuming price is in the format $X.XX
            cy.log(price);
            prices.push(price);
            // prices[i] = price
            //cy.log(prices[i])
            //cy.log(prices.length)
        }
        //cy.log(prices[2])
        //  cy.log(prices.length)

    })
    // .then(()=> {
    //     //cy.log(prices.length)
    //    // cy.log(prices[2])
    // }



}
export const getNames = () => {
    names = new Array();
    cy.get(LOCATORS.productsList).each(item => {
        const name = Cypress.$(item).find(LOCATORS.productName).text();
        //cy.log(name);

        names.push(name);

    })


}