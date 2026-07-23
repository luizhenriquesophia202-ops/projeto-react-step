function limitar(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

function arredondar(valor) {
  return Number(valor.toFixed(1));
}

function cotacao(probabilidade) {
  const valor = 100 / probabilidade;
  return Math.max(1.2, valor).toFixed(2);
}

function normalizarTres(valorA, valorB, valorC) {
  const total = valorA + valorB + valorC;

  return {
    a: arredondar((valorA / total) * 100),
    b: arredondar((valorB / total) * 100),
    c: arredondar((valorC / total) * 100),
  };
}

export function calcularMercados(mandante, visitante) {
  const forcaMandante =
    mandante.ataque * 0.45 +
    mandante.defesa * 0.25 +
    mandante.forma * 0.3 +
    5;

  const forcaVisitante =
    visitante.ataque * 0.45 +
    visitante.defesa * 0.25 +
    visitante.forma * 0.3;

  const diferenca = forcaMandante - forcaVisitante;

  const brutoMandante = limitar(42 + diferenca * 0.85, 18, 70);
  const brutoEmpate = limitar(31 - Math.abs(diferenca) * 0.35, 17, 32);
  const brutoVisitante = limitar(37 - diferenca * 0.85, 15, 65);

  const resultado = normalizarTres(
    brutoMandante,
    brutoEmpate,
    brutoVisitante
  );

  const golsEsperados = limitar(
    2.25 +
      (mandante.ataque + visitante.ataque - 150) * 0.018 -
      (mandante.defesa + visitante.defesa - 150) * 0.008,
    1.45,
    4.1
  );

  const probabilidadeAmbos = arredondar(
    limitar(35 + golsEsperados * 9, 38, 72)
  );

  const probabilidadeMais25 = arredondar(
    limitar(30 + golsEsperados * 12, 36, 78)
  );

  return {
    forcaMandante: arredondar(forcaMandante),
    forcaVisitante: arredondar(forcaVisitante),
    golsEsperados: arredondar(golsEsperados),
    resultado: {
      mandante: {
        probabilidade: resultado.a,
        cotacao: cotacao(resultado.a),
      },
      empate: {
        probabilidade: resultado.b,
        cotacao: cotacao(resultado.b),
      },
      visitante: {
        probabilidade: resultado.c,
        cotacao: cotacao(resultado.c),
      },
    },
    ambosMarcam: {
      sim: {
        probabilidade: probabilidadeAmbos,
        cotacao: cotacao(probabilidadeAmbos),
      },
      nao: {
        probabilidade: arredondar(100 - probabilidadeAmbos),
        cotacao: cotacao(100 - probabilidadeAmbos),
      },
    },
    totalGols: {
      mais25: {
        probabilidade: probabilidadeMais25,
        cotacao: cotacao(probabilidadeMais25),
      },
      menos25: {
        probabilidade: arredondar(100 - probabilidadeMais25),
        cotacao: cotacao(100 - probabilidadeMais25),
      },
    },
  };
}
