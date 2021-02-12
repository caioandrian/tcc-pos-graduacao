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
		
		//APAGAR ESSAS DUAS LINHAS PARA TESTAR O SELECT DO LOCALSTORAGE ANTIGO
		//var jsonAutorizacao = {"Auth" : 123456};
		//localStorage.setItem("AuthId", JSON.stringify(jsonAutorizacao));

		//EXEMPLO DE SOLUÇÃO PARA TRATAR ESSA ATUALIZAÇÃO DA CHAVE AUTH
			/*if("Autorização" in chave){
				localStorage.removeItem("Autorização");

				var jsonAutorizacao = {"Auth" : 123456};
				localStorage.setItem("AuthId", JSON.stringify(jsonAutorizacao));
				//console.log('Acesso liberado');
				return true;
			}else{
				if(chave.Auth == 123456){
					//console.log('Acesso liberado');
					return true;
				}else{
					//console.log('Autorização inválida');
					alert('Autorização inválida');
					$("#conteudo").hide();
					return false;
				}
			}*/

		if(!localStorage.getItem("AuthId")){
			var jsonAutorizacao = {"Auth" : 123456};
			localStorage.setItem("AuthId", JSON.stringify(jsonAutorizacao));

			return true;
		}else{
			var chave = JSON.parse(localStorage.getItem("AuthId"));

			if("Auth" in chave){
				if(chave.Auth == 123456){
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
		//primeira alteração na nova versao, garantia estendida agora possui valores numericos
		//dois novos produtos
		var produtosFixos = [
			{"Codigo":"1","Nome":"Smartphone E6","Marca":"Motorola","Cor":"Vermelho","Estoque":6,"GarantiaMaxEstendida":2},
			{"Codigo":"2","Nome":"Smartphone X50","Marca":"Nokia","Cor":"Amarelo","Estoque":3,"GarantiaMaxEstendida":0},
			{"Codigo":"3","Nome":"Smartphone ZenFone","Marca":"Motorola","Cor":"Cinza","Estoque":10,"GarantiaMaxEstendida":0},
			{"Codigo":"4","Nome":"Smartphone Xingling","Marca":"Xiaomi","Cor":"Verde","Estoque":17,"GarantiaMaxEstendida":3},
			{"Codigo":"5","Nome":"Smartphone ZenFone z5s","Marca":"Motorola","Cor":"Preto","Estoque":15,"GarantiaMaxEstendida":0},
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
			"	<th>Garantia Máx. Estendida (em Anos)</th>"+
			"	<th></th>"+
			"	<th></th>"+
			"	<th></th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		if(typeof tbProdutos === 'undefined' || tbProdutos.length == 0 ){
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
	}*/

	/*function Excluir(){
		tbProdutos.splice(indice_selecionado, 1);
		localStorage.setItem("tbProdutos", JSON.stringify(tbProdutos));
		alert("Registro excluído.");
	}*/

	/*function AdicionarProdutoNoCarrinho(){
		var prod = tbProdutos[indice_selecionado];

		var produto = {
			Codigo   : prod.Codigo,
			Nome     : prod.Nome,
			Marca : prod.Marca,
			Cor    : prod.Cor,
			Qtde	: 1,
			Estoque	: prod.Estoque,
			GarantiaEstendida    : 0,
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

				//EXEMPLO DE SOLUÇÃO PARA TRATAR A FALHA DO SELECT COM VALORES DIFERENTES NA NOVA VERSÃO
				/*if(prod.GarantiaMaxEstendida.indexOf("Anos") != -1 ){
					prod.GarantiaMaxEstendida = trim(prod.GarantiaMaxEstendida.replace('Anos', ''));
				}*/

				var dynamic = "<option value='0'>Sem Garantia Estendida</option>";
				
				//antes garantia máxima do produto era cadastrado como '1 Ano', '2 Anos', '3 Anos'... 
				//agora somente números inteiros
				for (var x = 1; x <= prod.GarantiaMaxEstendida; x++) {
					dynamic += "<option value="+x+">"+ x +" Ano(s)</option>";
				};

				$("#tblListarCarrinho tbody").append("<tr>"+
					"	<td data-cy='carrinhoProdNome'>"+prod.Nome+"</td>" + 
					"	<td data-cy='carrinhoProdMarca'>"+prod.Marca+"</td>" + 
					"	<td data-cy='carrinhoProdCor'>"+prod.Cor+"</td>" + 
					"	<td data-cy='carrinhoProdQtde'> "+
						"	<input id='qtde_item_"+ [i] + "' class='item_qtde_carrinho' alt='"+ [i] +"' type='number' value='"+prod.Qtde+"' style='text-align: center' required/>" +
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

	/*
	$("#tblListar").on("click", ".btnAdicionarNoCarrinho", function(){
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