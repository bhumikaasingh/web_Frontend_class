
import React, { useState, useEffect } from "react";
import { createProductApi, deleteSingleProductApi, getAllProducts } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  // logic for get products
  const [products, setProducts] = useState([])
  // Hit API(Get all product) Auto->useEffect(list of products)
  const getProduct = () => {
    getAllProducts().then((res) => {
      //success, message, list of products(products)
      setProducts(res.data.products)

    }).catch((error) => {
      console.log(error)
    })

  }
  useEffect(() => {
    getProduct()


  }, [])
  console.log(products)


  // make a state to save(Array format)
  // table row ma (productname,productprice,productdescription)

  //making a state for product
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')

  //Image State
  const [productImage, setProductImage] = useState(null)
  const [previewImage, setpreviewImage] = useState(null)

  //function to upload and preview image
  const handleImageUpload = (event) => {
    //0-File, 1-name, 2-Size
    const file = event.target.files[0]
    setProductImage(file)
    setpreviewImage(URL.createObjectURL(file))
  }

  // delete product
  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?")
    if (confirmDialog) {
      // delete product
      deleteSingleProductApi(id).then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message)
          getProduct()
        } else {
          toast.error('something went wrong in frontend!')
        }
      }).catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error(error.res.data.message)
          }
          //space for 401 error
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message)
        } 


      });

    }
  }
  //handel submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(productName, productPrice, productCategory, productDescription, productImage)


    //make a logical form data
    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('productPrice', productPrice)
    formData.append('productCategory', productCategory)
    formData.append('productDescription', productDescription)
    formData.append('productImage', productImage)


    //make a call/request
    createProductApi(formData).then((res) => {
      if (res.status === 201) {
        toast.success(res.data.message)
        getProduct()
        // window.location.reload()
      } else {
        toast.error('something went wrong in frontend!')
      }
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.res.data.message)
        }
        //space for 401 error
      } else if (error.response.status === 500) {
        toast.error('internal server error')
      } else {
        toast.error('no response')
      }


    })
  }



  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between mt-2">
          <h1>Admin Dashboard:</h1>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Product
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new product</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <label>Product Name</label>
                    <input onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" placeholder="Enter your product name" />

                    <label className="mt-2">Product Price</label>
                    <input onChange={(e) => setProductPrice(e.target.value)} type="number" className="form-control" placeholder="Enter your product price" />

                    <div className='mt-2'>
                      <label>Select Category</label>
                      <select onChange={(e) => setProductCategory(e.target.value)} className="form-control">
                        <option value="crafts">Crafts</option>
                        <option value="wedding">Wedding</option>
                        <option value="home and living">Home and Living</option>
                        <option value="gift">Gift</option>
                      </select>

                    </div>
                    <label className='mt-2'>Type product Description</label>
                    <textarea onChange={(e) => setProductDescription(e.target.value)} className="form-control"></textarea>

                    <label className='mt-2'>Product Image</label>
                    <input onChange={handleImageUpload} type="file" className="form-control" />

                    {/* Preview Image */}
                    {
                      previewImage && (
                        <div className='mb-2'>
                          <img src={previewImage} alt="preview image" className="img-fluid rounded object-fit-cover mt-3" />
                        </div>
                      )
                    }

                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={handleSubmit} type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="table mt-3">
          <thead className="table-dark">
            <tr>
              <th>Product Image</th>
              <th>Product  Name</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Product Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((singleProduct) => (
                <tr>
                  <td>
                    <img height={'50px'} width={'50px'} src={`http://localhost:5000/products/${singleProduct.productImage}`} alt="" />
                  </td>
                  <td>{singleProduct.productName}</td>
                  <td>NPR.{singleProduct.productPrice}</td>
                  <td>{singleProduct.productCategory}</td>
                  <td>{singleProduct.productDescription}</td>
                  <td>
                    <div className="button-group" role='group'>
                      <Link to={`/admin/update/${singleProduct._id}`} className="btn btn-success">Edit</Link>
                      <button onClick={() => handleDelete(singleProduct._id)} className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;


// products (array) [{pp1,pn1},{pp2,pn2}]
// Array mapping (Table format ma)
// products(product) vitra->pp1
// pp1(product)

//1. new page(Update Product)
//2. Form (required fields hunu paryo) name,price,description,category,old image, new image
//3. useState 7 ota hunxan
//4. fill the previous values
//5. call the API(Single product)
//5.1 Backend
//5.2 Based on _id(Admin Dashboard)
// transport '_id' to update product samma pugaunu paryo
// receive in update product page
