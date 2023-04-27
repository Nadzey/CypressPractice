import "cypress-file-upload"
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

Cypress.Commands.add('parentCommandName', (name) => {
    cy.log(name)
})

Cypress.Commands.add('childCommandName', {prevSubject: true}, (prevSub) => {
    cy.log(prevSub)
})

Cypress.Commands.add('childCommandNameEl', {prevSubject: 'element'}, (prevSub) => {
    cy.log(prevSub.length)
})

Cypress.Commands.add('childCommandNameDual', {prevSubject: 'optional'}, (prevSub) => {
    if(prevSub){
        cy.log(prevSub.length)
    }
    else {
        cy.log('Welcome')
    }
})

Cypress.Commands.add('getText', {prevSubject: 'element'}, (prevSub) => {
    //return prevSub.text()
    //cypress command way
    cy.wrap(prevSub.text())
})

Cypress.Commands.add('getCellValue', (row, col) => {
    cy.get(`table#table1 > tbody > tr:nth-child(${row})>td:nth-child(${col})`).then((el) => {
        cy.wrap(el.text())
    })
})

Cypress.Commands.add('iframe',{prevSubject: 'element'}, (iframe) => {
    return new Cypress.Promise((resolve) => {
        iframe.ready(() => {
            resolve(iframe.contents().find('body'))
        })
      })
})