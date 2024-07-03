import{render,fireEvent,waitFor,screen}from "@testing-library/react";
import Registerpage from './Registerpage'
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";


//mock the Api.js files , not sending to real backend
jest.mock('../../apis/Api'); 


//List of test  cases
describe('Registerpage Component',()=>{


    //Clearing all mocks test
    afterEach(() =>{
        jest.clearAllMocks()
    })

    //Test 1
    it('Should display error toast message on register fail! with User Already Exists!',async () =>{


        //Rendering the Loginpage Component 
        render(<Registerpage/>);


        //First we have to make mock response

        const mockResponse = {
            data:{
                'success':false,
                "message":"User Created Successfully"
            }
        }

        //config mock response
        
        registerUserApi.mockResolvedValue(mockResponse)


        //Config toast .error
        toast.error = jest.fn();
        

        // finding email,password,and login button from screen
        const firstName =await screen.findByPlaceholderText('Enter your firstname')
        const lastname =await screen.findByPlaceholderText('Enter your lastname')
        const email =await screen.findByPlaceholderText('Enter your email address')
        const phone =await screen.findAllByPlaceholderText('Enter your phone number')
        const password =await screen.findByPlaceholderText('Enter your password')
        const confirmPassword =await screen.findByPlaceholderText('Enter your confirm password')
        const RegisterBtn= screen.getByText('Register')

        //Simulating ,filling input logically
        fireEvent.change(firstName,{
            target:{
                value:'Bhumika'
            }
        })
        fireEvent.change(lastname,{
            target:{
                value:'Singh'
            }
        })

        fireEvent.change(email,{
            target:{
                value:'test1@gmail.com'
            }
        })
        fireEvent.change(phone,{
            target:{
                value: "9855555555"
            }
        })
        fireEvent.change(password,{
            target:{
                value:'test1234'
            }
        })
        fireEvent.click(RegisterBtn)

        //we have finished the proceess


        //Next is,Ensuring all above test are working fine!
        await waitFor(() => {
             
            //Expect api call with data,we entered /chnage 
            expect(registerUserApi).toHaveBeenCalledWith({firstName:"Bhumika",lastname:"Singh",email:"test1@gmail.com",password:"test1234",phone: "9855555555", confirmPassword:"test1234" })


            //check error .toast is called or npt 
            expect(toast.error).toHaveBeenCalledWith('User Created Successfully')

        })



    })

})
