import React, { useState } from 'react'
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api'
import { toast } from 'react-toastify'

const ForgotPassword = () => {


    //phone number state 
    const [phone, setPhone] = useState('')
    const [isSent, setIsSent] = useState(false)


    //defininf 2 api
    const [otp, setOtp]=useState('')
    const [password, setPassword]=useState('')

    //send otp function
    const handleForgotPassword = (e) => {
        e.preventDefault()


        //calling api
        forgotPasswordApi({ phone }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message)
                setIsSent(true)
            }
        }).catch((error) => {
            if (error.response.status === 400){
                toast.error(error.response.data.message)
            }

        })
    }


    //verify and set password function
    const handleVerify = (e) =>{
        e.preventDefault()

        //make a json object 
        const data ={
            'phone':phone,
            "otp":otp,
            "password":password
        }

        //api call 
        verifyOtpApi(data).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message)
                
            }
        }).catch((error) => {
            if (error.response.status === 400){
                toast.error(error.response.data.message)
            }

        })

    } 
    return (
        <>
            <div className='container mt-2'>
                <h3>Forgot Password</h3>
                <form className='w-25'>
                    <span className='d-flex'>
                        <h4>+977</h4>
                        <input disabled={isSent} onChange={(e) => setPhone(e.target.value)} className='form-control' type='number' placeholder='enter yourr valid number'></input>
                    </span>
                    <button disabled={isSent} onClick={handleForgotPassword} className='btn btn-dark w-100 mt-2'>Send OTP</button>



                    {
                        isSent && <>
                        <hr/>

                        <span>OTP has been sent to {phone}✅ </span>
                        <input onChange={(e)=>setOtp(e.target.value)} type='number' className='from-control mt-2'placeholder='Enter Valid OTP'></input>
                        <input onChange={(e)=>setPassword(e.target.value)} type='text' className='from-control mt-2'placeholder='Set New password'></input>
                        <button onClick={handleVerify} className='btn btn-primary mt-2 w-100'>verify OTP & set Password</button>



                        </>
                    }

                </form>

            </div>
        </>
    )
}

export default ForgotPassword


//logic in this page
//UI- phone numner input field -state
//make a API request (sending OTP)
//if otp is send successfully
//button and input (disabled)
//OTP input field and new password field
//OTP is send to "98756546"
//if otp is valid :set password
//else :invalid otp
