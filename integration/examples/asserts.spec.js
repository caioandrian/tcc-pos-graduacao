/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;

    expect(a).equal(1);
    
    expect(a, 'Deveria ser 1...').equal(1);

    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})

it('Truthy', () => {
    const a = true;
    const b = null;

    //let é o novo var (variavel)
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
})

it('Object Equality', ()=> {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj);
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.equal(obj)

    //deep ira verificar os valores do objeto
    expect(obj).to.be.deep.equal({ a: 1, b: 2 })
    expect(obj).eql({ a: 1, b: 2 })

    //vai dar erro pois nao sao o mesmo objeto
    //expect(obj).to.be.equal({ a: 1, b: 2 })

    //para pegar apenas uma propriedade do objeto
    expect(obj).include({ a: 1 })
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)

    expect(obj).to.not.be.empty
    expect({}).to.be.empty
})

it('Arrays', () => {
    const arr = [1,2,3]

    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3])

    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})

it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect([]).to.be.a('array')
    expect({}).to.be.a('object')
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.eq('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')

    //possui exatamente o de
    expect(str).to.match(/de/)

    //deve iniciar com 
    expect(str).to.match(/^String/)

    //deve finalizar com 
    expect(str).to.match(/teste$/)

    expect(str).to.match(/.{15}/)

    //deve possui apenas letras 
    expect(str).to.match(/\W+/)

    //nao contem numeros
    expect(str).to.match(/\D+/)
})

it('Números', () => {
    const number = 4
    const floatNumber = 5.133

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)

    expect(floatNumber).to.be.equal(5.133)
    expect(floatNumber).to.be.closeTo(5.15, 0.1)

    expect(floatNumber).to.be.above(5)
})