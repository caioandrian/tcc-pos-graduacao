// para que o arquivo tenha algum teste, 
// e não retorne erro de não possuir testes.
it('nada agora', function () {})

// uma estrutura de função normal 
/*function soma(a, b){
    return a + b;
}*/

// funcao anonima
/*const soma = function (a,b){
    return a+b;
}*/

// funcao usando arrow functions
/*const soma = (a,b) => {
    return a+b;
}*/

// forma alternativa para utilizar a funcao arrow
// o que vem depois da flecha entende-se que é o retorno da função.
const soma = (a,b) => a + b;

/*
Exemplo 3: (ERRO UNDEFINED)
Um erro comum quando se trata de arrow functions 
é usar => sem passar o retorno ao montar 
a estrutura do primeiro exemplo.

Const soma = (a,b) => {
	a + b;
}
*/

/*
Exemplo 4: (ERRO)
Quando possuir apenas um parâmetro, 
pode usar sem os parentêses, porém quando
tiver dois ou mais parâmetros, é obrigatório usar (a,b).

Const soma = a,b => {
	a + b;
}
*/


console.log(soma(2,6));

it('a function test...', function (){
    console.log('Function', this)
})

it('a arrow test...', () => 
    console.log('Function', this)
)