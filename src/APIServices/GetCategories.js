import BaseURL from './BaseURL'

const GetCategories = async () => {
  try {
    const response = await BaseURL.get('/products/categories')
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetCategories
