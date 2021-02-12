/// <reference types="cypress" />

describe('Dinamic Tests', () => {

    //entrando na pagina que será utilizada em todos os testes do grupo
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        cy.reload()
    })

    it('Going back to the past', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '22/07/2020')

        //10/04/2012
        const dt = new Date(2012, 3, 10, 15, 23, 50)

        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')

    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', 1595)

        cy.get('#resultado > span').invoke('text').should('gt', 1595447579092)

        //clock default 31/12/1969 21:00:00 (3h a menos)
        cy.clock()
        cy.get('#buttonTimePassed').click()
        //menor ou igual
        cy.get('#resultado > span').invoke('text').should('lte', 1595447579092)

        /*cy.wait(5000)
        //maior ou igual
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)*/

        //controla os segundos do sistema.
        //ou seja o clock ira comecar agora com 5 segundos a mais.
        cy.tick(5000)
        //maior ou igual
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)

        cy.tick(10000)
        //maior ou igual
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 15000)
    })

})