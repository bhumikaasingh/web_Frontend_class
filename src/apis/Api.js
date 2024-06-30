import axios from "axios";

//creating an instance of axios
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

//creating authorization config
const config={
    headers:{
        'authorization':`Bearer ${localStorage.getItem('token')}`
    }
}

//creating test api
export const testApi = () => Api.get('/test')

//creating register api
export const registerUserApi = (data) => Api.post('/api/user/create', data)

//create login Api
export const loginUserApi = (data) => Api.post('/api/user/login', data)

//create product create api
export const createProductApi = (data) => Api.post('/api/product/create', data)

// fetch all products
export const getAllProducts = () => Api.get('/api/product/get_all_products',config)

// fetch single product
export const singleProductApi = (id) => Api.get(`api/product/get_single_product/${id}`,config);

// delete single product
export const deleteSingleProductApi = (id) => Api.delete(`api/product/delete_product/${id}`)

//update product 
export const updateProduct = (id,data) => Api.put(`api/product/update_product/${id}`,data,config)



//forgot password 
export const forgotPasswordApi = (data)=> Api.post('/api/user/forgot_password',data)




//verify 
export const verifyOtpApi = (data)=> Api.post('/api/user/verify_otp',data)




export const loginApi = () => Api.get('/login')
//http://localhost:5000/test