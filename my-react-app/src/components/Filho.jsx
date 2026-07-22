import React from 'react';

const Filho = ({ message, sendDataToParent }) => {
  return (
    <div>
      <p>Mensagem do pai: {message}</p>
      <button onClick={() => sendDataToParent('Dados do Filho')}>
        Enviar dados para o pai
      </button>
    </div>
  );
};

export default Filho;
          