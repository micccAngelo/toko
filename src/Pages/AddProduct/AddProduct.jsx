import './AddProduct.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import React from 'react'
import Loadings from '../../Reusable/Loadings';
import GetCategories from '../../APIServices/GetCategories';
import AddProducts from '../../APIServices/AddProducts';
import Modals from '../../Reusable/Modals';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const initialValues = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        brand: '',
        thumbnail: '',
        image: ''
    };

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const data = await GetCategories();
            setCategories(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchCategories();
      }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Product name is required')
            .min(3, 'Product name must be at least 3 characters')
            .max(15, 'Product name must be less than 15 characters')
            .matches(/^[a-zA-Z0-9]*$/, 'Product name can only contain letters and numbers'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters')
            .max(100, 'Description must be less than 100 characters'),
        price: Yup.number()
            .required('Price is required')
            .min(1, 'Price cannot be less than a dollar'),
        stock: Yup.number()
            .required('Stock is required')
            .min(1, 'Stock cannot be less than 1'),
        category: Yup.string()
            .required('Category is required'),
        brand: Yup.string()
            .required('Brand is required')
            .min(3, 'Brand must be at least 3 characters')
            .max(15, 'Brand must be less than 15 characters'),
        thumbnail: Yup.string()
            .required('Thumbail image is required'),
        image: Yup.string()
            .required('Image is required')
    });

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        console.log(values);
        try {
            const response = await AddProducts(values);
            console.log(response); 
            setShowModal(true)
            setLoading(false)
            resetForm();
        } catch (error) {
            console.log(error);
            setLoading(false)
        } 
    };

    if(!isLoggedIn){
      return(
        <Navigate to="/Login" replace />
      );
    }

    if(loading){
        return(
            <Loadings variant="danger" />
        );
    }

    return (
        
        <div className='position'>
            <Modals
                show={showModal}
                onHide={() => setShowModal(false)}
                title="Success!"
                message={`Product successfuly added!`}
            />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='form-position'>
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <Field type="text" id="name" placeholder="Enter Product Name" name="name" className="form-control-field" />
                  <ErrorMessage name="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field as="textarea" type="text" id="description" placeholder="Enter Product Description" name="description" className="form-control-field area" />
                  <ErrorMessage name="description" />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Field type="number" id="price" placeholder="0" name="price" className="form-control-field" />
                  <ErrorMessage name="price" />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <Field type="number" id="stock" placeholder="0" name="stock" className="form-control-field" />
                  <ErrorMessage name="stock" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <Field as="select" id="category" name="category" className="form-control-field">
                        <option value="">Select a category</option>
                        {categories && categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="category" />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <Field type="text" id="brand" placeholder="Enter Product Brand" name="brand" className="form-control-field" />
                  <ErrorMessage name="brand" />
                </div>
                <div className="form-group">
                  <label htmlFor="thumbnail">Thumbnail Image</label>
                  <Field type="file" id="thumbnail" accept=".jpeg,.png" name="thumbnail" className="form-control-field" />
                  <ErrorMessage name="thumbnail" />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image</label>
                  <Field type="file" id="image" accept=".jpeg,.png" name="image" className="form-control-field" />
                  <ErrorMessage name="image" />
                </div>
                <Button type="submit" className='button-submit' variant="outline-primary" disabled={isSubmitting}>Submit</Button>
              </Form>
            )}
          </Formik>
        </div>
    );
}

export default AddProduct
