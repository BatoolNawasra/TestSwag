
const USERS = {
    standard: 'standard_user',
    locked: 'locked_out_user',
    problem: 'problem_user',
    performance: 'performance_glitch_user',
    password: 'secret_sauce'
}

export const LOCATORS = {
    loginPage: 'https://www.saucedemo.com/',
    ProductsPage: 'https://www.saucedemo.com/inventory.html',

    userNameInput: '.login-box .form_group #user-name',
    passwordInput: '.login-box  .form_group #password',
    logInButton: '.login-box  #login-button',


    productsList: '.inventory_list  .inventory_item',
    addButtonInProductsPage: '.pricebar button',
    addButtonInProductPage: '[class="btn btn_primary btn_small btn_inventory"]',

    cartlist: '.cart_list  .cart_item',


    checkoutFname: '.checkout_info  #first-name',
    checkoutLname: '.checkout_info  #last-name',
    checkoutCode: '.checkout_info  #postal-code',

}


export const visit = () => {
    cy.visit(LOCATORS.loginPage)
    cy.get('.login_logo').contains('Swag Labs').should('be.visible');

}

export const logIn = (user) => {
    //    cy.visit(LOCATORS.loginPage)
    cy.get(LOCATORS.userNameInput)
        .type(user)
    cy.get(LOCATORS.passwordInput)
        .type(USERS.password)
    cy.get(LOCATORS.logInButton)
        .click()

}
export const backToProducts = () => {
    cy.get('[id="back-to-products"]').click()


}

export const continueShopping = () => {
    cy.get('[class="cart_footer"]  [id="continue-shopping"]')
        .click()
}

export const getPrices = () => {
    const prices = [];
    cy.get(LOCATORS.productsList).then(items => {
        const numOfProducts = items.length;
        cy.log(numOfProducts)
        for (let i = 0; i < numOfProducts; i++) {
            const item = items[i];
            const priceText = Cypress.$(item).find('.inventory_item_price').text();
            const price = parseFloat(priceText.replace('$', '')); // Assuming price is in the format $X.XX
            cy.log(price)
            prices.push(price);
        }
    })
    return prices;
}


export const getNames = () => {
    const namesAfterSort = [];
    cy.get('.inventory_list .inventory_item').each(item => {
        const name = Cypress.$(item).find('.inventory_item_name').text();
        cy.log(name);
        namesAfterSort.push(name);
    })
    return namesAfterSort;

}

export const selectSortOption = (sortOption) => {
    cy.get('[class="product_sort_container"]')
        .should('contain', sortOption)
        .select(sortOption)
}


export const verifyItemInCart = (item) => {
    cy.contains(item.name).should('be.visible');
    cy.contains(item.label).should('be.visible')
    cy.contains(item.price).should('be.visible')
}
export const verifyInProductsPage = (user) => {
    cy.url().should('include', LOCATORS.ProductsPage);
    cy.get('.inventory_list').should('exist');
   // cy.get('.inventory_item').should('have.length', 6)
    //cy.get('.inventory_item_name').should('be.visible');
    //cy.url().should('include', '/inventory.html');

   // cy.get('.inventory_item_price').should('be.visible');
    //cy.get(LOCATORS.addButtonInProductPage).should('be.enabled')
    //cy.get(LOCATORS.addButtonInProductPage).should('not.have.attr', 'disabled');

}
export const finishCheckOut = () => {
    cy.get('.cart_footer  button ').contains('Finish').click()
    cy.contains('Thank you for your order!').should('be.visible');
}
export const verifyCartCount = (num) => {
    if (num == 0) {
        cy.get('[class="shopping_cart_badge"]').should('not.exist');

    } else {
        cy.get('[class="shopping_cart_badge"]').should('have.text', num);

    }

}

export const visitItemPage = (itemName) => {
    cy.get('.inventory_list .inventory_item')
        .contains(itemName)
        .parent()
        .find('[href="#"]')
        // .last() //using name 
        .first()// using img
        .click()
}


export const verifyVisitItemPage = (item) => {
    cy.contains(item.name).should('be.visible');
    cy.contains(item.label).should('be.visible')
    cy.contains(item.price).should('be.visible')
    cy.get('.inventory_details_desc_container button').should('be.enabled')
}


export const addToCart = () => {
    cy.get('.inventory_details_desc_container button').click()
}
export const visitTheCart = () => {
    cy.get('#shopping_cart_container').click()
}

export const checkout = (Info) => {
    cy.get('#checkout').click()
    //fill personal check out info
    cy.get(' .checkout_info  #first-name').type(Info.firstName)
    cy.get(' .checkout_info  #last-name').type(Info.lastName)
    cy.get(' .checkout_info  #postal-code').type(Info.postalCode)

}
export const removeFromCart = (itemName) => {
    cy.get('.cart_list  .cart_item')
        .contains(itemName)
        .parent()
        .parent()
        .find('button')
        .click()
}

export const addItemToCartFromProductsPage = (itemname) => {
    cy.get(LOCATORS.productsList)
        .contains(itemname)
        .parent()
        .parent()
        .find(LOCATORS.addButtonInProductsPage).click()
}
export const deletItemFromChart = (itemprice) => {
    cy.get('#shopping_cart_container').click()
    cy.get(LOCATORS.cartlist)
        .contains(itemprice)
        .parent()
        .find('button')
        .click()

    cy.contains('Continue Shopping')
        .click()


}

export const sortProducts = (sortOption) => {
    // Click to sort products
    cy.get('[class="product_sort_container"]')
        .should('contain', sortOption)
        .select(sortOption)
}
export const verifynamesort = (nameSortOption) => {

}

export const pricesort = (priceSortOption) => {

}
export const logout = () => {
    cy.get('[class="bm-burger-button"]').click()
    cy.get('#logout_sidebar_link')
        .contains('Logout').click();

    cy.url().should('include', LOCATORS.loginPage);
    cy.get('.login_logo').contains('Swag Labs').should('be.visible');

}
