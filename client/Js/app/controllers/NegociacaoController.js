class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._inputData = $('#data');
        
        // this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model)); 

        let self = this;    // guarda referência do NegiciacaoController
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                // Se no object target existe a prop do array e ela for do tipo "function"
                if (['adciona' , 'esvazia'].includes(prop) && typeof(target[prop])  == typeof(Function)) { 
                   console.log(`Interceptando método ${prop}`);
                   return function (){    //não pode ser arrow Function, precisa do contexto dinâmico
                       // Executa os códigos extras se a função foi interceptada
                       
                       //Executa a função prop que foi interceptada 
                       Reflect.apply(target[prop], target, arguments); // executa a função original com os parâmetros (arguments)
                       self._negociacoesView.update(target); //atualiza a view (target é o model)
                    }
                } 
                 
                return Reflect.get(target, prop, receiver); // executa o que não atendeu ao IF 
            }
        }); 

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