/// <reference types="cypress" />

before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

//Limpando a tela com o reload para cada teste do grupo
beforeEach(() => {
    //cy.reload()
})

describe('Fixtures Tests', () => {

    //Para usarmos os dados da fixture, nesse exemplo criamos um alias (.as(‘usuario’)). 
    //E para que o código reconheça esse aliás precisamos remover o arrow function que compõe o it !!!

    it('Get data from fixture file', function() {
        cy.fixture('userData').as('usuario').then( () =>{
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name='formSexo'][value=${this.usuario.sexo}]`).click()

            //entre crases quando for dentro da tag!!
            cy.get(`[name='formComidaFavorita'][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)     

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })
})