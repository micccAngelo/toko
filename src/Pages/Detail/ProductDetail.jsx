import './ProductDetail.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Loadings from '../../Reusable/Loadings'
import Card from 'react-bootstrap/Card';
import Modals from '../../Reusable/Modals'
import Carousel from 'react-bootstrap/Carousel';
import GetSingleProduct from '../../APIServices/GetSingpleProduct';
import { Badge, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/Slices/CartSlice';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
    const [loading, setLoading] = useState();
    const [product, setProduct] = useState();
    const [showModal, setShowModal] = useState();
    const [productName, setProductName] = useState();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
              const productData = await GetSingleProduct(id);
              console.log(id)
              setProduct(productData);
              console.log(productData)
              setLoading(false);
            } catch (error) {
              console.log(error)
              setLoading(false)
            }
        }
        fetchProducts();
    }, [id]);

    if (loading) { 
        return (
          <Loadings variant="danger" />
        );
    }

    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      setShowModal(true);
      setProductName(product.title);
      console.log('Cart Items:', cartItems);
    }

    return (
      <div className='card-container-detail'>
        {product ? (
          <Card className='card-detail' style={{ display: 'flex', flexDirection: 'row' }}>
            <Carousel slide={false} interval={3000} className='images'>
              <Carousel.Item>
                <Card.Img className='card-img' variant='left' src={product.images[0]} style={{ objectFit: 'cover', height: '100%' }}/>
              </Carousel.Item>
              <Carousel.Item>
                <Card.Img className='card-img' variant='left' src={product.images[1]} style={{ objectFit: 'cover', height: '100%' }}/>
              </Carousel.Item>
              <Carousel.Item>
                <Card.Img className='card-img' variant='left' src={product.images[2]} style={{ objectFit: 'cover', height: '100%' }}/>
              </Carousel.Item>
            </Carousel>
            <Card.Body className='detail-texts'>
              <Card.Title><h1>{product.title}</h1></Card.Title>
              <Card.Text>
                <p>${product.price} <br /></p>
                <p>Stock: {product.stock} <br /></p>
                <p>Tags<br /></p>
                <Badge bg="secondary">
                  {product.category}
                </Badge>
                <h4><br />Product Description<br /></h4>
                <p>{product.description} <br /></p>
              </Card.Text>
              <div className='card-add-button-container' style={{ marginLeft: '30px' }}>
                  <Button className='button-add' style={{ fontSize: '20px', padding: '10px 20px' }} variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1>There is no product with that ID</h1>
          </div>
        )}
        <Modals 
        show={showModal}
        onHide = {() => setShowModal(false)}
        title="Success!"
        message={`${productName} has been added to cart.`}
      />
      </div>
    )
}

export default ProductDetail