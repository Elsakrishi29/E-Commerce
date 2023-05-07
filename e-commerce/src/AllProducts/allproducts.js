import React,{useEffect, useState} from "react";
import './allproducts.scss'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Button,
  CardActionArea,
  CardActions,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePrice,
  addToCart,
  updateQuantity,
  updateQuantityValue,
  remove,
} from "../slice";
import "../basket/basket.scss";

const AllProducts = () =>{


  const state = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  const params=useParams();
  const [allProduct,changeAllProduct]=useState([...state[params.key]])

  const allBrandNames=[...state[params.key]].map(value=>value.brandName);

  function removeDuplicates(array) {
      return array.filter((item,index) => array.indexOf(item) === index);
  }
     
  const brandNames=removeDuplicates(allBrandNames);

  const filteredBrandName=[...brandNames].map(()=>'');
  const [filterBrandnames,changeFilterBrandNames]=useState(filteredBrandName);
  console.log('filterBrandnames',filterBrandnames);
  
  useEffect(()=>{

    var findEmpty=[...filterBrandnames].every(value=>value==='')

    var filterAllProduct=[];
    if(findEmpty){
      filterAllProduct=[...state[params.key]].map(value=>value)
    }
    else{
      [...filterBrandnames].forEach(values=>{
        [...state[params.key]].forEach(value=>{
          if(values===value.brandName){
            filterAllProduct.push(value)
          }
        })
      })

      console.log('filterAllProduct',filterAllProduct);
    }

    changeAllProduct(filterAllProduct)

  },[filterBrandnames])

  const handleBrandNames = (event,index) =>{

    var updateValue;
    if(event.target.checked===true)
      updateValue=brandNames[index];
    else updateValue=''
    var updateFilterBrandname=[...filterBrandnames]
    updateFilterBrandname[index]=updateValue;

    changeFilterBrandNames(updateFilterBrandname)

  }

  const allPrice=['Less than Rs 20','Rs 21 to Rs 50','Rs 51 to Rs 100','Rs 101 to Rs 200','Rs 201 to Rs 500','More than 501']

  
  const addCart = (id,productName,price,discountedPrice,weight,imageUrl,brandName,key) => {

    var object = {id,productName,price,discountedPrice,weight,imageUrl,quantity: 1,brandName,category: key,};
    var index = state[key].findIndex((value) => value.id === id);

    dispatch(addToCart({ object, key, index }));
  };

  const update = (event, weightPakages, Id, key) => {

    var newIndex = weightPakages.findIndex(
      (value) => value === event.target.innerText
    );
    
    var index = state[key].findIndex((value) => value.id === Id);

    var authendication;
    if (state.addToCart.length) {
      var values = state.addToCart.filter((value) => value.id === Id);
      var find = values.some(
        (value) => value.weight === event.target.innerText
      );

      if (find) {
        var quantityIndex = state.addToCart.findIndex(
          (value) => value.weight === event.target.innerText
        );
        authendication = true;
        dispatch(updateQuantityValue({ index, quantityIndex, key }));
      } else authendication = false;
    } else {
      authendication = false;
    }

    dispatch(updatePrice({ indexNo: newIndex, index, key, authendication }));
  };

  const updateValues = (event, weight, id, key) => {
    var index = state.addToCart.findIndex((value) => value.weight === weight);
    var mainIndex = state[key].findIndex((value) => value.id === id);

    var updatedValue;
    if (event.target.innerText === "+") {
      updatedValue = state.addToCart[index].quantity + 1;
    } else {
      updatedValue = state.addToCart[index].quantity - 1;
    }

    if (updatedValue === 0) {
      dispatch(remove({ index, id, key, mainIndex }));
    } else {
      dispatch(updateQuantity({ index, key, mainIndex, updatedValue }));
    }
  };

    return(
        <>
            <div className="all-products-container">
                <div className="all-products">
                    <div className="all-products-filter">
                        <div className="product-filter-card">
                            <div className="product-filter">
                                <span>Brand</span>
                            </div>
                            <div className="product-filter-content">
                                <div className="product-search">
                                    <input type={'text'} placeholder='Search by Brand'/>
                                    <div>
                                        <i className="bi bi-search"></i>
                                    </div>
                                </div>
                                <div className="product-search-content">
                                    {
                                      brandNames.map((value,index)=>{
                                        return(
                                          <div key={index}>
                                              <input type={'checkbox'} onChange={(event)=>handleBrandNames(event,index)}></input>
                                              <label>{value}</label>
                                          </div>
                                        );
                                      })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="product-filter-card">
                            <div className="product-filter">
                                <span>Price</span>
                            </div>
                            <div className="product-filter-content">
                                {
                                  allPrice.map((value,index)=>{
                                    return(
                                      <div key={index}>
                                          <input type={'checkbox'}></input>
                                          <label>{value}</label>
                                      </div>
                                    )
                                  })
                                }
                            </div>
                        </div>
                        <div className="product-filter-card">
                            <div className="product-filter">
                                <span>Discount</span>
                            </div>
                            <div className="product-filter-content">
                                <div>
                                    <input type={'checkbox'}></input>
                                    <label>Upto 5%</label>
                                </div>
                                <div>
                                    <input type={'checkbox'}></input>
                                    <label>5% - 10%</label>
                                </div>
                                <div>
                                    <input type={'checkbox'}></input>
                                    <label>10% - 15%</label>
                                </div>
                                <div>
                                    <input type={'checkbox'}></input>
                                    <label>15% - 25%</label>
                                </div>
                                <div>
                                    <input type={'checkbox'}></input>
                                    <label>More than 25%</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all-products-cards">
                        <div className="all-products-heading">
                            <h2>Organic Fruits & Vegetables ({allProduct.length})</h2>
                            <select name="cars" id="cars">
                                <option value="">Popularity</option>
                                <option value="">Price - Low to High</option>
                                <option value="mercedes">Price - High to Low</option>
                                <option value="audi">Alphabetical</option>
                                <option value="saab">Rupee Saving - High to Low</option>
                                <option value="mercedes">Rupee Saving - Low to High</option>
                                <option value="audi">% Off - High to Low</option>
                            </select>
                        </div>
                        <div className="all-products-icon">
                            <div>
                                <LocalShippingIcon/>
                                <span>ALL PRODUCTS</span>
                            </div>
                        </div>
                        <div className="all-products-content">
                            <div>
                            <Container className="basket-container all=produt-details">
        

        <Grid container className="card-container">
          
            {allProduct.map((value, index) => {
              return (
                
                  <Grid className="cards" key={index} xs={3} item>
                    <Card className="card">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={value.imageUrl}
                          height="200"
                          alt={value.productName}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {value.brandName}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                          >
                            {value.productName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <div className="card-details">
                        {value.weightPakages.length ? (
                          <Autocomplete
                            options={value.weightPakages}
                            value={value.weight}
                            onChange={(event) =>
                              update(
                                event,
                                value.weightPakages,
                                value.id,
                                value.category
                              )
                            }
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        ) : (
                          <Typography gutterBottom variant="body2">
                            {value.weight}
                          </Typography>
                        )}

                        <div className="card-actions">
                          <CardActions>
                            <span>
                              MRP:<strike>Rs {value.price}</strike>
                            </span>
                            <Typography gutterBottom variant="body2">
                              Rs {value.discountedPrice}
                            </Typography>
                          </CardActions>
                          <div className="card-content">
                            <div className="card-info">
                              <LocalShippingIcon />
                            </div>
                            <div className="card-info">
                              <p>
                                <span>Standard Delivery:</span> 11 Mar, 7:30AM -
                                10:30AM
                              </p>
                            </div>
                          </div>

                          {value.addTocardAuthendication ? (
                            <div className="add-to-card-button">
                              <div>
                                <button
                                  className="add-button"
                                  onClick={(event) =>
                                    updateValues(
                                      event,
                                      value.weight,
                                      value.id,
                                      value.category
                                    )
                                  }
                                >
                                  +
                                </button>
                                <p>{value.quantity} in basket</p>
                                <button
                                  className="minus-button"
                                  onClick={(event) =>
                                    updateValues(
                                      event,
                                      value.weight,
                                      value.id,
                                      value.category
                                    )
                                  }
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="card-button">
                              <Button className="decrement-button">Qty</Button>
                              <input
                                type={"text"}
                                value={1}
                                onChange={() => {}}
                              ></input>
                              <Button
                                className="increment-button"
                                variant="outlined"
                                onClick={() =>
                                  addCart(
                                    value.id,
                                    value.productName,
                                    value.price,
                                    value.discountedPrice,
                                    value.weight,
                                    value.imageUrl,
                                    value.brandName,
                                    value.category
                                  )
                                }
                              >
                                Add <i className="bi bi-basket-fill"></i>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card-offer">
                        <div className="offer">
                          <span>GET {value.offer}% OFF</span>
                          <i className="fa fa-certificate"></i>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                
              );
            })}
          
        </Grid>
      </Container>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default AllProducts;