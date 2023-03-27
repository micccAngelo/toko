import BaseURL from './BaseURL'

const GetProductbyCategory = async (category) => {
  try {
    const response = await BaseURL.get(`/products/category/${category}`)
    console.log(response.data)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetProductbyCategory
