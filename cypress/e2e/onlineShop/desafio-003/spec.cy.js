const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2];
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();

describe(`${suiteName} ${suiteId} - ${module}`, () => {

    before(() => {
        cy.login(Cypress.env().username, Cypress.env().password)
        cy.visit('');
    });

    it('firstSqlTest', function () {
        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(function (data) {

            data.product.id = suiteId;
            data.product2.id = data.product2.id
            cy.getProductByName(data.product.name).as('product1')
            cy.getProductByName(data.product2.name).as('product2')

            cy.deleteProductById(data.product.id).then(function () {
                cy.createProduct(data.product)
            })
            cy.deleteProductById(data.product2.id).then(function () {
                cy.createProduct(data.product2)
            });

            cy.then(function () {

                cy.getByDataCy('onlineshoplink').click()

                cy.getByDataCy('search-bar').type(`${data.product.name}{enter}`)
                cy.get(`[name='${data.product.name}']`).click();
                cy.getByDataCy("closeModal").click()
                cy.get(`[name='${data.product.name}']`).click();
                cy.getByDataCy("closeModal").click()

                cy.getByDataCy('search-bar').clear().type(`${data.product2.name}{enter}`)
                cy.get(`[name='${data.product2.name}']`).click();
                cy.getByDataCy("closeModal").click();
                cy.get(`[name='${data.product2.name}']`).click();
                cy.getByDataCy("closeModal").click();

                cy.getByDataCy('goShoppingCart').click();
                cy.getByDataCy('goBillingSummary').click();
                cy.getByDataCy('goCheckout').click();
                cy.getByDataCy('firstName').type(data.checkout.firstName)
                cy.getByDataCy('lastName').type(data.checkout.lastName)
                cy.getByDataCy('cardNumber').type(data.checkout.cardNumber)
                cy.getByDataCy('purchase').click()
                cy.get('.chakra-modal__content-container').should('contain', 'Purchase has been completed successfully')

                cy.task("connectDB", `SELECT a.product, a.price FROM public."purchaseProducts" a INNER JOIN public."sells" b ON a.id=b.id`).then(result => {
                    cy.log(result)

                })

            })
        })
    })
})
