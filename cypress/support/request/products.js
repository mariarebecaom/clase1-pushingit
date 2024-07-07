Cypress.Commands.add('getProductById', (productID) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?id=${productID}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    })
})

Cypress.Commands.add('deleteProductById', (productID) => {
    cy.getProductById(productID).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        });
    });
})


Cypress.Commands.add('createProduct', (product) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/create-product`,
        failOnStatusCode: false,
        body: product,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        }
    })

})