class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }
    
    adciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    
    get negociacoes() {
        return [].concat(this._negociacoes)  // programação defensiva. Devolve objeto cópia do array original
    }
    
    esvazia() {
        this._negociacoes = [];
    }
}