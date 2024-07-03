import{render,fireEvent,waitFor,screen}from "@testing-library/react";
import Homepage from './Homepage'
import '@testing-library/jest-dom'
import productMock from "../../_mock_/productMock";
import { getAllProducts } from "../../apis/Api";

//mock the Api.js files , not sending to real backend
jest.mock('../../apis/Api'); 

//test case 
describe('Homepage component',() => {
    afterAll(()=> {
        jest.clearAllMocks()
    })

    it('All Products should be in homepage', async()=> {
       

        //Mock response :list of products 
        const mock_data =productMock;


        //resolve api response 
        getAllProducts.mockResolvedValue({data:{products:mock_data}})
         //render homepage components
         render(<Homepage/>)

        //all work done 
        // time to test
        waitFor(() =>{
            mock_data.forEach((product)=>{
                expect(screen.getByText(product.productName)).toBeInTheDocument();
             
            })

        })
    })

})