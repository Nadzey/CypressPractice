/// <reference types="cypress"/>

describe('Document Test Suite Commands', () => {
    beforeEach(() => {
        cy.visit('#/login?_k=k4oq8m')
    })

    it('Document Test Commands - Title Properties', () => {
        cy.document().should(doc => {
            const titleText = doc.title
            expect(titleText).to.eql('Conduit')
        })
    })

    it('Cy test Commands - Title Properties', () => {
        cy.title().then(txt => {
            expect(txt).to.eql('Conduit')
        })
    })

    it('Document Test Commands - Get width & Height', () => {
        cy.document().should(doc => {
            const  docObj = Cypress.$(doc)
            let docHeight = docObj.height()
            let docWidth = docObj.width()
            console.log(`Screen Height is ${docHeight}`)
            console.log(`Screen Width is ${docWidth}`)
        })
    })
    //no cypress command to determine height and width

    it('Cy Test commands - Set Viewport', () => {
        cy.viewport('iphone-8', 'landscape') //you can use your own lenght and width, insted of selecting device tipe and (899, 100)
    })

    it('Document Test Commands - Cookies',() => {
        cy.document().should(doc => {
            //create
            document.cookie = "username = QA TEST"
            //reade
            console.log(doc.cookie)
            //uodate
            doc.cookie = "username = New QA Tester"
            console.log(doc.cookie)
            //clear
            doc.cookie = "username"

        })
    })

    it('CY test Commands - Cookies',() => {
        //create
        cy.setCookie('newUsername', 'QA Nadia')
        //read
        cy.getCookies()
        cy.getAllCookies()
        
        //update
        cy.setCookie('newUsername', 'QA Nadia Koluzaeva')
        //clear
        cy.clearCookies()
        cy.clearAllCookies()
    })
})