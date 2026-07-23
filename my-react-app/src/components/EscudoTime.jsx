import { useState } from "react";

function EscudoTime({ time, tamanho = "medio" }) {
  const [imagemComErro, setImagemComErro] = useState(false);

  if (!time) {
    return <div className={`escudo-fallback ${tamanho}`}>?</div>;
  }

  if (imagemComErro) {
    return (
      <div
        className={`escudo-fallback ${tamanho}`}
        style={{
          backgroundColor: time.corPrimaria,
          color: time.corSecundaria,
        }}
        title={time.nome}
      >
        {time.sigla}
      </div>
    );
  }

  return (
    <img
      className={`escudo-time ${tamanho}`}
      src={time.escudo}
      alt={`Símbolo temporário do ${time.nome}`}
      onError={() => setImagemComErro(true)}
    />
  );
}

export default EscudoTime;
