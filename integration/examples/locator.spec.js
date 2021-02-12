/// <reference types="cypress" />

describe('Work with basic Elements', () => {
    //entrando na pagina que será utilizada em todos os testes do grupo
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        //cy.reload()
    })

    it('Using jquery selector', () => {
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(4) > [type="checkbox"]')
        
        //jquery selector
        cy.get('#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        //#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input
        //cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get("[onclick*='Francisco']")

        // element ~ siblings	$("div ~ p")
        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
    })

    it('Using xpath', () => {
        cy.xpath("//input[contains(@onclick, 'Francisco')]")

        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]")

        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('testandoo...')
    })

})