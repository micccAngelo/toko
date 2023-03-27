import './ProductDetail.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Loadings from '../../Reusable/Loadings'
import Card from 'react-bootstrap/Card';
import Modals from '../../Reusable/Modals'
import Carousel from 'react-bootstrap/Carousel';
import GetProductbyCategory from '../../APIServices/GetProductbyCategory'

const ProductDetail = () => {
    const [loading, setLoading] = useState();
    const [product, setProduct] = useState();
    const [showModal, setShowModal] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
              const productData = await GetProductbyCategory(id);
              console.log(id)
              console.log(productData)
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

    return (
      <div className='card-container'>
        {product ? (
          <Card className='card'  style={{ display: 'flex', flexDirection: 'row' }}>
            <Carousel>
              <Carousel.Item>
                <Card.Img className='card-img' variant='top' src={product.images[0]} style={{ objectFit: 'cover', height: '100%' }}/>
              </Carousel.Item>
              <Carousel.Item>
                <Card.Img className='card-img' variant='top' src={product.images[1]} style={{ objectFit: 'cover', height: '100%' }}/>
              </Carousel.Item>
              <Carousel.Item>
                <Card.Img className='card-img' variant='top' src={product.images[2]} style={{ objectFit: 'cover', height: '100%' }}/>
              </Carousel.Item>
            </Carousel>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                ID: {product.id} <br />
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1>There is no product with that ID</h1>
          </div>
        )}
      </div>
    )
}

export default ProductDetail
