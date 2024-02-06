class Mercado {
  static aberto(agora) {
    if (this.diaUtil(agora) && this.horarioFuncionamento(agora)) {
      return true;
    }

    return false;
  }

  static diaUtil(data) {
    const diaDaSemana = data.getDay();
    return diaDaSemana >= 1 && diaDaSemana <= 5;
  }

  static horarioFuncionamento(data) {
    const horaAtual = data.getHours();
    const minutosAtual = data.getMinutes();

    const horarioAbertura = 10;
    const horarioFechamento = 17;

    const antesDoHorarioAbertura = horaAtual < horarioAbertura || (horaAtual === horarioAbertura && minutosAtual < 0);
    const depoisDoHorarioFechamento = horaAtual > horarioFechamento || (horaAtual === horarioFechamento && minutosAtual > 0);

    return !antesDoHorarioAbertura && !depoisDoHorarioFechamento;
  }
}

module.exports = Mercado;
