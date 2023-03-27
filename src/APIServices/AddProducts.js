import BaseURL from './BaseURL'

const AddProducts = async () => {
  try {
    const response = await BaseURL.post('/products/add')
    return Promise.resolve(response.data.products)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default AddProducts
