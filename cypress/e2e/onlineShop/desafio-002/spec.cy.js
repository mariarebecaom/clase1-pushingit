const directoryName = __dirname.replaceAll('\\','/');
const module = directoryName.split(/[/]/)[2];
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();

describe(`${suiteName} ${suiteId} - ${module}`, () => {
    
    before(() => {
    cy.login(Cypress.env().username, Cypress.env().password)
    cy.visit('');
  });

  it('Deberia permitir al usuario editar un producto', function () {
      cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(function (data) {
          data.product.id = suiteId;
          cy.deleteProductById(data.product.id).then(function() {
          cy.createProduct(data.product).its('body.product._id').then(function (product) {
                cy.request({
                method: "PUT",
                url: `${Cypress.env().baseUrlAPI}/product/${product}`,
                body: data.editproduct,
                headers: {
                    Authorization: `Bearer ${Cypress.env().token}`
                }
                }).then(function (response) {
                    expect(response.status).to.eq(202)
              }) 
          cy.visit('')
          cy.getByDataCy('onlineshoplink').click()
          cy.getByDataCy('search-type').select('ID')
          cy.getByDataCy('search-bar').type(`${data.product.id}{enter}`).should('be.visible').wait(5000)
          cy.getByDataCy('name').should('be.visible').invoke('text').then(function (nameEdited) {
            expect(nameEdited).to.equal(data.editproduct.name)
          })
          cy.getByDataCy('price').should('be.visible').invoke('text').then(function (priceEdited) {
            expect(priceEdited).to.equal(data.editproduct.price.toString())
          })
            
        })
      
            }) 
        }) 
    }) 
})
