import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { getProduct, getProductColor, getSizes, getSize } from '../services/api';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeLabels, setSizeLabels] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    getSizes()
      .then((data) => setSizes(data))
      .catch((error) => console.error(error));
    handleColorChange(1);
  }, []);

  const handleColorChange = (colorId) => {
    setSelectedSize(null)
    getProductColor(id, colorId)
      .then((data) => {
        setSelectedColor(data);
        Promise.all(data.sizes.map((sizeId) => getSize(sizeId).then((size) => size.label)))
          .then((labels) => setSizeLabels(labels))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleImageClick = (image) => {
    setIsImageOpen(true);
    setImageToDisplay(image);
  };

  const closeImage = () => {
    setIsImageOpen(false);
  };

  const addToCart = () => {
    if (selectedSize) {
      const newItem = {
        productId: product.id,
        color: selectedColor,
        size: selectedSize,
        name: product.name,
        price: selectedColor.price,
      };

      const existingItem = cart.find((item) =>
        item.productId === newItem.productId &&
        item.color.id === newItem.color.id &&
        item.size === newItem.size
      );

      if (!existingItem) {
        dispatch({ type: 'ADD_TO_CART', item: newItem });
      }
    }
  };

  return (
    <div className="product-detail-container">
      {product && (
        <div className="product-detail">
          <h2>{product.name}</h2>
          {selectedColor && (
            <div>
              {selectedColor.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          )}
          <p>{selectedColor ? selectedColor.description : ''}</p>
          <p>Цвет: {selectedColor ? selectedColor.name : 'Выберите цвет'}</p>
          <p>Цена: {selectedColor ? selectedColor.price : ''}</p>

          <div className="color-selector">
            {product.colors.map((color) => (
              <div
                key={color.id}
                className="product-button"
                onClick={() => handleColorChange(color.id)}
              >
                {color.name}
              </div>
            ))}
          </div>
          <div className="size-selector">
            <h3>Выберите размер:</h3>
            {sizes.length > 0 && (
              <div className="size-options">
                {sizes.map((size, index) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeSelect(size.id)}
                    disabled={!sizeLabels.includes(size.label)}
                    style={{ background: size.id === selectedSize ? '#54306757' : '' }}
                  >
                    {sizes[index].label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="product-button" onClick={addToCart}>
            Добавить в корзину
          </button>
          <Link to="/" className="product-button">
            Назад к списку товаров
          </Link>
        </div>
      )}
      {isImageOpen && (
        <div className="image-modal" onClick={closeImage}>
          <img className="modal-content" src={imageToDisplay} alt={product.name}/>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;