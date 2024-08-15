Cypress.Commands.add('verifyShoppingCart', (line, product) => {
      cy.get('li[class="css-0"]').eq(line).within(() => {
        cy.get('[id="productAmount"]').should('have.text', product.quantity)
        cy.get('[id="productName"]').should('have.text', product.name)
        cy.get('[id="unitPrice"]').should('have.text', `$${product.price}`)
        cy.get('[id="totalPrice"]').should('have.text', `$${product.quantity * product.price}`)

    })
})

Cypress.Commands.add('verifyTotalPrice', (lines, products) => {
  let total = 0;
  lines.forEach((line, index) => {
    cy.get('li[class="css-0"]').eq(line).within(() => {
      cy.get('[id="totalPrice"]').invoke('text').then(text => {
        total += parseFloat(text.replace('$', ''))
      })
    })
  })
  cy.get('[id="price"]').invoke('text').then(text => {
    expect(total).to.eq(parseFloat(text.replace('$', '')));
  })
})


Cypress.Commands.add('verifyBillingSummary', () => {
  cy.get('[data-cy="subtotalAmount"]').invoke('text').then((subtotal) => {
      cy.get('[data-cy="totalPriceAmount"]').invoke('text').then((totalPrice) => {
          expect(subtotal).to.equal(totalPrice)
      })
  })
})

      
  








