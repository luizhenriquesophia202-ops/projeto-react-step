import { useState } from "react";
import LoginStatus from "./components/LoginStatus.jsx";
import Notification from "./components/Notification.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  function alterarLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  function alterarNotificacao() {
    setHasNotification(!hasNotification);
  }

  return (
    <main>
      <h1>Renderização Condicional</h1>

      <LoginStatus isLoggedIn={isLoggedIn} />

      <button onClick={alterarLogin}>
        {isLoggedIn ? "Sair" : "Entrar"}
      </button>

      <Notification hasNotification={hasNotification} />

      <button onClick={alterarNotificacao}>
        {hasNotification
          ? "Remover notificação"
          : "Mostrar notificação"}
      </button>
    </main>
  );
}

export default App;