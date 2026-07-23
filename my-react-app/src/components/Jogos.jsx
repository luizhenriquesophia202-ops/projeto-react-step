function Jogo({
  timeCasa,
  timeVisitante,
  horario,
  pontosCasa,
  pontosVisitante,
  selecionarJogo
}) {
  function clicarNoJogo() {
    selecionarJogo(`${timeCasa} x ${timeVisitante}`);
  }

  return (
    <div className="cartao-jogo">
      <p className="horario">{horario}</p>

      <h2>
        {timeCasa} x {timeVisitante}
      </h2>

      <div className="pontos">
        <span>
          {timeCasa}: {pontosCasa} pontos
        </span>

        <span>
          {timeVisitante}: {pontosVisitante} pontos
        </span>
      </div>

      <button onClick={clicarNoJogo}>
        Selecionar jogo
      </button>
    </div>
  );
}

export default Jogo;