// para que o arquivo tenha algum teste, 
// e não retorne erro de não possuir testes.
it('sem testes ainda', function () {})

// colocamos uma espera explicita para servir
// de exemplo, de quando demoramos para receber uma resposta
// seja do banco de dados, ou outro meio.
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}


const system = () => {
    console.log('init');
    
    //Para fazer interpolação de variável, 
    //tem que colocar a string entre crase (`).

    //conceito de promises
    const prom = getSomething();
    prom.then(some => { console.log(`Something is ${some}`) });
    
    //getSomething().then(some => { console.log(`Something is ${some}`) });
    
    //const something = getSomething();
    //console.log(`Something is ${something}`);
    //console.log("Something is "+ something);

    console.log('end');
}

// conceito do AWAIT
// não é recomendado pois também usamos o retrying futuramente.
/*
    const system = async() => {
	console.log('init');
	const some = await getSomething();
	console.log(`Something is ${some}`) });
	console.log(end);
}*/





system();
