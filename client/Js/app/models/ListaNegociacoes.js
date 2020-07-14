class ListaNegociacoes {
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha; // contem a função que atualiza a view
    }
    
    adciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);  //executa a função com o objeto atual sendo o "model"

        // Exemplo recebendo o contexto como parâmetro
        // Reflect.apply(this._armadilha, this._contexto , [this]);  // executa a função da armadilha no contexto recebido
                                                                  // com array de negociações como parâmetro
    }
    
    get negociacoes() {
        return [].concat(this._negociacoes)  // programação defensiva. Devolve objeto cópia do array original
    }
    
    esvazia() {
        this._negociacoes = [];
        this._armadilha(this);
    }
}