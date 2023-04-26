// <reference types="cypress"/>

describe('Mouse Events(click,rightclick,doubleclick) and more on trigger, invoke and force opt', () => {

    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/mouseevents.html')
    })
    
    it('Click', () => {
        cy.on('window:alert', (txt) => {
            expect(txt).to.eql('click event is fired')
        })
        cy.get('#click').click()
        //one more way. It is the same
        cy.get('#click').trigger('click')
    })

    it('Double click', () => {
        cy.on('window:alert', (txt) => {
            expect(txt).to.eql('dblclick event is fired')
        })
        cy.get('#dblclick').dblclick()
        //one more way. It is the same
        cy.get('#dblclick').trigger('dblclick')
    })

    it('Right click', () => {
        cy.on('window:alert', (txt) => {
            expect(txt).to.eql('contextmenu event is fired')
        })
        cy.get('#rightclick').rightclick()
        //one more way. It is the same
        cy.get('#rightclick').trigger('rightclick')
    })

    it('Right click Menu - JqueryUI Plugin - Options coming from Data', () => {
        cy.on('window:alert', (txt) => {
            expect(txt).to.eql('contextmenu event is fired')
        })
        cy.get('#box2').rightclick()
        //one more way. It is the same
        cy.get('#box2').trigger('rightclick')
        cy.contains('Two Oranges')
    })

    it('Mouseover and Mouseout', () => {
        cy.on('window:alert', (txt) => {
            expect(txt).to.eql('show is clicked')
        })
    //    cy.get('#msover').trigger('mouseover')
    //    cy.get('#show').should('be.visible')
    //    cy.get('#msover').trigger('mouseout')
    //    cy.get('#show').should('not.be.visible')

       //bad way it is not a user way
       //cy.get('#show').click({force: true}) //click on hiden element
    })
})

describe('Flipkart - somemove Event', () => {
    it('Flipkart - mousemove Event', () => {
        cy.visit('https://www.flipkart.com/')
        cy.get('a:contains("Login")').trigger('mouseover')
        cy.get('a:contains("Rewards")').trigger('click')
    })
})

describe('Spice Jet - somemove Event', () => {
    it('Flipkart - mousemove Event', () => {
        cy.visit('https://book.spicejet.com/Register.aspx')
        cy.get('#Login').trigger('mouseover')
        cy.get('#Login').trigger('focus')
        .should('have.id', 'Login')
        cy.get('#SubAgentLoginText').invoke('removeAttr', 'target').click()// open new tab in the same window
    })
})
