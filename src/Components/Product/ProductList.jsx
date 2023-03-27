import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Store/Slices/ProductSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Loadings from '../../Reusable/Loadings';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from '../../APIServices/DeleteProduct';
import { useState } from 'react';
import Modals from '../../Reusable/Modals';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const status = useSelector(state => state.products.status);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); 
  const [productName, setProductName] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddProduct = () => {
    navigate('/AddProduct');
  }

  const handleAddToCart = () => {

  }

  return (
    <div className="product-grid">
      {status === 'loading' && <Loadings variant="danger" />}
      {status === 'failed' && <div>Error loading products</div>}
      {status === 'succeeded' && (
        <div className="product-container">
          <div className="product-card-container">
            {products && products.length > 0 && products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-link" style={{textDecoration: 'none', color: 'black'}}>
              <Card style={{ width: '18rem' }} key={product.id} className="product-card">
                <Card.Img variant="top" style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={product.images[0]} />
                <Card.Body>
                  <Card.Text className='text-left title'>{product.title}</Card.Text>
                  <Card.Text className='text-left price'>${product.price}</Card.Text>
                  <Card.Text className='text-left brand'>{product.brand}</Card.Text>
                  <div className='card-button-container'>
                    <Button variant="outline-secondary" onClick={() => handleAddToCart(product.id, product.title)} disabled={loading}>Add to cart</Button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
            ))}
          </div>
        </div>
      )}
      <Modals 
        show={showModal}
        onHide = {() => setShowModal(false)}
        title="Success!"
        message={`${productName} has been added to cart.`}
      />
    </div>
  );
};

export default ProductList;
