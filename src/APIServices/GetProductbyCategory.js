import BaseURL from './BaseURL'

const GetProductbyCategory = async (selectedCategory) => {
  try {
    const response = await BaseURL.get(`/products/category/${selectedCategory}`)
    console.log(selectedCategory)
    console.log(response.data)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetProductbyCategory
