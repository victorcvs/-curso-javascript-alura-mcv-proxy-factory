class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._inputData = $('#data');
        
        // Cria um proxy (bind) entre o model e a view através de uma classe auxiliadora 
        this._listaNegociacoes = new Bind( new ListaNegociacoes(),                      // model
                                           new NegociacoesView($('#negociacaoView')),   // view
                                           'adciona','esvazia');                        // props

        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView( $('#mensagemView')), 
                                 'texto');
    }
    
    adciona(event) {
        event.preventDefault();
        
        this._listaNegociacoes.adciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação incluída com sucesso.'
        
        this._limpaformulario();   
    }
    
    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso.'
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