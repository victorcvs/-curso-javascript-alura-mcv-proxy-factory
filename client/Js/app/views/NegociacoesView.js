class NegociacoesView extends View {
    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${this._formataModel(model)}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${model.volumeTotal}
                </td>
            </tfoot>
        </table>
        `;
    }

    _formataModel(model) {
        return ` 
        ${model.negociacoes.map(n =>   // formata o array em uma string sem separador
            `
                <tr>
                   <td>${DateHelper.dataParaTexto(n.data)}</td>
                   <td>${n.quantidade}</td>
                   <td>${n.valor}</td>
                   <td>${n.volume}</td>
               </tr>
             `
        ).join('')}`;  // transforma o array em string
    }

}