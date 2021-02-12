/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('TESTES COM LOCAL STORAGE', () => {

    describe('APLICAÇÃO VERSÃO 1.0', () => {
        beforeEach( function() {
            cy.visit("./cypress/app/index.html");
            cy.restoreLocalStorage();
            cy.reload()
        })
    
        afterEach(() => {
            cy.saveLocalStorage();
        });

        describe('AUTORIZAÇÃO', ()=>{
            it('Deve verificar informação de autorização no localStorage', () => {
                expect(localStorage.getItem('AuthId')).to.be.not.null
    
                cy.wrap(JSON.parse(localStorage.getItem('AuthId')))
                    .then(obj => {
                        expect(obj).to.have.property('Autorização', 123456);
                })

                //cy.writeFile('fixtures/authid_V1.json', {"Autorização" : 123456})
            })
        })

        describe('MEU CARRINHO', () => {
            describe('Lista de Produtos no Carrinho', () => {
                it('Deve incluir três produtos no carrinho', () => {
                    cy.server()
                    cy.fixture('produtos_V1').then((produtos) => {
                        cy.route({
                            method: 'GET',
                            url: '/',
                            response: produtos
                        })
                        .its('response')
                        .then(response => {
                            window.localStorage.setItem("listaProdutosCarrinho", JSON.stringify(response))
                            expect(JSON.parse(localStorage.getItem('listaProdutosCarrinho'))).to.have.length(3)
                        })
                    })
                })

                it('Validar informações dos produtos no localStorage', () => {
                    //recuperando os dados do carrinho no localStorage 
                    let produtos = JSON.parse(localStorage.getItem('listaProdutosCarrinho'));

                    produtos.forEach(prod => {
                        expect(prod).to.be.a('object')
                        expect(prod.Nome).to.be.a('string')
                        expect(prod.Marca).to.be.a('string')
                        expect(prod.Cor).to.be.a('string')
                        expect(prod.Estoque).to.be.a('number')
                        expect(prod.Qtde).to.be.a('number')
                        expect(prod.GarantiaEstendida).to.be.a('string')
                        expect(prod.GarantiaMaxEstendida).to.be.a('string')
                    })
                })
            })
        })
    })

    describe.only('APLICAÇÃO VERSÃO 2.0', () => { 

        //Teste com injeção do LocalStorage antigo 
        before(() => {
            cy.server()
            cy.fixture('produtos_V1').then((produtos) => {
                cy.route({
                    method: 'GET',
                    url: '/',
                    response: produtos
                })
                .its('response')
                .then(response => {
                    window.localStorage.setItem("listaProdutosCarrinho", JSON.stringify(response))
                    expect(JSON.parse(localStorage.getItem('listaProdutosCarrinho'))).to.have.length(3)
                })
            })

            cy.fixture('authid_V1').then( (authId) => {
                window.localStorage.setItem("AuthId", JSON.stringify(authId))
            })

            cy.saveLocalStorage();
        })

        beforeEach(()=>{
            cy.visit("./cypress/app/index_nova_versao.html");
            cy.restoreLocalStorage();

            cy.reload()
        })

        afterEach(() => {
            cy.saveLocalStorage();
        });

        describe('AUTORIZAÇÃO', ()=>{
            it('Deve verificar informação no localStorage do usuário', () => {
                expect(localStorage.getItem('AuthId')).to.be.not.null
    
                //Alteração na Propriedade de Autorização para Auth
                cy.wrap(JSON.parse(localStorage.getItem('AuthId')))
                    .then(obj => {
                        expect(obj).to.have.property('Auth', 123456);
                })
            })
        })
        
        describe('MEU CARRINHO', () => {
            describe('Lista de Produtos no Carrinho', () => {
                it('Validar informações dos produtos no localStorage', () => {
                    expect(localStorage.getItem('listaProdutosCarrinho')).to.be.not.null
                    expect(JSON.parse(localStorage.getItem('listaProdutosCarrinho'))).to.be.a('array')
                    
                    //recuperando os dados do carrinho no localStorage 
                    let produtos = JSON.parse(localStorage.getItem('listaProdutosCarrinho'));

                    produtos.forEach(prod => {
                        expect(prod).to.be.a('object')
                        expect(prod.Nome).to.be.a('string')
                        expect(prod.Marca).to.be.a('string')
                        expect(prod.Cor).to.be.a('string')
                        expect(prod.Estoque).to.be.a('number')
                        expect(prod.Qtde).to.be.a('number')
                        expect(prod.GarantiaEstendida).to.be.a('number')
                        expect(prod.GarantiaMaxEstendida).to.be.a('number')
                    })
                })
            })
        })
    })

    describe('VERSÃO 2.0 - SEM USAR DADOS ANTERIORES', () => {
        before(() => {
            cy.on('window:before:load', window => {
                window.localStorage.clear();
            });
        })

        beforeEach(()=>{
            cy.visit("./cypress/app/index_nova_versao.html");
            
            cy.restoreLocalStorage();
            cy.reload()
        })

        afterEach(() => {
            cy.saveLocalStorage();
        });

        describe('VERIFICAR AUTORIZAÇÃO', ()=>{
            it('Deve verificar informação no localStorage do usuário', () => {
                expect(localStorage.getItem('AuthId')).to.be.not.null
    
                //Alteração na Key de Autorização para Auth
                cy.wrap(JSON.parse(localStorage.getItem('AuthId')))
                    .then(obj => {
                        expect(obj).to.have.property('Auth', 123456);
                })
            })
        })
        
        /*describe.skip('PREFERÊNCIAS DO USUÁRIO', () => {
            it('Deve alterar para Modo Escuro', () => {
                cy.get('#checkBoxModoEscuro').click();
        
                cy.get('body').should( body =>{
                    expect(body).to.have.class('modoEscuro')
                })
            })
        
            it('Validar preferências do usuário no localStorage', () => {
                expect(localStorage.getItem('backgroundcolor')).not.be.null
        
                cy.get('body').should( body =>{
                    expect(localStorage.getItem('backgroundcolor')).to.be.equal('modoEscuro')
                })
            })
        })*/

        describe('MEU CARRINHO', () => {
            describe('Lista de Produtos no Carrinho', () => {
                it('Deve incluir três produtos no carrinho', () => {
                    cy.server()

                    cy.route({
                        method: 'GET',
                        url: '/',
                        response: [
                            {"Codigo":"1","Nome":"Smartphone E6","Marca":"Motorola","Cor":"Vermelho","Estoque":6, "Qtde": 1, "GarantiaEstendida": 0, "GarantiaMaxEstendida":2},
                            {"Codigo":"2","Nome":"Smartphone X50","Marca":"Nokia","Cor":"Amarelo","Estoque":3, "Qtde": 1, "GarantiaEstendida": 0, "GarantiaMaxEstendida":0},
                            {"Codigo":"3","Nome":"Smartphone ZenFone","Marca":"Motorola","Cor":"Cinza","Estoque":10, "Qtde": 1, "GarantiaEstendida": 0, "GarantiaMaxEstendida":0}
                        ]
                    })
                    .its('response')
                    .then(response => {
                        window.localStorage.setItem("listaProdutosCarrinho", JSON.stringify(response))
                        console.table((JSON.parse(localStorage.getItem('listaProdutosCarrinho'))))
                    })
                })

                it('Validar informação do produto no localStorage', () => {
                    expect(localStorage.getItem('listaProdutosCarrinho')).to.be.not.null
                    expect(JSON.parse(localStorage.getItem('listaProdutosCarrinho'))).to.be.a('array')
                    
                    //considerando apenas o cenário com a nova versão da aplicação
                    let produtos = JSON.parse(localStorage.getItem('listaProdutosCarrinho'));

                    produtos.forEach(prod => {
                        expect(prod).to.be.a('object')
                        expect(prod.Nome).to.be.a('string')
                        expect(prod.Marca).to.be.a('string')
                        expect(prod.Cor).to.be.a('string')
                        expect(prod.Estoque).to.be.a('number')
                        expect(prod.Qtde).to.be.a('number')
                        expect(prod.GarantiaEstendida).to.be.a('number')
                        expect(prod.GarantiaMaxEstendida).to.be.a('number')
                    })
                })
            })
    
        })
    })
})

