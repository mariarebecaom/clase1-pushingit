// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '../support/request/products'
import '../support/models/shoppingCart'

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/login`,
        body: {
            username: username,
            password: password
        }
    }).then(respuesta => {
        window.localStorage.setItem('token', respuesta.body.token);
        window.localStorage.setItem('user', respuesta.body.username);
        window.localStorage.setItem('userId', respuesta.body._id);
        Cypress.env().token = respuesta.body.token;
    });
});

Cypress.Commands.add('getByDataCy', (selector) => {
    return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add('loginSession', (data) => {
   
    cy.session('loginSession', () => {
        cy.visit('https://pushing-it.vercel.app/');
        cy.get('[data-cy="registertoggle"]').dblclick();
        cy.get('[data-cy="user"]').type(Cypress.env().username);
        cy.get('[data-cy="pass"]').type(Cypress.env().password);
        cy.get('[data-cy="submitForm"]').click();
        cy.url().should('include', '/home');
        cy.get('[data-cy="onlineshoplink"]').click();
        cy.url().should('include', '/home');
    });
})



