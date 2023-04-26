/// <reference types="cypress"/>

describe('Pop-ups and switch to a different website window with Cypress ', () => {
    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/differentalerttypes.html')
    })

    it('Alert - First Way', () => {
        cy.on('window:alert', alertText => {
            expect(alertText).to.eql('I\'m an Alert Box')
        })
        cy.get('#alert').click()
    })

    it('Alert - Second Way - Multiple Alert', () => {
        const fn = cy.stub()
        cy.on('window:alert', fn)
        cy.get('button#miltiplealert').click().then(() => {
            expect(fn.getCall(0)).to.be.calledWithExactly('First Alert Box')
            expect(fn.getCall(1)).to.be.calledWithExactly('Second Alert Box')
            expect(fn.getCall(2)).to.be.calledWithExactly('Third Alert Box')
        })
    })
    
    it('Confirm - First Way - click Confirm', () => {
        cy.on('window:confirm', confirmText => {
            expect(confirmText).to.eql('I\'m a Confirm Box')
        })
        cy.get('button#confirm').click()
    })

    it('Confirm - First Way - click Cancel', () => {
        cy.on('window:confirm', confirmText => {
            expect(confirmText).to.eql('I\'m a Confirm Box')
            return false
        })
        cy.get('button#confirm').click()
    })

    it('Confirm - second Way - click Confirm', () => {
        const stub = cy.stub()
        stub.onFirstCall().returns(true)
        cy.on('window:confirm', stub)
        cy.get('button#confirm').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWithExactly('I\'m a Confirm Box')
        })
    })
    it('Confirm - second Way - click Cancel', () => {
        const stub = cy.stub()
        stub.onFirstCall().returns(false)
        cy.on('window:confirm', stub)
        cy.get('button#confirm').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWithExactly('I\'m a Confirm Box')
        })
    })

    it('Prompt', () => {
        cy.window().then(win => {
            const stub = cy.stub(win, 'prompt')
            stub.returns('Nadia')
            cy.get('button#prompt').click()
        })       
    })

    it('Custom Pop up Dialog from hidden fields', () => {
        cy.get('#cusdiag').click()
        cy.get('#name').type('Nadia')
        cy.get('#password').type('admin')
        cy.contains('Submit').click()
    })

    it('Custom Pop Up Dialog from function', () => {
        cy.get('#moddiag').click()
        //cy.contains('Ok').click()
        cy.contains('Close').click()
    })

    it('Window pop up', () => {
        const pop_url = "https://www.youtube.com/c/qaboxletstest/"
        cy.window().then(win => {
            const stub = cy.stub(win, 'open').as('windowOpen')
        })
        cy.get('#winpop').click()
        cy.get('@windowOpen').should('be.calledWith', pop_url)
        cy.window().then(win => {
            win.location.href = pop_url
            cy.get('#search-input > #search').type('Cypress by qa box let test {enter}')
            //add to cypress.config.js: "chromeWebSecurity": false,
        })
    })   
})
