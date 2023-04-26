/// <reference types="cypress"/>

describe('Handling Frames and IFrames', () => {
    
    it('iFrame - Type in the body - JavaScript Way', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe');
        cy.get('iframe#mce_0_ifr').within(fr => {
          const [myIframe] = fr.get();
          myIframe.contentDocument.body.getElementsByTagName('p')[0].textContent = "Test";
        });
    });

    it('IFrame - Type in the body - JQuery way', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe')
        cy.get('#mce_0_ifr').within(($frame) => {
            const body = $frame.contents().find('body#tinymce')
            cy.wrap(body).clear().type('Test')
        })
    })

    it('Nested Frames - Fetch the text - JavaScript Way', () => {
        cy.visit('https://the-internet.herokuapp.com/nested_frames')
        cy.get('[src="/frame_top"]').within($frame => {
            const [frame_top] = $frame.get()
            const text = frame_top.contentDocument.body.getElementsByTagName('frame')[1]
            .contentDocument.body.querySelector('div#content').innerText
            expect(text).to.be.eql('MIDDLE')
        })  
    })

    it('Nested Frames - Fetch the text - JQuery way', () => {
        cy.visit('https://the-internet.herokuapp.com/nested_frames')
        cy.get('[src="/frame_top"]').within($frame => {
            cy.wrap($frame.contents().find('[src="/frame_middle"]')).within(fr => {
                cy.wrap(fr.contents().find('#content')).should('have.text', 'MIDDLE')
            })
        })
    })
})