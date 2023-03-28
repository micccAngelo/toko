import BaseURL from './BaseURL'

const GetProductbyCategory = async (selectedCategory) => {
  try {
    const response = await BaseURL.get(`/products/category/${selectedCategory}`)
    console.log(selectedCategory)
    console.log(response.data.products)
    return Promise.resolve(response.data.products)
  } catch (error) {
    console.log(error)
    return Promise.reject();
  }
}

export default GetProductbyCategory
