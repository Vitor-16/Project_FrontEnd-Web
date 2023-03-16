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
app.get('/listagemCategoria', (req, res)=>{
        /* CONFIGURAÇÃO DE REQUISIÇÃO PARA O BACK END */

        /* ROTA DO BACK END */
        const urlListarCategoria = 'http://localhost:3000/listarCategoria';
    
        /* CHAMAR AXIOS PARA A ROTA DO BACK END */
        axios.get(urlListarCategoria)
        .then((response)=>{
            let categoria = response.data;
            //console.log(response.data);
            res.render('categoria/listagemCategoria', {categoria});
        })
        .catch((error)=>{
        });
})
/* FIM DA ROTA DE LISTAGEM DE CATEGORIA */

/* INICIO DA ROTA QUE LEVA ATÉ  A EDIÇÃO DE CATEGORIA */
app.get('/editarCategoria/:cod_categoria', (req, res)=>{
    let {cod_categoria} = req.params;

    /* ROTA DO BACK END */
    urlListarCategoriaPK = `http://localhost:3000/listarCategoriaPK/${cod_categoria}`;

    /* CHAMAR AXIOS PARA A ROTA DO BACK END */
    axios.get(urlListarCategoriaPK)
    .then((response)=>{
        let categoria = response.data;
        //console.log(categoria.data);
        res.render('categoria/editarCategoria.ejs', {categoria});
    })
    .catch((error)=>{
    });
});
/* FIM DA ROTA QUE LEVA ATÉ A EDIÇÃO DE CATEGORIA */

/* INICIO DA ROTA DE EDIÇÃO DE CATEGORIA */
app.post('/editarCategoria', (req, res)=>{
    //console.log(req.body);
    let urlEditar = 'http://localhost:3000/alterarCategoria';

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.send('DADO ALTERADO');
    });
});
/* FIM DA ROTA DE EDIÇÃO DE CATEGORIA */

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});