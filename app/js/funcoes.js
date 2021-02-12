$(function(){
	function trySetlocalStorage() {
		try {
		  const testKey = "QualquerKey";
		  localStorage.setItem(testKey, testKey);
		  localStorage.removeItem(testKey);
		  
		  	return true;
		} catch (e) {
			return false;
		}
	}
	const isLocalStorageSupported = trySetlocalStorage();
	
	function getAutorizacao(){
		if(!localStorage.getItem("AuthId")){
			var jsonAutorizacao = {"Autorização" : 123456};
			localStorage.setItem("AuthId", JSON.stringify(jsonAutorizacao));
			
			return true;
		}else{
			var chave = JSON.parse(localStorage.getItem("AuthId"));
			
			if("Autorização" in chave){
				if(chave.Autorização == 123456){
					return true;
				}else{
					$("#conteudo").hide();
					$("#divAlertaAuth").removeClass('esconder');
					return false;
				}
			}else{
				$("#conteudo").hide();
				$("#divAlertaAuth").removeClass('esconder');
				return false;
			}
		}
	}

	//variaveis local storage definidas pelo usuario
	function getPreferenciasUsuario(){
		if (localStorage.getItem('backgroundcolor')) {
			$('body').addClass(localStorage.getItem('backgroundcolor'));
	
			if(localStorage.getItem('backgroundcolor') == "modoEscuro"){
				$('#checkBoxModoEscuro').attr('checked',true);
			}
		}
	}

	/*function getCatalogoProdutos(){
		var produtosFixos = [
				{"Codigo":"1","Nome":"Smartphone E6","Marca":"Motorola","Cor":"Vermelho","Estoque":6,"GarantiaMaxEstendida":"2 Anos"},
				{"Codigo":"2","Nome":"Smartphone X50","Marca":"Nokia","Cor":"Amarelo","Estoque":3,"GarantiaMaxEstendida":"Sem Garantia Estendida"},
				{"Codigo":"3","Nome":"Smartphone ZenFone","Marca":"Motorola","Cor":"Cinza","Estoque":10,"GarantiaMaxEstendida":"Sem Garantia Estendida"}
			]

		localStorage.setItem("tbProdutos", JSON.stringify(produtosFixos));

		var tbProdutos = localStorage.getItem("tbProdutos");

		tbProdutos = JSON.parse(tbProdutos); // Converte string para objeto

		if(tbProdutos == null)
			tbProdutos = [];

		return tbProdutos;
	}*/

	function getCarrinhoDeCompra(){
		var listaProdutosCarrinho = localStorage.getItem("listaProdutosCarrinho");

		listaProdutosCarrinho = JSON.parse(listaProdutosCarrinho); // Converte string para objeto
	
		if(listaProdutosCarrinho == null)
			listaProdutosCarrinho = [];

		return listaProdutosCarrinho;
	}
	
	if(isLocalStorageSupported){
		getAutorizacao();
		getPreferenciasUsuario();

		if(getAutorizacao()){
			var indice_selecionado = -1;

			//Recuperar Catalogo
			//var tbProdutos = getCatalogoProdutos();

			//Recuperar Carrinho
			var listaProdutosCarrinho = getCarrinhoDeCompra();
		}
	}

	/*function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"	<th>Código</th>"+
			"	<th>Nome</th>"+
			"	<th>Marca</th>"+
			"	<th>Cor</th>"+
			"	<th>Estoque</th>"+
			"	<th>Garantia Máx. Estendida</th>"+
			"	<th></th>"+
			"	<th></th>"+
			"	<th></th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		if(typeof tbProdutos === 'undefined' || tbProdutos.length == 0){
			$("#tblListar tbody").append("<tr>"+
			"	<td colspan='8' style='padding-left: 5px'>Nenhum Produto cadastrado</td>" + 
			"</tr>");
		}else{
			for(var i in tbProdutos){
				var prod = tbProdutos[i];
				$("#tblListar tbody").append("<tr>"+
					"	<td data-cy='catProdCodigo'>"+prod.Codigo+"</td>" + 
					"	<td data-cy='catProdNome'>"+prod.Nome+"</td>" + 
					"	<td data-cy='catProdMarca'>"+prod.Marca+"</td>" + 
					"	<td data-cy='catProdCor'>"+prod.Cor+"</td>" + 
					"	<td data-cy='catProdEstoque'>"+prod.Estoque+"</td>" + 
					"	<td data-cy='catProdGarantiaMaxEstendida'>"+prod.GarantiaMaxEstendida+"</td>" + 
					"	<td><i class='glyphicon glyphicon-shopping-cart btnAdicionarNoCarrinho' alt='"+i+"'></i></td>" + 
					"	<td><i class='glyphicon glyphicon-edit btnEditar' alt='"+i+"'></i></td>" + 
					"	<td><img src='images/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
					"</tr>");
			}
		}
	}

	function Excluir(){
		tbProdutos.splice(indice_selecionado, 1);
		localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
		alert("Registro excluído.");
	}

	function GetProduto(propriedade, valor){
		var prod = null;
        for (var item in tbProdutos) {
            var i = JSON.parse(tbProdutos[item]);
            if (i[propriedade] == valor)
			prod = i;
        }
        return prod;
	}
	
	function AdicionarProdutoNoCarrinho(){
		var prod = tbProdutos[indice_selecionado];

		var produto = {
			Codigo   : prod.Codigo,
			Nome     : prod.Nome,
			Marca : prod.Marca,
			Cor    : prod.Cor,
			Estoque    : prod.Estoque,
			Qtde	: 1,
			GarantiaEstendida    : "Sem Garantia Estendida",
			GarantiaMaxEstendida    : prod.GarantiaMaxEstendida
		};

		listaProdutosCarrinho.push(produto);

		localStorage.setItem("listaProdutosCarrinho", JSON.stringify(listaProdutosCarrinho));
		//console.log("carrinho: " + JSON.stringify(listaProdutosCarrinho))

		alert('Produto adicionado no carrinho!');

		ListarProdutosCarrinho();
	}*/

	function AtualizarItemCarrinho(){
		var prod = JSON.parse(listaProdutosCarrinho[indice_selecionado]);

		//na nova versao a key estoque passará a chamar stock (em inglês)
		if($("#qtde_item_" + indice_selecionado).val() <= parseInt(prod.Estoque)){
			listaProdutosCarrinho[indice_selecionado] = JSON.stringify({
				Codigo   : prod.Codigo,
				Nome     : prod.Nome,
				Marca : prod.Marca,
				Cor    : prod.Cor,
				Estoque    : prod.Estoque,
				Qtde	: $("#qtde_item_" + indice_selecionado).val(),
				GarantiaEstendida    : $("#garantia_item_" + indice_selecionado).val(),
				GarantiaMaxEstendida    : prod.GarantiaMaxEstendida
			});
			localStorage.setItem("listaProdutosCarrinho", JSON.stringify(listaProdutosCarrinho));
			
			alert("Informações do carrinho foram editadas.");
			$("#alerta_estoque_" + indice_selecionado).addClass('esconder');
			return true;
		}else{
			$("#alerta_estoque_" + indice_selecionado).removeClass('esconder');
			return false;
		}
	}

	function ExcluirItemCarrinho(){
		listaProdutosCarrinho.splice(indice_selecionado, 1);
		localStorage.setItem("listaProdutosCarrinho", JSON.stringify(listaProdutosCarrinho));
		alert("Registro no Carrinho excluído.");
	}

	function ListarProdutosCarrinho(){
		$("#tblListarCarrinho").html("");
		$("#tblListarCarrinho").html(
			"<thead>"+
			"	<tr>"+
			"	<th>Nome</th>"+
			"	<th>Marca</th>"+
			"	<th>Cor</th>"+
			"	<th>Qtde (*)</th>"+
			"	<th>Garantia Estendida (*)</th>"+
			"	<th></th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		if(typeof listaProdutosCarrinho === 'undefined' || listaProdutosCarrinho.length == 0){
			$("#tblListarCarrinho tbody").append("<tr>"+
			"	<td colspan='6' style='padding-left: 5px'>Carrinho Vazio</td>" + 
			"</tr>");
		}else{
			for(var i in listaProdutosCarrinho){
				var prod = listaProdutosCarrinho[i];

				//garantia máxima do produto sendo cadastrado como '1 Ano', '2 Ano(s)', '3 Ano(s)'...
				var dynamic = "<option value='Sem Garantia Estendida'>Sem Garantia Estendida</option>";
				
				var quantidade_max_garantia = prod.GarantiaMaxEstendida.substring(0,1);
				for (var x = 1; x <= quantidade_max_garantia; x++) {
					dynamic += "<option value='"+x+" Ano(s)'>"+ x +" Ano(s)</option>";
				};
				
				$("#tblListarCarrinho tbody").append("<tr>"+
					"	<td data-cy='carrinhoProdNome'>"+prod.Nome+"</td>" + 
					"	<td data-cy='carrinhoProdMarca'>"+prod.Marca+"</td>" + 
					"	<td data-cy='carrinhoProdCor'>"+prod.Cor+"</td>" + 
					"	<td data-cy='carrinhoProdQtde'> "+
						" 	<input id='qtde_item_"+ [i] + "' class='item_qtde_carrinho' alt='"+ [i] +"' type='number' value='"+prod.Qtde+"' style='text-align: center' required/>" +
						" 	<div id='alerta_estoque_"+ [i] + "' class='alert-danger esconder' role='alert' alt='"+ [i] +"' style='text-align: center; float:right'>"+
								"Qtde indisponível!"+
						"	</div>" +
					"	</td>" + 
					"	<td data-cy='carrinhoProdGarantiaEstendida'> " +
						"	<select id='garantia_item_"+ [i] + "' class='custom-select item_garantia_carrinho' alt='"+ [i] +"'>" +
								dynamic +
						'	</select>'+
						"</td>" + 
					"	<td><img src='images/delete.png' alt='"+i+"' class='btnExcluirItemCarrinho' /></td>" + 
					"</tr>");
				$("#garantia_item_"+ [i]).val(prod.GarantiaEstendida).find("option[value='"+ prod.GarantiaEstendida +"']").attr('selected', true);
			}
		}
	}

	if(isLocalStorageSupported){
		//Listar();
		ListarProdutosCarrinho();
	}
	
	/*$("#frmPesquisarProduto").on("submit",function(){
		localStorage.setItem("ultimaPesquisaDoUsuario", $('#txtPesquisarProduto').val());
		localStorage.removeItem("digitandoUmaPesquisa");
	});

	$("#txtPesquisarProduto").on("keyup",function(){
		localStorage.setItem("digitandoUmaPesquisa", $('#txtPesquisarProduto').val());
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});*/

	$("#tblListarCarrinho").on("change", ".item_qtde_carrinho", ".item_garantia_carrinho", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		AtualizarItemCarrinho();
	});

	$("#tblListarCarrinho").on("click", ".btnExcluirItemCarrinho", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		ExcluirItemCarrinho();
		ListarProdutosCarrinho();
	});

	/*$("#tblListar").on("click", ".btnAdicionarNoCarrinho", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		AdicionarProdutoNoCarrinho();
	});*/

	$('#checkBoxModoEscuro').click(function(event) {
		if($('#checkBoxModoEscuro').prop('checked')){
			localStorage.setItem("backgroundcolor", "modoEscuro");
		}else{
			localStorage.setItem("backgroundcolor", "modoClaro");
		}
		location.reload();
	});

});