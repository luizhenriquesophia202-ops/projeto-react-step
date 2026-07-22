
import React, { useState } from 'react';
import Filho from './Filho';
const Pai = () => {
  const [dadosDoFilho, setDadosDoFilho] = useState('');

  const receberDados = (dados) => {
    setDadosDoFilho(dados);
  };

  return (
    <div>
      <h2>Componente Pai</h2>
      <p>Dados recebidos do filho: {dadosDoFilho}</p>
      <Filho message="Olá do Pai!" sendDataToParent={receberDados} />
    </div>
  );
};

export default Pai;
          