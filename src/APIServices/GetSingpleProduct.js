import BaseURL from './BaseURL'

const GetSingleProduct = async (id) => {
  try {
    const response = await BaseURL.get(`/products/${id}`)
    return Promise.resolve(response.data.products)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetSingleProduct
