
import React from 'react';

const ListaFiltrada = () => {
  const produtos = [
    { id: 1, nome: 'Notebook', preco: 4500, categoria: 'Eletrônicos' },
    { id: 2, nome: 'Smartphone', preco: 2500, categoria: 'Eletrônicos' },
    { id: 3, nome: 'Monitor', preco: 1200, categoria: 'Eletrônicos' },
    { id: 4, nome: 'Teclado', preco: 200, categoria: 'Eletrônicos' },
    { id: 5, nome: 'Mousepad', preco: 50, categoria: 'Acessórios' },
    { id: 6, nome: 'Cadeira Gamer', preco: 1800, categoria: 'Móveis' },
  ];

  const produtosCaros = produtos.filter(
    (produto) => produto.preco > 1000
  );

  return (
    <div>
      <h1>Produtos com preço acima de R$ 1000</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {produtosCaros.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaFiltrada;
                