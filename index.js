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

/* INICIO DA ROTA DE CADASTRO DE CATEGORIA */
app.get('/categoria', (req, res)=>{
    res.render('categoria/index');
});
/* FIM DA ROTA DE CADASTRO DE CATEGORIA */

/* INICIO DA ROTA DE LISTAGEM DE CATEGORIA */
app.get('/listagemCategorias', (req, res)=>{
        /* CONFIGURAÇÃO DE REQUISIÇÃO PARA O BACK END */

        /* ROTA DO BACK END */
        const urlListarCategoria = 'http://localhost:3000/listarCategoria';
    
        /* CHAMAR AXIOS PARA A ROTA DO BACK END */
        axios.get(urlListarCategoria)
        .then((respnse)=>{
            console.log(respnse.data);
            let categoria = respnse.data;
            res.render('categoria/listagemCategoria', {categoria});
        })
        .catch((error)=>{
        });
})
/* FIM DA ROTA DE LISTAGEM DE CATEGORIA */

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});