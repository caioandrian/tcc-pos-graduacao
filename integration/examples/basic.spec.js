/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        /*
        
        //para pegar o titulo da página cy.title()
        const title = cy.title()

        console.log(title)
        //não vai funcionar pois irá retornar um objeto $chainer
        
        */

        cy.title().should('be.equal', 'Campo de Treinamento');
        cy.title().should('contain', 'Campo de Treinamento');

        cy.title().should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo');

        let syncTitle

        //sincronizando o titulo
        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        //exemplo usando apenas o jquery para escrever no elemento 
        //usando a variavel definida fora da funcao
        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        //Exemplo de como utilizar uma variável 
        //que foi definida fora da função com o cypress:
        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    
        cy.get('#buttonSimple').click();
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')

        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!');
    })
})

