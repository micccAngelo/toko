import React from 'react'
import Products from '../../Components/Products/Products'

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{ marginLeft: "250px" }}>
        <Products/>
      </div>
    </div>
  )
}

export default Home
