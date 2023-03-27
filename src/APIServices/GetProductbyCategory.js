import BaseURL from './BaseURL'

const GetProductbyCategory = async (id) => {
    try {
      const response = await BaseURL.get(`/products/${id}`)
      return Promise.resolve(response.data)
    } catch (error) {
      console.log(error)
      return Promise.reject();
    }
  }
  
  export default GetProductbyCategory