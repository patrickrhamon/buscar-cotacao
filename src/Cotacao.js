const axios = require('axios');
const { format } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');

const Mercado = require('./Mercado.js');
const Ativo = require('./Ativo.js');

class Cotacao {
  constructor(url) {
    this.url = url;
  }

  async obterCotacao() {
    try {
      const agora = new Date();
      if (!Mercado.aberto(agora)) {
        throw new Error('O mercado está fechado para negociações.');
      }

      const response = await axios.get(this.url);
      const ativos = await this.pegarAtivos(response.data, agora);

      return {
        'data': format(
          utcToZonedTime(agora, 'America/Sao_Paulo'),
          'yyyy-MM-dd HH:mm:ssXXX',
          new Date(),
          { timeZone: 'America/Sao_Paulo' }
        ),
        'dados': ativos
      };
    } catch (error) {
      throw error;
    }
  }

  async pegarAtivos(resposta, data) {
    const dataFormatada = format(
      utcToZonedTime(data, 'America/Sao_Paulo'),
      'yyyy-MM-dd HH:mm:ss',
      new Date(),
      { timeZone: 'America/Sao_Paulo' }
    )
    const linhas = resposta.trim().split('\n').slice(1);
    var dados = []

    linhas.map(linha => {
      const [ativo, valor, tipo] = linha.split(',');

      if (valor === '#N/A') {
        return;
      }

      dados.push(new Ativo(ativo.trim(), valor.trim(), tipo.trim(), dataFormatada));
    });

    return dados
  }
}

module.exports = Cotacao;