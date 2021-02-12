/// <reference types="cypress" />

describe('Work with basic elements', () => {
    //entrando na pagina que será utilizada em todos os testes do grupo
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //Limpando a tela com o reload para cada teste do grupo
    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')

        //have.text busca pelo texto completo
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links e Botões', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')

        //outra forma de buscar o texto, é pelo contains
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Texto a ser DIGITADO!!!')
        cy.get('#formNome').should('have.value', 'Texto a ser DIGITADO!!!')
        
        //Importante: No jquery selector existem alguns comandos 
        //que usam caracteres especiais como “reservados”, por exemplo os dois pontos :

        //Para evitar esse problema modificamos a linha que 
        //seria #elementosForm\:sugestoes para duas 
        //barras elementosForm\\:sugestoes, dessa forma 
        //o teste entenderá que tem uma barra antes dos dois pontos.
        cy.get('#elementosForm\\:sugestoes')
            .type('É um Text Area')
            .should('have.value', 'É um Text Area')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('sei la')

        //{backspace} irá apagar um caracter do texto digitado
        cy.get('[data-cy=dataSobrenome]')
            .type('Caio Augusto{backspace}{backspace}')
            .should('have.value', 'Caio Augus')

        //limpar o valor do campo usando clear
        //e usando o {selectall} para apagar tudo que tiver antes
        //segundo parametro do type, um {delay : 100} para digitar
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro encontrado{selectall}acerto', {delay: 100})
            .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length', 2)
    })

    it('CheckBox', () => {
        cy.get('#formComidaCarne')
        .click()
        .should('be.checked')

        //{multiple:true} irá permitir o clique em todas as opções
        cy.get('[name=formComidaFavorita]').click({multiple:true})

        cy.get('#formComidaCarne').should('not.be.checked')

        cy.get('#formComidaFrango').should('be.checked')
    })

    it.only('Combo', () => {
        //para selecionar ele aceita tanto o valor como o texto apresentado
        cy.get('[data-test=dataEscolaridade]')
            .select('2graucomp')
            .should('have.value', '2graucomp')

        //para verificar o valor somente será aceito o valor
        cy.get('[data-test=dataEscolaridade]')
            .select('Superior')
            .should('have.value', 'superior');

        //TODO validar opcoes do combo
        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)

        cy.get('[data-test=dataEscolaridade] option')
        .then($arr => {
                const values = []
                $arr.each(function() {
                    values.push(this.innerHTML)
                })

                //validando se o combo possui as opcoes Superior e Mestrado
                expect(values).to.include.members(["Superior", "Mestrado"])  
        })
    })

    it.only('MultipleCombo', () => {
        //não funciona selecionar pelo texto visível tem que selecionar o valor
        //normalmente apertamos o ctrl + as opcoes que queremos

        //usamos um array para selecionar!!
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])

        //validar opcoes selecionadas do combo multiplo

        //vai falhar
        /*cy.get('[data-testid=dataEsportes]')
            .should('have.value', ['natacao', 'Corrida', 'nada'])*/

        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]')
        .invoke('val')
        .should('eql', ['natacao', 'Corrida', 'nada'])
    })
})