/// <reference types="cypress" />

describe('Work with Alerts', () => {
    //entrando na pagina que será utilizada em todos os testes do grupo
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        //cy.reload()
    })

    it.only('Alert test', () => {
        /*cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })

        cy.get('#alert').click()*/

        cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com Mock', () => {

        //nomeando um mock/stub
        const stub = cy.stub().as('alerta')

        //mock sendo executado a partir do elemento esperado
        cy.on('window:alert', stub)

        //o clique irá chamar um elemento do tipo window:alert
        cy.get('#alert').click().then( () => {
            //parametros que ela deve ter sido chamada
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })

        cy.get('#confirm').click()
    })

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })

        cy.get('#confirm').click()
    })

    it('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt')
                .returns('42') //texto que será digitado no prompt
        })
        
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
        
    })

    it('Desafio', () => {
    //Exemplo de como usar uma sequência de mock/stub 
    //para tratar campos obrigatórios que utilizam um alerta.

        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        //alert: nome é obrigatório
        cy.get('#formCadastrar')
            .click()
            .then( () => 
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            )

        cy.get('#formNome').type('caio')

        //alert: sobrenome é obrigatório
        cy.get('#formCadastrar')
            .click()
            .then( () => 
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            )
                
        cy.get('[data-cy=dataSobrenome]').type('santos')

        //alert: sexo é obrigatório
        cy.get('#formCadastrar')
            .click()
            .then( () => 
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            )

        cy.get('#formSexoMasc').click()

        //validar mensagem de Cadastrado!
        cy.get('#formCadastrar')
            .click()
            .then( () => 
                cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
            )
    })

})