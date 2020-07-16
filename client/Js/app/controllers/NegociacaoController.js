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

    importaNegociacoes() {

        let service = new NegociacoesService();

        Promise.all([service.obterNegociacoesDaSemana(),    // Encadeia as execuções
                     service.obterNegociacoesDaSemanaAnterior(),
                     service.obterNegociacoesDaSemanaRetrasada()])
                .then( negociacoes => {   //devolve um array de lista de negociacoes, precisa reduzir pra um array único
                      negociacoes
                         .reduce((arrayAchatado, array) => arrayAchatado.concat(array), []) // transforma em um único array  
                         .forEach(negociacao => this._listaNegociacoes.adciona(negociacao));
                      this._mensagem.texto = 'Negociações importadas com sucesso';   
                    }                  
                )   
                .catch(erro => this._mensagem.texto = erro);

        /* //promises
        service.obterNegociacoesDaSemana()
            .then(negociacoes => {
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adciona(negociacao));   
                    this._mensagem.texto = 'Negociações da semana importadas com sucesso';
                })
            .catch(erro => this._mensagem.texto = erro);

        service.obterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adciona(negociacao));   
                    this._mensagem.texto = 'Negociações da semana anterior importadas com sucesso';
                })
            .catch(erro => this._mensagem.texto = erro);
            
        service.obterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adciona(negociacao));  
                    this._mensagem.texto = 'Negociações da semana retrasada importadas com sucesso';
                })
            .catch(erro => this._mensagem.texto = erro);  */  
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