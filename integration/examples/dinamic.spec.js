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

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name='formSexo'][value='F']`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')     
    
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })

        it.only('Deve selecionar todos usando o each', () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name='formSexo'][value='F']`).click()

            cy.get('[name=formComidaFavorita]').each($el => {
                //$el.click()
                if($el.val() != 'vegetariano')
                    cy.wrap($el).click()
            })

            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')     
    
            cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
        })

    })
})