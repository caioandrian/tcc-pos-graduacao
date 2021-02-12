/// <reference types="cypress" />

describe('Esperas....', () => {
    //entrando na pagina que será utilizada em todos os testes do grupo
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        //cy.reload()
    })

    it('Deve aguardar elemento estar disponível', ()=>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()

        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')

        cy.get('#novoCampo').type('Hello, World')
    })

    it.only('Retentativas', ()=>{
        cy.get('#buttonDelay').click()
        
        cy.get('#novoCampo')
        .should('not.exist')
        .should('exist')

        /*cy.get('#novoCampo')
        .should('not.exist')
        .should('exist')

            //Vai dar dois erros, sendo um deles null to exist
        */

        /*cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        
            //Vai funcionar
        */
        
    })

    it.only('Cuidado com a busca', ()=>{
        cy.get('#buttonList').click()

        //usando o find
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        /*cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 2')*/

        //vai falhar essa verificação pois 
        //o escopo do segundo .get('#lista li')
        //ficou reduzindo ao primeiro li referente ao Item 1
        //motivo: o segundo li está com delay e demorou para 
        //aparecer.

        cy.get('#lista li span').should('contain', 'Item 2')
    })

    it.only('Uso do timeout', ()=>{
        //cy.get('#buttonDelay').click()

        //alterar o tempo máximo de espera em cada ação do teste
        //irá esperar no máximo 30seg
        //cy.get('#novoCampo', {timeout:30000}).should('exist')

        cy.get('#buttonListDOM').click()

        //Outra forma é fazer uma espera explícita, 
        //com o .wait(). Porém não é o mais 
        //recomendado utilizar esse método.
        //cy.wait(5000)
        //cy.get('#lista li span')
        //  .should('contain', 'Item 2')

        cy.get('#lista li span', {timeout:10000})
        .should('have.length', 1)

        cy.get('#lista li span', {timeout:10000})
        .should('have.length', 2)
    })

    it.only('Click retry', ()=>{
        cy.reload()

        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    it.only('Should vd Then', ()=>{
        cy.get('#buttonListDOM').then($el => {
            //.should('have.length', 1)
            //console.log($el)
            expect($el).to.have.length(1)
            return 2

        }).and('have.id', 'buttonListDOM')
    })

    it.only('Should vd Then exemplo 2', ()=>{
        cy.get('#buttonListDOM').then($el => {
            //.should('have.length', 1)
            //console.log($el)
            expect($el).to.have.length(1)
            return 2
            
        }).and('equal', 2)
        .and('not.have.id', 'buttonListDOM')
    })

    it.only('Should vs Then exemplo 3', () => {

        //NÃO utilizar o Should caso você 
        //precise executar outra busca 
        //dentro do teste! Poderá cair em um loop infinito. 
        //Nesse caso recomenda-se usar o then.
        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
    })

})