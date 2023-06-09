import BaseURL from './BaseURL'

const GetSingleProduct = async (id) => {
  try {
    const response = await BaseURL.get(`/products/${id}`)
    console.log(id)
    console.log(response)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetSingleProduct