class NegociacoesService {

    obterNegociacoesDaSemana(cb) {   // recebe uma função call back
        let xhr = new XMLHttpRequest();

        xhr.open('GET','negociacoes/semana');

        /*Configurações */
        xhr.onreadystatechange = () => {     // Executa a função toda vez que a requisição muda de estado
        /*  Estados possíveis da requisição
            0: requisição ainda não iniciada
            1: conexão com o servidor estabelecida
            2: requisição recebida
            3: processando requisição
            4: requisição está concluída e a resposta está pronta  */
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {   // resposta com sucesso
                    // Devolve na função 'cb' erro null no primeiro parâmetro e a reposta como segundo parâmetro
                    cb(null, JSON.parse(xhr.responseText)        // Pega a resposta em JSON e transforma em objetos 
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))) // Transforma o array de objects em de negociacao


                } else {
                    console.log(xhr.responseText);
                    cb(`Não foi possível efetuar a importação. Erro code [${xhr.status}]`, null);
                }
            };
        };
        xhr.send();   // envia a requisição
    }

}