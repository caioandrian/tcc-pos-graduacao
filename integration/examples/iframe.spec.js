/// <reference types="cypress" />

describe('Work with IFRAME', () => {
    //entrando na pagina que será utilizada em todos os testes do grupo
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        //cy.reload()
    })

    it('Deve preencher campo de texto do iframe', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')

            //variável body precisa ser gerenciada pelo cypress
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')

            //cy.wrap(body).find('#otherButton').click()
        })
    })

    it('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })

        cy.get('#otherButton').click()
    })

})