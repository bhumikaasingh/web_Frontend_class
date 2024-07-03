import{render,fireEvent,waitFor,screen}from "@testing-library/react";
import Loginpage from "./Loginpage";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";


//mock the Api.js files , not sending to real backend
jest.mock('../../apis/Api'); 


//List of test  cases
describe('LoginPage Component',()=>{


    //Clearing all mocks test
    afterEach(() =>{
        jest.clearAllMocks()
    })

    //Test 1
    it('Should display error toast message on login fail! with incorrect password',async () =>{


        //Rendering the Loginpage Component 
        render(<Loginpage/>);


        //First we have to make mock response

        const mockResponse = {
            data:{
                'success':false,
                "message":"Incorrect Password!"
            }
        }

        //config mock response
        loginUserApi.mockResolvedValue(mockResponse)


        //Config toast .error
        toast.error = jest.fn();
        

        // finding email,password,and login button from screen
        const email =await screen.findByPlaceholderText('Enter your Email')
        const password =await screen.findByPlaceholderText('Enter your Password')
        const LoginBtn= screen.getByText('Login')

        //Simulating ,filling input logically
        fireEvent.change(email,{
            target:{
                value:'bhu@gmail.com'
            }
        })
        fireEvent.change(password,{
            target:{
                value:'12345'
            }
        })
        fireEvent.click(LoginBtn)

        //we have finished the proceess


        //Next is,Ensuring all above test are working fine!
        await waitFor(() => {
             
            //Expect api call with data,we entered /chnage 
            expect(loginUserApi).toHaveBeenCalledWith({email:"bhu@gmail.com",password:"12345"})


            //check error .toast is called or npt 
            expect(toast.error).toHaveBeenLastCalledWith('Incorrect Password!')

        })



    })

})
