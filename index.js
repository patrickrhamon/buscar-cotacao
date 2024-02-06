const { Worker, isMainThread, parentPort } = require('worker_threads');
const dotenv = require('dotenv');
dotenv.config();

const urlCotacao = process.env.URL_COTACAO;
const kafkaHost = process.env.KAFKA_HOST;
const kafkaTopic = process.env.KAFKA_TOPIC;

const Cotacao = require('./src/Cotacao.js');
const cotacaoAcao = new Cotacao(urlCotacao);

const KafkaProducer = require('./src/KafkaProducer.js')
const producer = new KafkaProducer(kafkaHost);

const KafkaConsumer = require('./src/KafkaConsumer.js')
const consumer = new KafkaConsumer(kafkaHost, kafkaTopic);

function publishData(dados) {
  dados.forEach((ativo) => {
    producer.sendMessage(
      kafkaTopic,
      JSON.stringify(ativo)
    )
  });
}

function loop() {
  cotacaoAcao.obterCotacao()
    .then(retorno => {
      publishData(retorno.dados)
      setTimeout(() => {
        loop()
      }, 2000)
    })
    .catch(async (error) => {
      console.log("Error: "+ error.message)
      setTimeout(() => {
        loop()
      }, 10000)
    });
}

loop()

consumer.consumeMessage()