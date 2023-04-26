/// <reference types="cypress"/>

  //enable support for XPath
  // add to e2e ---- import "cypress-xpath"

describe('Enable XPath in Cypress & understand the use of dot or period " . " in XPath ', () => {
    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/cyxpath.html')
    })

    it('XPath & WITHIN', () => {
        cy.xpath("(//input[@placeholder='enter your channel name'])[1]").type('Lern Cypress')
    
        cy.xpath("//fieldset[@id='grouptwo']").within(() => {
            cy.xpath(".//input[@placeholder='enter your channel name']").type('QA Nadia')
        })
    })

    it('XPath', () => {
        cy.xpath("//fieldset[@id='grouptwo']")
            .xpath(".//input[@placeholder='enter your channel name']")
            .type('QA Nadia 1234')
    })
    

})