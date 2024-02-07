const { KafkaClient, Consumer } = require('kafka-node');
const { Ativo } = require('./models/Ativo.js');

class KafkaConsumer {
  constructor(kafkaHost, topic) {
    this.client = new KafkaClient({ kafkaHost });
    this.consumer = new Consumer(this.client, [{topic: topic}], {
      groupId: 'localhost.com',
      autoCommit: true,
      autoCommitIntervalMs: 5000,
    });
  }

  consumeMessage() {
    console.log("chamou");
    this.consumer.on('message', async (message) => {
      await this.persistData(message.value);
      // console.log('mensagem recebida:', message)
    })

    this.consumer.on('error', (err) => {
      console.log('Erro ao consumir a mensagem: ', err)
    })
  }

  async persistData(data) {
    try {
      Ativo.create({
        name: data.ativo,
        value: data.valor,
        type: data.tipo,
        date: data.data,
      });
    } catch (error) {
      console.error(`Erro ao persistir no banco: ${error.message}`);
    }
  }
}

module.exports = KafkaConsumer