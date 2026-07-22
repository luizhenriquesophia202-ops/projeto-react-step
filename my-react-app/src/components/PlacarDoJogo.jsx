
import React, { useState, useEffect } from 'react';

const PlacarDoJogo = () => {
  const [minutos, setMinutos] = useState(0);
const [segundos, setSegundos] = useState(0);
const [jogando, setJogando] = useState(false);
const [intervaloAtivo, setIntervaloAtivo] = useState(false);
const [golsCasa, setGolsCasa] = useState(0);
const [golsVisitante, setGolsVisitante] = useState(0);

const golCasa = () => setGolsCasa((prev) => prev + 1);
const golVisitante = () => setGolsVisitante((prev) => prev + 1);

const pausarJogo = () => {
  setJogando(false);
  setIntervaloAtivo(true);
};

const voltarJogo = () => {
  setIntervaloAtivo(false);
  setJogando(true);
};

const [acrescimos, setAcrescimos] = useState(0);

const adicionarAcrescimo = () => {
  if (minutos >= 90 && acrescimos < 5) {
    setAcrescimos((prev) => prev + 1);
    setMinutos(90);
    setJogando(true);
  }
};

useEffect(() => {
  let intervalo;
  if (jogando && minutos < 90) {
    intervalo = setInterval(() => {
      setSegundos((prev) => {
        if (prev === 59) {
          setMinutos((m) => m + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  }
  return () => clearInterval(intervalo);
}, [jogando, minutos]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '20px' }}>
      <h1>Placar do Jogo</h1>

      <h2>
        {minutos.toString().padStart(2, '0')}:
        {segundos.toString().padStart(2, '0')}
        {acrescimos > 0 && ` +${acrescimos}`}
      </h2>

      <p>
        {jogando ? 'Jogo em andamento' : intervaloAtivo ? 'Jogo pausado' : 'Jogo parado'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontSize: '2rem' }}>
        <div>
          <p>Casa</p>
          <p>{golsCasa}</p>
          <button onClick={golCasa}>Gol Casa</button>
        </div>
        <div>
          <p>Visitante</p>
          <p>{golsVisitante}</p>
          <button onClick={golVisitante}>Gol Visitante</button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {jogando ? (
          <button onClick={pausarJogo}>Pausar Jogo</button>
        ) : (
          <button onClick={voltarJogo}>Voltar Jogo</button>
        )}
        {minutos >= 90 && acrescimos < 5 && (
          <button onClick={adicionarAcrescimo}>Adicionar Acréscimo</button>
        )}
      </div>
    </div>
  );
};

export default PlacarDoJogo;
          