/// <reference types="cypress"/>

describe('Handle Single, Multi-select & Customized Dropdowns in Cypress | invoke, alias, blur', () => {
    
    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/differentdropdowntypes')
    })

    it('Select with Text Value', () => {

        cy.get('#speed').select('Fast').should($el => {
        // JS
        //     const el = $el[0]
        //     expect(el.options[el.selectedIndex].value).to.eql('4')
        //     expect(el.options[el.selectedIndex].text).to.eql('Fast')
        // })
    
        //JQuery
        expect($el.val()).to.eq('4')
        expect($el.find('option:selected').text()).to.eql('Fast')
        })
        cy.get('#selectSpeed').should('have.text', 'Fast')

        //cypress method
        cy.get('#speed')
            .select('Slow')
            .find('option:selected')
            .as('speed')
        cy.get('@speed').invoke('text')
                        .should('eq', 'Slow')
        cy.get('@speed').invoke('val')
                        .should('eq', '2')
        cy.get('#selectSpeed').should('have.text', 'Slow')
    })

    it('Select with Option Value', () => {
        cy.get('#files')
          .select('somefile')
          .should(($el) => {
            //JS
        //     const el = $el[0]
        //     expect(el.options[el.selectedIndex].value).to.eql('somefile')
        //     expect(el.options[el.selectedIndex].text).to.eql('Some unknown file')
        //   })

        //JQuery
        expect($el.val()).to.eql('somefile')
        expect($el.find('option:selected').text()).to.eql('Some unknown file')
        })
        cy.get('#selectFiles').should('have.text', 'Some unknown file')
    })

    it('Atocompletion dropdown built using Input type= "text" html element', () => {
        cy.get('#myInput')
        .type('Ind{downarrow}{enter}')
        .blur()
        .should('have.value', 'India')
       
        cy.get('#selectCountries').should('have.text', 'India')
    })

    it('Multi Select - Select html element', () => {
        cy.get('#cselect')
        .select(['Britain', 'Anguilla', 'Russia'])
        .invoke('val')
        .should('deep.equal',['Russia', 'Britain', 'Anguilla'] )
    })

    it('Multi Select - Select html element2', () => {
        cy.get('#cselect')
        .select(['Britain', 'Anguilla', 'Russia'])
        .find('option:selected')
        .invoke('text')
        .should('eq',['Russia', 'Britain', 'Anguilla'].join( '') )
    })

    it('Multi Select - Select html element - Chosen Jquery Plugin', () => {
        cy.get('[value="Choose a Country"]')
        .type('United States{enter}')
        .type('Albania{enter}')
        .type('Angola{enter}')
        cy.get('#mSelect')
        .invoke('val')
        .should('deep.equal', ['United States', 'Albania', 'Angola'])
    //Delete Albania
    cy.get(".search-choice span:contains('Albania')").next('a').click()
    })
})

describe('Selection of ddf file and auto comletion', () => {
    it('testautomation practice select drop down', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('#files').select('PDF file')
    })

    it('Google Auto Completion', () => {
        cy.visit('https://www.google.com/')
        cy.get('[name="q"]').type('javascript')
        cy.get('li.sbct span')
            .contains('javascript map')
            .click({force: true})
    })
    it('phptravels.net custom drop down', () => {
        cy.visit('https://phptravels.net')
        cy.get('#currency').click()
        cy.get('a.dropdown-item').contains(' SAR').click()
    })
})