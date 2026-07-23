import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import EscudoTime from "../components/EscudoTime.jsx";
import times from "../data/times.js";

function EscolherJogo({ aoCriarJogo }) {
  const navigate = useNavigate();

  const [mandanteId, setMandanteId] = useState("");
  const [visitanteId, setVisitanteId] = useState("");
  const [mensagem, setMensagem] = useState("");

  const mandante = useMemo(
    () => times.find((time) => time.id === mandanteId),
    [mandanteId]
  );

  const visitante = useMemo(
    () => times.find((time) => time.id === visitanteId),
    [visitanteId]
  );

  function criarConfronto() {
    if (!mandante || !visitante) {
      setMensagem("Selecione os dois times.");
      return;
    }

    if (mandante.id === visitante.id) {
      setMensagem("Escolha dois times diferentes.");
      return;
    }

    aoCriarJogo({
      mandante,
      visitante,
      criadoEm: new Date().toISOString(),
    });

    setMensagem("");
    navigate("/palpites");
  }

  return (
    <main className="pagina">
      <header className="cabecalho-principal">
        <span className="etiqueta">Simulador educativo</span>
        <h1>⭐ Estrela Games</h1>
        <p>
          Escolha os times, compare os dados fictícios, faça seus
          palpites e controle uma partida simulada.
        </p>
      </header>

      <section className="painel-selecao">
        <h2>Criar novo confronto</h2>

        <div className="seletores-times">
          <label>
            Time mandante
            <select
              value={mandanteId}
              onChange={(evento) => setMandanteId(evento.target.value)}
            >
              <option value="">Selecione o mandante</option>

              {times.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.nome}
                </option>
              ))}
            </select>
          </label>

          <span className="versus">X</span>

          <label>
            Time visitante
            <select
              value={visitanteId}
              onChange={(evento) => setVisitanteId(evento.target.value)}
            >
              <option value="">Selecione o visitante</option>

              {times.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.nome}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="previa-confronto">
          <div className="time-escolhido">
            <EscudoTime time={mandante} tamanho="grande" />
            <strong>{mandante?.nome || "Mandante"}</strong>
          </div>

          <span className="versus grande">X</span>

          <div className="time-escolhido">
            <EscudoTime time={visitante} tamanho="grande" />
            <strong>{visitante?.nome || "Visitante"}</strong>
          </div>
        </div>

        {mensagem && (
          <p className="mensagem-erro" role="alert">
            {mensagem}
          </p>
        )}

        <button
          type="button"
          className="botao-principal"
          onClick={criarConfronto}
        >
          Cruzar dados e criar jogo
        </button>
      </section>

      <section className="secao-times">
        <div className="titulo-secao">
          <div>
            <span className="etiqueta">Série A 2026</span>
            <h2>20 times disponíveis</h2>
          </div>

          <p>Os símbolos abaixo são temporários e podem ser substituídos.</p>
        </div>

        <div className="grade-times">
          {times.map((time) => (
            <article className="cartao-time" key={time.id}>
              <EscudoTime time={time} tamanho="medio" />

              <div>
                <strong>{time.nome}</strong>
                <span>{time.uf}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default EscolherJogo;
