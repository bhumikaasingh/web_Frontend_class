import React, { useState } from 'react'
import { loginUserApi } from '../../apis/Api';
import { toast } from "react-toastify";

const Loginpage = () => {
    //use state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //error state
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    //validation
    var validate = () => {
        var isValid = true;
        if (email.trim() === '' || email.includes('@' === false)) {
            setEmailError('please enter email')
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('please enter Password')
            isValid = false;
        }
        return isValid;
    }


    //login function
    const handleLogin = (e) => {
        e.preventDefault()

        //validation
        if (!validate()) {
            return; //stop the process
        }

        //making json object
        const data = {
            "email": email,
            "password": password
        }

        //making API request(same as register)
        loginUserApi(data).then((res) => {
            //success: true/false, message

            if (res.data.success === false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
                

                //received data: success-boolfromat, message-string, token-string, userData-
                //1. set token
                localStorage.setItem('token', res.data.token)

                //2. convert json object
                const convertedData = JSON.stringify(res.data.userData)

                //3. set user data in local storage
                localStorage.setItem('user', convertedData)

            }
        })
    }

    return (
        <div className='container'>
            <h1>Login to Your account!</h1>
            <form className='w-50'>
                <label>Enter Your Email:{email}</label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" className='form-control' placeholder='Enter your Email' />
                {
                    emailError && <p className="text-danger">{emailError}</p>
                }

                <label>Enter Your Password:{password}</label>
                <input onChange={(e) => setPassword(e.target.value)} type="text" className='form-control' placeholder='Enter your Password' />
                {
                    passwordError && <p className="text-danger">{passwordError}</p>
                }

                <button onClick={handleLogin} className='btn btn-danger mt-2 w-100' >Login</button>
            </form>
        </div>
    )
}

export default Loginpage

//task
//1. create apath for login page
//2. make a UI
//3. make a use state