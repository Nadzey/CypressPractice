/// <reference types="cypress"/>

describe('Window test Suite Commands', () => {
    beforeEach(() => {
        cy.visit('#/login?_k=k4oq8m')
    })

    it('Window test Suite - URI Properties', () => {
        cy.window().should(win => {
            const loc = win.location
                expect(loc.hash).to.eql('#/login?_k=k4oq8m')
                expect(loc.host).to.eql('react-redux.realworld.io')
                expect(loc.pathname).to.eql('/')
                expect(loc.protocol).to.eql('https:')
        })

    })

    it('Cy test commands- URI Properties', () => {
        cy.hash().should('eq', '#/login?_k=k4oq8m')
        cy.location('host').should('eq', 'react-redux.realworld.io')
        cy.location('pathname').should('eq', '/')
        cy.location('protocol').should('eq', 'https:')

    })

    
    it('Window test Suite - Page Reload', () => {
        cy.window().should(win => {
            win.location.reload()
        })
    })

    it('Cy test commands - Page Reload', () => {
        cy.reload()
    
    })

    it('Window test Suite - Page Navigation', () => {
        cy.contains('Sign up').click()
        cy.window().should(win => {
            win.history.back() // win.history.go(-1)
        })

        cy.contains('Need an account?').should('be.visible')
        cy.window().should(win => {
            win.history.forward()// win.history.go(1)
        })

        cy.contains('Have an account?').should('be.visible')
    
    })

    it('Cy test commands - Page Navigation', () => {
        cy.contains('Sign up').click()
        cy.go('back') // cy.go(-1)
        cy.contains('Need an account?').should('be.visible')
        cy.go('forward') // cy.go(1)
        cy.contains('Have an account?').should('be.visible')
    })

    it('Window test Suite - Local storage', () => {
        cy.window().should(win => {
            expect(win.localStorage.length).to.eql(0)
            win.localStorage.setItem('Name', 'QA BOX LET\'S TEST')
            expect(win.localStorage.getItem('Name')).to.eql('QA BOX LET\'S TEST')
        })
    
    })

    it('Window test Suite - cleare Local storage', () => {
        cy.clearLocalStorage()

    })

})