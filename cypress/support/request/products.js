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


Cypress.Commands.add('createProduct', (product, product2) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/create-product`,
        failOnStatusCode: false,
        body: product, product2,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        }
    })

 })
    Cypress.Commands.add('getProductByName', (productName) => {
        cy.request({
            method: "GET",
            url: `${Cypress.env().baseUrlAPI}/products?name=${productName}`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            }
       
    })
    
})