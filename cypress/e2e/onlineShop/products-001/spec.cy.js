const directoryName = __dirname.replaceAll('\\','/');
const module = directoryName.split(/[/]/)[2];
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();


describe(`${suiteName} - ${module}`, () => {

    it('products', () =>{
        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data =>{
            data.product.name = `${data.product.name}-${suiteId}`
            cy.visit('https://pushing-it.vercel.app/')
            cy.get('[data-cy="registertoggle"]').dblclick()
            cy.get('[data-cy="user"]').type(data.login.username)
            cy.get('[data-cy="pass"]').type(data.login.password)
            cy.get('[data-cy="submitForm"]').click()
            cy.url().should('include', '/home')
            cy.get('[data-cy="onlineshoplink"]').click()
            cy.url().should('include', '/home')
            cy.get('[data-cy="add-product"]').click()
            cy.get('[data-cy="productName"]').type(data.product.name)
            cy.get('[data-cy="productPrice"]').type(data.product.price)
            cy.get('[data-cy="productCard"]').type(data.product.imageUrl)
            cy.get('[data-cy="productID"]').type(data.product.ID)
            cy.get('[data-cy="createProduct"]').click()
            cy.get('.chakra-modal__content-container').should('contain', 'has been added')
            cy.get('[data-cy="closeModal"]').click()
            cy.get('[data-cy="search-type"]').select('ID')
            cy.get('[data-cy="search-bar"]').type(`${data.product.ID}{enter}`)
            cy.get('[data-cy="delete-1"]').click()
            cy.get('#saveEdit').click()
            cy.get('.chakra-modal__content-container').should('contain', 'has been deleted')
            cy.get('[data-cy="closeModal"]').click()
            cy.get('[data-cy="search-bar"]').type('{enter}')
            cy.get('.css-k31g74').should('not.be.visible')
            })
    })

})