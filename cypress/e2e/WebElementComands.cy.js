/// <reference types="cypress"/>

describe('Web element Commands', () => {
    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/cygetcontains.html')
    })

    it('Get single element', () => {
        cy.get('#GETCOMMAND').children().last().find(':checkbox').check({ multiple: true})
        cy.get(':checkbox').parent().prev().find(':button').first().click()
        cy.reload()
        cy.get(':checkbox').eq(2).siblings(':checkbox').check({multiple: true})
        cy.reload()
        cy.get(':button').each(btn => {
            btn.hide()
        })
        cy.get('span').each(spn => {
            cy.log(spn.text())
        })
    })

    it ('Contains with text', () => {
        cy.contains('SPAN ONE').click()
        cy.contains('SPAN TWO').click()
    })

    it ('contains with text & selector', () => {
        cy.contains('span', 'FIND ME').click()
        cy.contains('button', 'FIND ME').click()
    })

    it('contains with value', () => {
        cy.get('form').contains('Submit the form').click()
    })

    it('Contains with RegEx', () => {
        cy.contains('Add').click() // always clicks the first button
        cy.contains(/^add$/i).click() // click the second button row
    })

    it('contains - element preference order', () => {
        cy.contains('Search').click()
    })
})