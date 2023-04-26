/// <reference types="cypress"/>

describe('File Uploads with Cypress - Plugin "cypress-file-upload"', () => {

    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/fileupload.html')
    })
    
    it('Single File Upload Light Dom', () => {
        cy.get('#file-upload1').attachFile('img.jpg')
        cy.get('#fileName1').should('have.text', 'img.jpg')
        
    })

    it('Single File Upload Light Dom + Asing new name', () => {
        cy.get('#file-upload1').attachFile({
            filePath: "img.jpg",
            fileName: "newImg.jpg"
        })
        cy.get('#fileName1').should('have.text', 'newImg.jpg')
        
    })

    it('Single File Upload Shadow Dom', () => {
        cy.get("button[onclick='attachShadowDom()']").click()
        cy.get('#file-upload2',
        {includeShadowDom: true}
        )
        .attachFile('img.jpg')
        cy.get('#fileName2',
        {includeShadowDom: true}
        ).should('have.text', 'img.jpg')
        
    })

    it('File Upload - Drag Drop', () => {
        cy.visit('https://css-tricks.com/examples/DragAndDropFileUploading/')
        cy.get('#file').attachFile('img.jpg', {subjectType: "drag-n-drop"})
        cy.contains('Done! ').should('be.visible')
    })

    it('Multiple File Upload - Drag Drop', () => {
        
        cy.get('#file-upload2')
        .attachFile('img.jpg')
        .attachFile('img1.jpg')
    })

    it('Image File Upload - Drag Drop', () => {
        
        cy.get('#holder')
        .attachFile('img.jpg',
        {
            subjectType: "drag-n-drop"
        })
       
    })
})