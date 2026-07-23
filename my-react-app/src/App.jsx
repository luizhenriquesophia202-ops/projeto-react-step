import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import EscolherJogo from "./pages/EscolherJogo.jsx";
import Palpites from "./pages/Palpites.jsx";
import Partida from "./pages/Partida.jsx";
import "./App.css";

function lerArmazenamento(chave) {
  try {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : null;
  } catch {
    return null;
  }
}

function App() {
  const [jogo, setJogo] = useState(() =>
    lerArmazenamento("estrela-games-jogo")
  );

  const [palpites, setPalpites] = useState(() =>
    lerArmazenamento("estrela-games-palpites")
  );

  useEffect(() => {
    if (jogo) {
      localStorage.setItem(
        "estrela-games-jogo",
        JSON.stringify(jogo)
      );
    }
  }, [jogo]);

  useEffect(() => {
    if (palpites) {
      localStorage.setItem(
        "estrela-games-palpites",
        JSON.stringify(palpites)
      );
    }
  }, [palpites]);

  function criarJogo(novoJogo) {
    setJogo(novoJogo);
    setPalpites(null);
    localStorage.removeItem("estrela-games-palpites");
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<EscolherJogo aoCriarJogo={criarJogo} />}
      />

      <Route
        path="/palpites"
        element={
          <Palpites
            jogo={jogo}
            aoConfirmarPalpites={setPalpites}
          />
        }
      />

      <Route
        path="/partida"
        element={
          <Partida
            jogo={jogo}
            palpites={palpites}
          />
        }
      />
    </Routes>
  );
}

export default App;
