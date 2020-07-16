class NegociacoesService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {   
        return new Promise((resolve , reject) => {
            this._http.get('negociacoes/semana')
                .then( negociacoes => {
                        resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                    } )
                .catch (erro => {
                    console.log(erro);
                    reject('Não foi possível efetuar a importação das negociações da semana.')
                })    
        });
    }

    obterNegociacoesDaSemanaAnterior() {   // Exemplo sem devolver uma nova Promise, já que o HttpService já devolve 
        return this._http
                 .get('negociacoes/anterior')
                .then( negociacoes => {
                        return(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                    })
                .catch (erro => {
                    console.log(erro);
                    throw new Error('Não foi possível efetuar a importação das negociações da semana anterior.');
                });        
    }

    obterNegociacoesDaSemanaRetrasada() {  
        return this._http
                 .get('negociacoes/retrasada')
                .then( negociacoes => {
                        return(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                    })
                .catch (erro => {
                    console.log(erro);
                    throw new Error('Não foi possível efetuar a importação das negociações da semana retrasada.');
                });        
    }

        /* Exemplo de como seria sem usar a classe HttpService
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET','negociacoes/retrasada');

            xhr.onreadystatechange = () => {     
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {   
                        resolve(JSON.parse(xhr.responseText)        
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))) 
                    } else {
                        console.log(xhr.responseText);
                        reject(`Não foi possível efetuar a importação das negociações da semana retrasada. Erro code [${xhr.status}]`);
                    }
                };
            };
            xhr.send();   
        }); */
    

}