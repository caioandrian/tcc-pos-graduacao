/// <reference types="cypress" />

describe('Work with POPUP', () => {
    //entrando na pagina que será utilizada em todos os testes do grupo
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        cy.reload()
    })

    it('Deve verificar se o popup invocado', () => {
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })

        //invocando a popup
        cy.get('#buttonPopUp').click()

        //validando se a popup apareceu
        //usar o stub atraves do @ nome do stub
        cy.get('@winOpen').should('be.called')

        //caso fosse um popup automatico
        //poderia verificar sem a necessidade do clique antes.
    })

    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })

        cy.get('#otherButton').click()
    })

    describe.only('With links...', () => {

        it('Check pop url', () => {
            //o texto do link possui o texto Popup2
            cy.contains('Popup2').should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')

                cy.visit(href)

                cy.get('#tfield').type('testandoo')
            })
        })

        //Como forçar o acesso na mesma página? 
        //Removemos o atributo Target do link Popup2!
        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
                
            cy.get('#tfield').type('testandoo')
        })

    })

})