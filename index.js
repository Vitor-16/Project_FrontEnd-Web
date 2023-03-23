const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* INICIO DAS CONFIGURAÇÕES DO EJS:  */
app.use(express.static('public'));
app.set('view engine', 'ejs');
/* FIM DAS CONFIGURAÇÕES DO EJS:  */

/* INICIO DA ROTA DE ACESSO AS PÁGINAS EJS*/
app.get('/', (req, res)=>{
    res.render('index');
});
/* FIM DA ROTA DE ACESSO AS PÁGINAS EJS*/

/* INICIO DA ROTA DE CADASTRO DE CLIENTES */
app.get('/cliente', (req, res)=>{
    res.render('cliente/index');
});
/* FIM DA ROTA DE CADASTRO DE CLIENTES */

/* INICIO DA ROTA DE LISTAGEM DE CLIENTES */
app.get('/listagemClientes', (req, res)=>{
        /* CONFIGURAÇÃO DE REQUISIÇÃO PARA O BACK END */

        /* ROTA DO BACK END */
        const urlListarCliente = 'http://localhost:3000/ListarCliente';
    
        /* CHAMAR AXIOS PARA A ROTA DO BACK END */
        axios.get(urlListarCliente)
        .then((response)=>{
            let cliente = response.data;
            res.render('cliente/listagemClientes', {cliente});
        })
        .catch((error)=>{
        });
})
/* FIM DA ROTA DE LISTAGEM DE CLIENTES */

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});