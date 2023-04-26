describe('Drag and Drop (Native and mouse drag events) (jqueryui and angular)', () => {
    function dndNative(source, target, pixel) {
        const dataTransfer = new DataTransfer()
        function inner(obj) {
        cy.get(source).trigger('dragstart', {dataTransfer})
        cy.get(target).trigger('dragover', obj)
        cy.get(target).trigger('drop', {dataTransfer})
        cy.get(source).trigger('dragend')
    }
    if (pixel) {
        cy.get(target).then(($el) => {
            const x1 = $el[0].getBoundingClientRect().left
            const x2 = $el[0].getBoundingClientRect().width
            const xc = x1 + x2 / 2
            const y1 = $el[0].getBoundingClientRect().top
            const y2 = $el[0].getBoundingClientRect().height
            const yc = y1 + y2 / 2
            inner(
                {clientX: xc, clientY: yc}
            )
        })
    } else {
        inner(null)
    }
}
function dndMouse (source, target) {
    cy.get(target).then(($el) => {
        const x1 = $el[0].getBoundingClientRect().left
            const x2 = $el[0].getBoundingClientRect().width
            const xc = x1 + x2 / 2
            const y1 = $el[0].getBoundingClientRect().top
            const y2 = $el[0].getBoundingClientRect().height
            const yc = y1 + y2 / 2
            cy.get(source)
            .trigger('mousedown')
            .trigger('mousemove', {clientX: xc, clientY: yc})
            .trigger('mouseup')
        })
}

    beforeEach(() => {
        cy.visit('https://qaboxletstestcypresspracticesite.netlify.app/dragndrop.html')
    })

    it('Drag and drop - HTML Native Drag APIS - Drag Events', () => {
    cy.get('.fill').drag('div.empty:nth-of-type(2)')
    })

    it('Drag and drop - HTML Native Drag APIS - Drag Events2', () => {
        const dataTransfer = new DataTransfer()
        cy.get('.fill').trigger('dragstart', {dataTransfer})
        cy.get('div.empty:nth-of-type(2)').trigger('drop', {dataTransfer})
        cy.get('.fill').trigger('dragend')
        })

    it('Drag and Drop - HTML Mouse Events', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.eql('Smaller circle is dropped inside bigger circle')
        })
        cy.get('#divTwo2').drag('#divOne1')
    })

    it('Drag and Drop - HTML Mouse Events2', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.eql('Smaller circle is dropped inside bigger circle')
        })
        cy.get('#divOne1').then(($el) => {
            const x1 = $el[0].getBoundingClientRect().left
            const x2 = $el[0].getBoundingClientRect().width
            const xc = x1 + x2 / 2
            const y1 = $el[0].getBoundingClientRect().top
            const y2 = $el[0].getBoundingClientRect().height
            const yc = y1 + y2 / 2
            cy.get('#divTwo2')
            .trigger('mousedown')
            .trigger('mousemove', {clientX: xc, clientY: yc})
            .trigger('mouseup')
        })
    })

    it('Mouse - Drag and Drop - Sort', () => {
        cy.get('#divTwo').drag('#divFour')
        // center approach won't generate desired result
        const dataTransfer = new DataTransfer()
        cy.get('#divTwo').trigger('dragstart', {dataTransfer})
        cy.get('#divFive').trigger('dragover')
        cy.get('#divFive').trigger('drop', {dataTransfer})
        cy.get('#divTwo').trigger('dragend')
    })

    it('Drag and drop - Html Native Drag APIs - Drag Events, using function', () => {
        dndNative('.fill', 'div.empty:nth-of-type(2)', true)
    })

    it('Drag and Drop - HTML Mouse Events, using function', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.eql('Smaller circle is dropped inside bigger circle')
        })
        dndMouse('#divTwo2','#divOne1')
    })

    it.only('Drag and Drop JQuery', () => {
cy.on('window:alert', (text) => {
    expect(text).to.eql('I am dropped')
})

cy.get('#drop').then((targetElms) => {
    const targetRect = targetElms[0].getBoundingClientRect()
    let targetCX = targetRect.left + targetRect.width / 2
    let targetCY = targetRect.top + targetRect.height / 2
    cy.get('#drag').then((sourceElms) => {
        const sourceRect = sourceElms[0].getBoundingClientRect()
        let sourceCX = sourceRect.left + sourceRect.width / 2
        let sourceCY = sourceRect.top + sourceRect.height / 2
        cy.get('#drag')
        .trigger('mousedown', {which: 1, pageX: sourceCX, pageY: sourceCY})
        .trigger('mousemove', {which: 1, pageX: targetCX, pageY: targetCY})
        .trigger('mouseup')
    })
})
    })
 
})
describe('', () => {
    it('Angular App - Mouse Event', () => {
        cy.visit('https://angular-oxkc7l-zirwfs.stackblitz.io/')
        cy.contains('Run this project', {timeout: 10000}).click()
        //this will be not working with Angular
        //cy.get("div[id='cdk-drop-list-0'] div:nth-child(1)").drag("div[id='cdk-drop-list-1'] div:nth-child(4)")
        cy.get("div[id='cdk-drop-list-0'] div:nth-child(1)").then((el) => {
            const draggable = el[0] //pick up this
            cy.get("div[id='cdk-drop-list-1'] div:nth-child(4)").then((el) => {
                const droppable = el[0] // drop over this
                const coords = droppable.getBoundingClientRect()
                draggable.dispatchEvent(new MouseEvent('mousemove'))
                draggable.dispatchEvent(new MouseEvent('mousedown'))
                draggable.dispatchEvent(
                    new MouseEvent('mousemove', {clientX: 10, clientY: 0})
                )
                draggable.dispatchEvent(
                    new MouseEvent( 'mousemove', {
                        clientX: coords.x + 10,
                        clientY: coords.y + 10,
                    })
                )
                draggable.dispatchEvent(new MouseEvent('mouseup'))
            })
            cy.get('#cdk-drop-list-1').should('contain', 'Get to work')
            // cy.get('#cdk-drop-list-0 > .cdk-drag')
            // .eq(3)
            // .should('contain', 'Get to work')
         })
    })
})
