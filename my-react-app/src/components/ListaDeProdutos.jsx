
import React from 'react';

const ListaDeProdutos = () => {
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 4500 },
    { id: 2, nome: 'Smartphone', preco: 2500 },
    { id: 3, nome: 'Monitor', preco: 1200 },
    { id: 4, nome: 'Teclado', preco: 200 },
  ];

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaDeProdutos;
          