/// <reference types="cypress"/>

describe('Shadow DOM Web Elements ', () => {
    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/shadowdom')
    })

    it('Assert H2 text within Light DOM', () => {
    cy.get('h2')
    .should('have.text', 'I belong to Regular/Light Dom\n                ')
    })

    it('Type to Textbox within Light DOM', () => {
        cy.get('#channelname')
        .type('QA BOX Let\'s test')
        .should('have.value', 'QA BOX Let\'s test')
    })

    it('Type to TextBox within Shadow DOM', () => {
        cy.get('button').click()
        cy.get('#shadowHost')
        .shadow()
        .find('#name')
        .type('QA BOX Let\'s test')
        .should('have.value', 'QA BOX Let\'s test')
    })

    it('Using JQuery', () => {
        cy.get('button').click()
        cy.get('#shadowHost').should(e => {
            const [dom] = e.get()
            expect(dom.shadowRoot.querySelector('h2').textContent).to.eql('I belong to Shadow DOM')
        dom.shadowRoot.querySelector('#name').value = 'QA BOX Let\'s test'
        dom.shadowRoot.getElementById('name').value = 'QA BOX Let\'s test'
        })
    })
    
    it('Config includeShadowDom equal to True', () => {

        //include to cypress.config.js file: "includeShadowDom": true,
        cy.get('button').click()
        cy.get('h2')
            .contains('I belong to Shadow DOM')
            .should('be.visible')
        cy.get('#name').type('QA BOX Let\'s test')
        .should('have.value', 'QA BOX Let\'s test')

    })

    it('Config includeShadowDom equal to True', () => {

        //if you need enable only for certain TC add to TC as an option: "includeShadowDom": true,
        cy.get('button').click()
        cy.get('h2', {includeShadowDom: true})
        .contains('I belong to Shadow DOM')
            .should('be.visible')
        cy.get('#name', {includeShadowDom: true}).type('QA BOX Let\'s test')
        .should('have.value', 'QA BOX Let\'s test')
    })
})