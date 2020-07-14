class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._inputData = $('#data');

        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model)); 
        //com arrow function o contexto é léxico (do momento da criação). O this é o NegociacaoController

        // No function, o contexto é dinâmico, o this é o objeto que está executando
        // Exemplo como função. Tem que passar o contexto como parâmetro
        // this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
        //    this._negociacoesView.update(model);});

        this._negociacoesView = new NegociacoesView($('#negociacaoView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView( $('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }
    
    adciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação incluída com sucesso.'
        this._mensagemView.update(this._mensagem);
        
        this._limpaformulario();   
    }
    
    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso.'
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao () {
        return new Negociacao (
            DateHelper.textoParaData(this._inputData.value),   
            this._inputQuantidade.value, 
            this._inputValor.value);
    }

    _limpaformulario () {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}