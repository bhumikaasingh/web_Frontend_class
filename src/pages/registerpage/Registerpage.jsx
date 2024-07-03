import React, { useState } from "react";
import { registerUserApi } from "../../apis/Api";
import { toast } from "react-toastify";

const Registerpage = () => {
    //coding section

    //make a state variable -5 state

    //format(variableName, ChangingVarName)=state

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('') /// added 

    //state for error
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setFConfirmPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    //make a function to save a state
    const handleFirstname = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handlePhone=(e)=>{
        setPhone(e.target.value)
    }

    //validation
    var validate = () => {
        var isValid = true;
        if (firstName.trim() === '') {
            setFirstNameError('please enter firstName')
            isValid = false;
        }
        if (lastName.trim() === '') {
            setLastNameError('please enter lastName')
            isValid = false;
        }
        if (email.trim() === '') {
            setEmailError('please enter email')
            isValid = false;
        }
        if (password.trim() === '') {
            setPasswordError('please enter Password')
            isValid = false;
        }
        if (confirmPassword.trim() === '') {
            setFConfirmPasswordError('please enter ConfirmPassword')
            isValid = false;
        }
         if (phone.trim() === '') {
            setPhoneError('phone number is required')
            isValid = false;
        }
        return isValid;
    }


    //for button
    const handleSubmit = (e) => {
        e.preventDefault()
        var isValid = validate()
        if (!isValid) {
            return; //stop the process
        }

        //Making API Request
        //Making JSON object of register data
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "phone":phone
        }
        registerUserApi(data).then((res) => {
            //success: true/false, message

            if (res.data.success == false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
            }
        })


    }


    return (
        <>
            <div className='m-3'>
                <h1>Create an account!</h1>
                <form className='w-50'>
                    <label>FirstName:{firstName}</label>
                    <input onChange={handleFirstname} type="text" className='form-control' placeholder='Enter your firstname'></input>

                    {
                        firstNameError && <p className="text-danger">{firstNameError}</p>
                    }

                    <label className='mt-2'>LastName:{lastName}</label>
                    <input onChange={handleLastName} type="text" className='form-control' placeholder='Enter your lastname'></input>

                    {
                        lastNameError && <p className="text-danger">{lastNameError}</p>
                    }

                    <label className='mt-2'>Email Address:{email}</label>
                    <input onChange={handleEmail} type="text" className='form-control' placeholder='Enter your email address'></input>

                    {
                        emailError && <p className="text-danger">{emailError}</p>
                    }

                    <label className='mt-2'>Phone Number</label>
                    <input onChange={handlePhone} type="number" className='form-control' placeholder='Enter your phone number'></input>

                    {
                        phoneError && <p className="text-danger">{phoneError}</p>
                    }

                    <label className='mt-2'>Password:{password}</label>
                    <input onChange={handlePassword} type="text" className='form-control' placeholder='Enter your password'></input>

                    {
                        passwordError && <p className="text-danger">{passwordError}</p>
                    }

                    <label className='mt-2'>Confirm Password:{confirmPassword}</label>
                    <input onChange={handleConfirmPassword} type="text" className='form-control' placeholder='Enter your confirm password'></input>

                    {
                        confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>
                    }

                    <button onClick={handleSubmit} className='btn btn-danger mt-2 w-100' >Register</button>
                </form>
            </div>
        </>
    )
}

export default Registerpage

//make UI complete-done
//Make a variable to save value of each input temporary
//change everytime we write
//submit
