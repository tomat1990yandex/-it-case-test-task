import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1 className="product-title">Список товаров</h1>
      <div className="product-list">
        {products.map((product, index) => (
          <Link to={`/product/${product.id}`} key={product.id} className="card">
            <img
              src={`${process.env.PUBLIC_URL}${product.images ? product.images[index] : product.colors[0].images[0]}`}
              alt={product.name}/>
            <div className="card-content">
              <h2>{product.name}</h2>
              <button className="card-link">
                Подробнее
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
