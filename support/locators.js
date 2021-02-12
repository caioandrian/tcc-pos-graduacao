const locators = {
    CATALOGO_PRODUTOS:{
        BTN_EDITAR: '.btnEditar',
        CODIGO: "[data-cy='catProdCodigo']",
        NOME: "[data-cy='catProdNome']",
        MARCA: "[data-cy='catProdMarca']",
        COR: "[data-cy='catProdCor']",
        ESTOQUE: "[data-cy='catProdEstoque']",
        GARANTIA_MAX_ESTENDIDA: "[data-cy='catProdGarantiaMaxEstendida']",
        BTN_ADICIONAR_N0_CARRINHO: '.btnAdicionarNoCarrinho'
    },
    CARRINHO_PRODUTO:{
        NOME: "[data-cy='carrinhoProdNome']",
        MARCA: "[data-cy='carrinhoProdMarca']",
        COR: "[data-cy='carrinhoProdCor']",
        QTDE: "[data-cy='carrinhoProdQtde']",
        GARANTIA_ESTENDIDA: "[data-cy='carrinhoProdGarantiaEstendida']"
    }
}

//exportar a variavel para poder 
//ser utilizada quando necessario
export default locators;
