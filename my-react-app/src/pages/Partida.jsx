import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import EscudoTime from "../components/EscudoTime.jsx";

function verificarAcerto(mercado, selecao, placar) {
  const total = placar.mandante + placar.visitante;

  if (mercado === "resultado") {
    const resultado =
      placar.mandante > placar.visitante
        ? "mandante"
        : placar.mandante < placar.visitante
          ? "visitante"
          : "empate";

    return selecao.id === resultado;
  }

  if (mercado === "ambosMarcam") {
    const ambosMarcaram =
      placar.mandante > 0 && placar.visitante > 0;

    return selecao.id === (ambosMarcaram ? "sim" : "nao");
  }

  if (mercado === "totalGols") {
    return selecao.id === (total >= 3 ? "mais25" : "menos25");
  }

  return false;
}

function Partida({ jogo, palpites }) {
  const [minuto, setMinuto] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const [placar, setPlacar] = useState({
    mandante: 0,
    visitante: 0,
  });

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    if (!rodando || finalizado) {
      return undefined;
    }

    const intervalo = window.setInterval(() => {
      setMinuto((minutoAtual) => {
        if (minutoAtual >= 89) {
          setRodando(false);
          setFinalizado(true);
          return 90;
        }

        return minutoAtual + 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [rodando, finalizado]);

  const avaliacaoPalpites = useMemo(() => {
    if (!finalizado || !palpites) {
      return [];
    }

    return Object.entries(palpites).map(([mercado, selecao]) => ({
      mercado,
      texto: selecao.texto,
      acertou: verificarAcerto(mercado, selecao, placar),
    }));
  }, [finalizado, palpites, placar]);

  if (!jogo) {
    return (
      <main className="pagina">
        <section className="estado-vazio">
          <h1>Nenhuma partida criada</h1>
          <Link to="/" className="botao-secundario">
            Criar confronto
          </Link>
        </section>
      </main>
    );
  }

  function iniciarOuContinuar() {
    if (finalizado) {
      return;
    }

    setIniciado(true);
    setRodando(true);
  }

  function pausar() {
    setRodando(false);
  }

  function finalizar() {
    if (!iniciado) {
      return;
    }

    setRodando(false);
    setFinalizado(true);
  }

  function reiniciar() {
    setMinuto(0);
    setRodando(false);
    setIniciado(false);
    setFinalizado(false);
    setPlacar({
      mandante: 0,
      visitante: 0,
    });
    setEventos([]);
  }

  function marcarGol(lado) {
    if (!iniciado || finalizado) {
      return;
    }

    const time =
      lado === "mandante" ? jogo.mandante : jogo.visitante;

    setPlacar((placarAtual) => ({
      ...placarAtual,
      [lado]: placarAtual[lado] + 1,
    }));

    setEventos((eventosAtuais) => [
      {
        id: `${Date.now()}-${lado}`,
        minuto,
        time: time.nome,
      },
      ...eventosAtuais,
    ]);
  }

  const tempoExibido = `${String(minuto).padStart(2, "0")}:00`;

  return (
    <main className="pagina">
      <Link to="/palpites" className="link-voltar">
        ← Voltar aos palpites
      </Link>

      <section className="placar-partida">
        <span
          className={
            finalizado
              ? "status-jogo finalizado"
              : rodando
                ? "status-jogo ao-vivo"
                : "status-jogo"
          }
        >
          {finalizado
            ? "Jogo finalizado"
            : rodando
              ? "Ao vivo"
              : iniciado
                ? "Jogo pausado"
                : "Aguardando início"}
        </span>

        <div className="placar-times">
          <div className="time-placar">
            <EscudoTime time={jogo.mandante} tamanho="grande" />
            <strong>{jogo.mandante.nome}</strong>
            <span>{placar.mandante}</span>
          </div>

          <div className="cronometro">
            <strong>{tempoExibido}</strong>
            <small>1 segundo real = 1 minuto simulado</small>
          </div>

          <div className="time-placar">
            <EscudoTime time={jogo.visitante} tamanho="grande" />
            <strong>{jogo.visitante.nome}</strong>
            <span>{placar.visitante}</span>
          </div>
        </div>
      </section>

      <section className="controles-jogo">
        <div className="grupo-controles">
          <h2>Controle do cronômetro</h2>

          <div className="botoes-controle">
            <button
              type="button"
              className="botao-principal"
              onClick={iniciarOuContinuar}
              disabled={rodando || finalizado}
            >
              {iniciado ? "Continuar jogo" : "Iniciar jogo"}
            </button>

            <button
              type="button"
              className="botao-secundario"
              onClick={pausar}
              disabled={!rodando}
            >
              Pausar
            </button>

            <button
              type="button"
              className="botao-perigo"
              onClick={finalizar}
              disabled={!iniciado || finalizado}
            >
              Finalizar
            </button>

            <button
              type="button"
              className="botao-neutro"
              onClick={reiniciar}
            >
              Reiniciar
            </button>
          </div>
        </div>

        <div className="grupo-controles">
          <h2>Marcação de gols</h2>

          <div className="botoes-gol">
            <button
              type="button"
              onClick={() => marcarGol("mandante")}
              disabled={!iniciado || finalizado}
            >
              ⚽ Gol do {jogo.mandante.nome}
            </button>

            <button
              type="button"
              onClick={() => marcarGol("visitante")}
              disabled={!iniciado || finalizado}
            >
              ⚽ Gol do {jogo.visitante.nome}
            </button>
          </div>
        </div>
      </section>

      <div className="layout-pos-jogo">
        <section className="eventos-jogo">
          <h2>Lances da partida</h2>

          {eventos.length === 0 ? (
            <p>Nenhum gol marcado.</p>
          ) : (
            <div className="lista-eventos">
              {eventos.map((evento) => (
                <article key={evento.id}>
                  <strong>{evento.minuto}'</strong>
                  <span>⚽ Gol — {evento.time}</span>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="resultado-palpites">
          <h2>Resultado dos palpites</h2>

          {!finalizado ? (
            <p>
              Finalize a partida para conferir os palpites.
            </p>
          ) : avaliacaoPalpites.length === 0 ? (
            <p>Nenhum palpite registrado.</p>
          ) : (
            <div className="lista-avaliacao">
              {avaliacaoPalpites.map((item) => (
                <article
                  key={item.mercado}
                  className={item.acertou ? "acertou" : "errou"}
                >
                  <span>{item.texto}</span>
                  <strong>{item.acertou ? "Acertou" : "Errou"}</strong>
                </article>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

export default Partida;
