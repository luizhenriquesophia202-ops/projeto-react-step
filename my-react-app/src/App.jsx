import { useState } from "react";
import LoginStatus from "./components/LoginStatus.jsx";
import Notification from "./components/Notification.jsx";
import ButtonTailwind from "./components/aula7/ButtonTailwind.jsx";

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
      <h1>Botão com Tailwind CSS</h1>
      <ButtonTailwind label="Primário" primary />
      <ButtonTailwind label="Secundário" />
    </main>
  );
}

export default App;