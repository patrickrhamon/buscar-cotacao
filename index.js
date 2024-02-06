const dotenv = require('dotenv');
dotenv.config();

// const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNWbuHTWQUP_sfl6usaOpGP5TZcfNKMwOgus0zGQk6S8twfLUeLuW6jFLjBL_mHrGuYrLHCW9fmt7e/pub?gid=0&single=true&output=csv";

// async function obterCotacaoAcao(url) {
//   try {
//     const response = await axios.get(url);
    
//     console.log(response.data);

//     return { /* Dados extraídos */ };
//   } catch (error) {
//     console.error('Erro ao obter cotação da ação:', error.message);
//     throw error;
//   }
// }

const urlCotacao = process.env.URL_COTACAO;
const Cotacao = require('./src/Cotacao.js');

const cotacaoAcao = new Cotacao(urlCotacao);

setInterval(() => {
  cotacaoAcao.obterCotacao()
    .then(dados => {
      console.log(dados)
    })
    .catch(error => {
      console.log("Error: "+ error.message)
    });
}, 2000)