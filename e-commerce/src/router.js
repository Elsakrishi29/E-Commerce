import React from "react";
import Basket from "./basket/basket";
import Details from "./Details/details";
import AllProducts from "./AllProducts/allproducts";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { stores } from "./store";

const Redux = () =>{
    return(
        <>
           <Provider store={stores}>
                <Routing/>
           </Provider> 
        </>
    );
}

const Main = () =>{
    return(
        <>
            <Basket/>
        </>
    );
}

const Routing = () =>{
    return(
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Main/>} />
                    <Route path='/details/:key/:index' element={<Details/>} />
                    <Route path='/allProducts/:key' element={<AllProducts/>} />
                    <Route path='*' element={<Navigate to={'/'} />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Redux;

