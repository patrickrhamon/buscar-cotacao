const { KafkaClient, Consumer } = require('kafka-node');

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
    this.consumer.on('message', (message) => {
      console.log('mensagem recebida:', message)
    })

    this.consumer.on('error', (err) => {
      console.log('Erro ao consumir a mensagem: ', err)
    })
  }
}

module.exports = KafkaConsumer