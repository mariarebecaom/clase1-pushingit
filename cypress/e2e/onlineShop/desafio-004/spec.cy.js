const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2];
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();

describe(`${suiteName} ${suiteId} - ${module}`, () => {

  before(() => {
    cy.session('login', () => { })
    cy.login(Cypress.env().username, Cypress.env().password)
    cy.visit('');
  });

  it('Deberia permitir al usuario hacer una compra de varios productos', function () {
    cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(function (data) {
      data.product.id = suiteId;


      cy.deleteProductById(data.product1.id).then(function () {
        cy.createProduct(data.product1)
      })
      cy.deleteProductById(data.product2.id).then(function () {
        cy.createProduct(data.product2)
      });

      cy.then(function () {
        cy.getByDataCy('onlineshoplink').click()

        cy.getByDataCy('search-bar').type(`${data.product1.name}{enter}`)
        cy.get(`[name='${data.product1.name}']`).click()
        cy.getByDataCy("closeModal").click()
        cy.get(`[name='${data.product1.name}']`).click()
        cy.getByDataCy("closeModal").click()

        cy.getByDataCy('search-bar').clear().type(`${data.product2.name}{enter}`)
        cy.get(`[name='${data.product2.name}']`).click()
        cy.getByDataCy("closeModal").click();
        cy.get(`[name='${data.product2.name}']`).click()
        cy.getByDataCy("closeModal").click();

        cy.getByDataCy('goShoppingCart').click()

        cy.verifyShoppingCart(0, data.product1)
        cy.verifyShoppingCart(1, data.product2)

        cy.get('button[type="button"]').contains('Show total price').click()
        cy.verifyTotalPrice([0, 1])

        cy.getByDataCy('goBillingSummary').click()

        cy.verifyBillingSummary()

        cy.getByDataCy('goCheckout').click();

        cy.getByDataCy('firstName').type(data.checkout.firstName)
        cy.getByDataCy('lastName').type(data.checkout.lastName)
        cy.getByDataCy('cardNumber').type(data.checkout.cardNumber)
        cy.getByDataCy('purchase').click()
        cy.get('.chakra-modal__content-container').should('contain', 'Purchase has been completed successfully')

        const joinQuery = `SELECT p.product, p.price, s."firstName", s."lastName", s."cardNumber" FROM public."purchaseProducts" p JOIN public."sells" s ON p.sell_id = s.id WHERE s.id = '28249'`;

        cy.task("connectDB", joinQuery).then(result => {
          cy.log(result);
          expect(result).to.deep.equal(data.productsExpected);
        })
      })
    })
  })
})

