// <reference types="cypress"/>

describe('Cypress Custom Commands (Parent, Child and Dual)', () => {

    it('Parent Custom Comand', () => {
        cy.parentCommandName('QA Nadia')
    })

    it('Child Custom Comand', () => {
        cy.wrap('QA Nadia').childCommandName()
    })

    
    it('Child Custom Comand - Option = Element', () => {
        cy.visit('https://www.google.com/')
        cy.get('input').childCommandNameEl()
    })

    it('Dual Child Custom Comand', () => {
        cy.visit('https://www.google.com/')
        cy.get('input').childCommandNameDual()
        cy.childCommandNameDual()
    })

    it('Get text Custom Comand', () => {
        cy.visit('https://www.google.com/')
        cy.get('span.LGwnxb').getText().then(cy.log)
    })

    it('Get Table Cell Value Custom Comand', () => {
        cy.visit('https://the-internet.herokuapp.com/tables')
        cy.getCellValue(2,3).then(cy.log)
    })

    it('Frame Custom Comand', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe')
        cy.get('#mce_0_ifr')
        .iframe()
        .clear()
        .type('QA Nadia')
    })
})