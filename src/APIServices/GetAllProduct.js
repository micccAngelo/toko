import BaseURL from './BaseURL'

const GetAllProduct = async () => {
  try {
    const response = await BaseURL.get('/products')
    return Promise.resolve(response.data.products)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetAllProduct
