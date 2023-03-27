import React from 'react'
import ProductList from '../../Components/Product/ProductList'
import Category from '../../Components/Category/Category'

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Category />
      <ProductList />  
    </div>
  )
}

export default Home
