/// <reference types="cypress" />

before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
})

//Limpando a tela com o reload para cada teste do grupo
beforeEach(() => {
    //cy.reload()
})

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}

        //usando a biblioteca do chai assertion expect
        expect(obj).to.have.property('nome')

        //um objeto sozinho não pode usar o should pois ele pertence ao cypress.
        //cy.wrap(obj).should('have.property', 'nome')

        //objeto foi encapsulado pelo cypress portanto poderá usar o should()
        cy.get('#formNome').type('funciona?')

        cy.get('#formNome').then($el => {
            //$el.val('funciona via jquery')

            cy.wrap($el).type('funciona via cypress')
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(()=>{
            console.log('encontrei o primeiro botão')
        })

        //Uma promise somente será executado em sincronia 
        //com as demais partes do código, somente 
        //se ele estiver encapsulado pelo cypress pelo wrap()
        cy.wrap(promise).then(retorno => console.log(retorno))

        cy.get('#buttonList').then(()=>{
            console.log('encontrei o segundo botão')
        })

    })

    it('Its...', () => {
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        //com um objeto dentro de outro objeto
        //usando o its
        const obj2 = {nome: 'User 2', idade: 50, endereco: { rua: 'dos bobos'} }
        cy.wrap(obj2).should('have.property', 'nome', 'User 2')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.title().its('length').should('be.equal', 20)
    })

    it('Invoke...', () => {
        const getValue = () => 1;

        const soma = (a,b) => a + b;

        cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)
    
        cy.get('#formNome').invoke('val', 'Texto via invoke')

        //exemplo invocando um html para alterar o layout da pagina
        cy.get('#resultado').invoke('html', '<input type="button" value="hackeado">')
    })
})