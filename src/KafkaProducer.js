const { KafkaClient, Producer } = require('kafka-node');
const { v4 }  = require('uuid');
const uuidv4 = v4;

class KafkaProducer {
  constructor(kafkaHost) {
    this.client = new KafkaClient({ kafkaHost });
    this.producer = new Producer(this.client);
  }

  sendMessage(topico, mensagem) {
    const payload = {
      key: uuidv4(),
      topic: topico,
      messages: mensagem,
    };

    this.producer.send([payload], (err, data) => {
      if (err) {
        console.error('Erro ao enviar mensagem:', err);
        return;
      }
      console.log('Mensagem enviada com sucesso:', data);
    });
  }
}

module.exports = KafkaProducer;