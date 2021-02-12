import loc from './locators'

Cypress.Commands.add('adicionarProdutoCarrinho', (posicao_array) => {
    cy.get(loc.CATALOGO_PRODUTOS.BTN_ADICIONAR_N0_CARRINHO).eq(posicao_array).click();
})