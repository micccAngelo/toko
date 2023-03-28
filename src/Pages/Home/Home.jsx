import React from 'react'
import Category from '../../Components/Category/Category'
import Products from '../../Components/Products/Products'

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Category />
      <div style={{ marginLeft: "250px" }}>
        <Products/>
      </div>
    </div>
  )
}

export default Home
