import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Store/Slices/ProductSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Loadings from '../../Reusable/Loadings';
import './HomeAdmin.css';
import { useNavigate } from 'react-router-dom';
import DeleteProduct from '../../APIServices/DeleteProduct';
import { useState } from 'react';
import Modals from '../../Reusable/Modals';

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const status = useSelector(state => state.products.status);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false); 
  const [deletedProductName, setDeletedProductName] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddProduct = () => {
    navigate('/AddProduct');
  }

  const handleDeleteProduct = async (id, title) => {
    setLoading(true);
    try {
      const success = await DeleteProduct(id);
      if (success) {
        setDeleteModal(true);
        setDeletedProductName(title);
        dispatch(fetchProducts());
        setLoading(false)
        console.log(success); 
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
    } 
  };

  return (
    <div className="product-grid">
      {loading === true && <Loadings variant="danger" />}
      {status === 'loading' && <Loadings variant="danger" />}
      {status === 'failed' && <div>Error loading products</div>}
      {status === 'succeeded' && (
        <div className="product-container">
          <Button variant="primary" className="add-product-button" onClick={handleAddProduct} disabled={loading}>+ Add New Product</Button>
          <div className="product-card-container">
            {products && products.length > 0 && products.map(product => (
              <Card style={{ width: '18rem' }} key={product.id} className="product-card">
                <Card.Img variant="top" style={{ width: '250px' }} src={product.images[0]} />
                <Card.Body>
                  <Card.Text className='text-left title'>{product.title}</Card.Text>
                  <Card.Text className='text-left price'>${product.price}</Card.Text>
                  <Card.Text className='text-left brand'>{product.brand}</Card.Text>
                  <div className='card-button-container'>
                  <Button variant="outline-danger" onClick={() => handleDeleteProduct(product.id, product.title)} disabled={loading}>Delete Item</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
      <Modals 
        show={deleteModal}
        onHide = {() => setDeleteModal(false)}
        title="Success!"
        message={`${deletedProductName} has been deleted.`}
      />
    </div>
  );
};

export default HomeAdmin;
