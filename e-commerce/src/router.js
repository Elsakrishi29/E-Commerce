import React from "react";
import Footer from "./Footer/footer";
import Basket from "./basket/basket";
import Details from "./Details/details";
import AllProducts from "./AllProducts/allproducts";
import Navigation from "./Navigation/Navigation";
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
                <Navigation/>
                <Routes>
                    <Route path='/' element={<Main/>} />
                    <Route path='/details/:key/:index' element={<Details/>} />
                    <Route path='/allProducts/:key' element={<AllProducts/>} />
                    <Route path='*' element={<Navigate to={'/'} />}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default Redux;

