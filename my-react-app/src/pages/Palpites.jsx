import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import EscudoTime from "../components/EscudoTime.jsx";
import { calcularMercados } from "../utils/calcularMercados.js";

function BotaoPalpite({
  selecionado,
  texto,
  probabilidade,
  cotacao,
  aoSelecionar,
}) {
  return (
    <button
      type="button"
      className={
        selecionado
          ? "opcao-palpite selecionada"
          : "opcao-palpite"
      }
      onClick={aoSelecionar}
    >
      <span>{texto}</span>

      <small>{probabilidade}%</small>

      <strong>{cotacao}</strong>
    </button>
  );
}

function Palpites({ jogo, aoConfirmarPalpites }) {
  const navigate = useNavigate();

  const [selecoes, setSelecoes] = useState({});
  const [mensagem, setMensagem] = useState("");

  const mercados = useMemo(() => {
    if (!jogo) {
      return null;
    }

    return calcularMercados(jogo.mandante, jogo.visitante);
  }, [jogo]);

  if (!jogo || !mercados) {
    return (
      <main className="pagina">
        <section className="estado-vazio">
          <h1>Nenhum confronto selecionado</h1>
          <Link to="/" className="botao-secundario">
            Escolher os times
          </Link>
        </section>
      </main>
    );
  }

  function selecionar(mercado, id, texto, cotacao) {
    setSelecoes((anteriores) => ({
      ...anteriores,
      [mercado]: {
        id,
        texto,
        cotacao,
      },
    }));

    setMensagem("");
  }

  function confirmar() {
    if (!selecoes.resultado) {
      setMensagem("Escolha pelo menos o resultado da partida.");
      return;
    }

    aoConfirmarPalpites(selecoes);
    navigate("/partida");
  }

  return (
    <main className="pagina">
      <Link to="/" className="link-voltar">
        ← Escolher outros times
      </Link>

      <section className="cabecalho-jogo">
        <div className="time-partida">
          <EscudoTime time={jogo.mandante} tamanho="grande" />
          <strong>{jogo.mandante.nome}</strong>
        </div>

        <div className="centro-confronto">
          <span>Dados cruzados</span>
          <strong>X</strong>
          <small>Cotações fictícias</small>
        </div>

        <div className="time-partida">
          <EscudoTime time={jogo.visitante} tamanho="grande" />
          <strong>{jogo.visitante.nome}</strong>
        </div>
      </section>

      <section className="resumo-dados">
        <article className="cartao-metrica">
          <span>Força do mandante</span>
          <strong>{mercados.forcaMandante}</strong>
          <small>{jogo.mandante.nome}</small>
        </article>

        <article className="cartao-metrica">
          <span>Gols esperados</span>
          <strong>{mercados.golsEsperados}</strong>
          <small>Estimativa simulada</small>
        </article>

        <article className="cartao-metrica">
          <span>Força do visitante</span>
          <strong>{mercados.forcaVisitante}</strong>
          <small>{jogo.visitante.nome}</small>
        </article>
      </section>

      <div className="layout-palpites">
        <section className="lista-mercados">
          <article className="mercado">
            <h2>Resultado da partida</h2>

            <div className="grade-opcoes tres">
              <BotaoPalpite
                selecionado={selecoes.resultado?.id === "mandante"}
                texto={jogo.mandante.nome}
                probabilidade={
                  mercados.resultado.mandante.probabilidade
                }
                cotacao={mercados.resultado.mandante.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "resultado",
                    "mandante",
                    jogo.mandante.nome,
                    mercados.resultado.mandante.cotacao
                  )
                }
              />

              <BotaoPalpite
                selecionado={selecoes.resultado?.id === "empate"}
                texto="Empate"
                probabilidade={mercados.resultado.empate.probabilidade}
                cotacao={mercados.resultado.empate.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "resultado",
                    "empate",
                    "Empate",
                    mercados.resultado.empate.cotacao
                  )
                }
              />

              <BotaoPalpite
                selecionado={selecoes.resultado?.id === "visitante"}
                texto={jogo.visitante.nome}
                probabilidade={
                  mercados.resultado.visitante.probabilidade
                }
                cotacao={mercados.resultado.visitante.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "resultado",
                    "visitante",
                    jogo.visitante.nome,
                    mercados.resultado.visitante.cotacao
                  )
                }
              />
            </div>
          </article>

          <article className="mercado">
            <h2>Ambos os times marcam?</h2>

            <div className="grade-opcoes">
              <BotaoPalpite
                selecionado={selecoes.ambosMarcam?.id === "sim"}
                texto="Sim"
                probabilidade={mercados.ambosMarcam.sim.probabilidade}
                cotacao={mercados.ambosMarcam.sim.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "ambosMarcam",
                    "sim",
                    "Ambos marcam: sim",
                    mercados.ambosMarcam.sim.cotacao
                  )
                }
              />

              <BotaoPalpite
                selecionado={selecoes.ambosMarcam?.id === "nao"}
                texto="Não"
                probabilidade={mercados.ambosMarcam.nao.probabilidade}
                cotacao={mercados.ambosMarcam.nao.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "ambosMarcam",
                    "nao",
                    "Ambos marcam: não",
                    mercados.ambosMarcam.nao.cotacao
                  )
                }
              />
            </div>
          </article>

          <article className="mercado">
            <h2>Total de gols</h2>

            <div className="grade-opcoes">
              <BotaoPalpite
                selecionado={selecoes.totalGols?.id === "mais25"}
                texto="Mais de 2,5 gols"
                probabilidade={mercados.totalGols.mais25.probabilidade}
                cotacao={mercados.totalGols.mais25.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "totalGols",
                    "mais25",
                    "Mais de 2,5 gols",
                    mercados.totalGols.mais25.cotacao
                  )
                }
              />

              <BotaoPalpite
                selecionado={selecoes.totalGols?.id === "menos25"}
                texto="Menos de 2,5 gols"
                probabilidade={mercados.totalGols.menos25.probabilidade}
                cotacao={mercados.totalGols.menos25.cotacao}
                aoSelecionar={() =>
                  selecionar(
                    "totalGols",
                    "menos25",
                    "Menos de 2,5 gols",
                    mercados.totalGols.menos25.cotacao
                  )
                }
              />
            </div>
          </article>
        </section>

        <aside className="bilhete">
          <h2>Meu bilhete</h2>

          {Object.keys(selecoes).length === 0 ? (
            <p>Nenhum palpite selecionado.</p>
          ) : (
            <div className="itens-bilhete">
              {Object.entries(selecoes).map(([mercado, selecao]) => (
                <article key={mercado} className="item-bilhete">
                  <small>{mercado}</small>
                  <span>{selecao.texto}</span>
                  <strong>Cotação {selecao.cotacao}</strong>
                </article>
              ))}
            </div>
          )}

          {mensagem && (
            <p className="mensagem-erro" role="alert">
              {mensagem}
            </p>
          )}

          <button
            type="button"
            className="botao-principal"
            onClick={confirmar}
          >
            Confirmar e abrir partida
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Palpites;
