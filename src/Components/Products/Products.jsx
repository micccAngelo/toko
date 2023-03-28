import './Products.css';
import React from 'react'
import { useState, useEffect } from 'react';
import GetAllProduct from '../../APIServices/GetAllProduct';
import Loadings from '../../Reusable/Loadings';
import Modals from '../../Reusable/Modals';
import { Card, Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { addToCart } from '../../Store/Slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../APIServices/Search';
import Category from '../Category/Category';
import GetProductbyCategory from '../../APIServices/GetProductbyCategory';

export const Products = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState();
    const [notFound, setNotFound] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search] = useSearchParams()

    console.log(selectedCategory)

    useEffect(() => {
        if (search.toString()) {
            fetchProductbySearch(search.toString().trim())
        } else{
            fetchProducts()
        }
    }, [search])

    useEffect(() => {
      setLoading(true)
        if (selectedCategory !== '') {
            fetchProductbyCategory(selectedCategory)
            setLoading(false)
        } 
    }, [selectedCategory])

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await GetAllProduct();
            setProducts(data);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const fetchProductbySearch = async (query) => {
        setLoading(true);
        try {
          const data = await Search(query);
          if (data.length === 0) {
            setNotFound(true);
          } else {
            setNotFound(false); 
          }
          setProducts(data);
          setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
      }

      const fetchProductbyCategory = async (selectedCategory) => {
        setLoading(true);
        try {
          const data = await GetProductbyCategory(selectedCategory);
          console.log(selectedCategory)
          setProducts(data);
          console.log(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        } 
      };

    const handleCategorySelect = (selectedCategory) => 
    {
      console.log(selectedCategory)
        setSelectedCategory(selectedCategory);
      }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setShowModal(true);
        setProductName(product.title);
        console.log('Cart Items:', cartItems);
      }

    if(loading) {
        return(
            <Loadings variant="danger" />
        );
    }

    if(notFound) {
        return(
            <h1 className='error-message'>Product Does Not Exist</h1>
        );
    }

    return (
        <div className="product-grid">        
          <Category handleCategorySelect={handleCategorySelect} />
          <h3 className='category-title'>Selected Category: {selectedCategory}</h3>
        <div className="product-container">
          <div className="product-card-container">
            {products && products.length > 0 && products.map(product => (
              <Card style={{ width: '18rem', height: '450px' }} key={product.id} className="product-card-user">
                <Link to={`/User/Product/${product.id}`} style={{textDecoration: 'none', color: 'black'}}>
                  <Card.Img variant="top" style={{ width: '100%', height: '200px', objectFit: 'cover' }} src={product.images[0]} />
                  <Card.Body>
                    <Card.Text className='text-left title'>{product.title}</Card.Text>
                    <Card.Text className='text-left price'>${product.price}</Card.Text>
                    <Card.Text className='text-left brand'>{product.brand}</Card.Text>
                  </Card.Body>
                </Link>
                <div className='card-button-container'>
                  <Button variant="outline-secondary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      <Modals 
        show={showModal}
        onHide = {() => setShowModal(false)}
        title="Success!"
        message={`${productName} has been added to cart.`}
      />
    </div>
  );
};

export default Products