import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { products } from '../data'
import { Mobile } from '../responsive'
import Product from './Product'

const Heading = styled.h2`
  padding: 10px 20px;
  margin: 0px;
`

const Container = styled.div`
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    align-items: center;
    ${Mobile({padding: "20px 10px", justifyContent: "center"})}
`

const Products = ({category, filters, sortBy, maxNums, showHeading}) => {  
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setProducts] = useState([]);
  const [filteredproducts, setFilteredProducts] = useState([]);

  //get products from db
  useEffect(()=>{
    const getProducts = async () => {
      try{
        // fetch category wise products or all products
        const res = await fetch(category ? `${process.env.REACT_APP_BACKEND_URL}/products?category=${category}` : `${process.env.REACT_APP_BACKEND_URL}/products`);
        if(res.ok){
          const fetchedProducts = await res.json();
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
        }
        else{
          throw Error("Error fetching products from Database");
        }
      }
      catch(e){
        console.log(e.message);
      }
      finally{
        setIsLoading(false);
      }
    }
    getProducts();
  },[category]);

  // when filters (color/size) is changed
  useEffect(() => {
    // check if filters is passed via props
    if(!filters){
      return;
    }
    // Check if data has been fetched from the database
    if(allProducts.length === 0){
      return;
    }
    let prods = [...allProducts];
    //check the colors filter
    if(filters.color !== ''){
      prods = prods.filter(product => product.colors.includes(filters.color));
    }
    //check the size filter
    if(filters.size !== ''){
      prods = prods.filter(product => product.sizes.includes(filters.size));
    }
    setFilteredProducts([...prods]);
  }, [filters, allProducts])

  // when sortBy is changed
  useEffect(() => {
    // check if sortBy is passed via props
    if(!sortBy){
      return;
    }
    // Check if data has been fetched from the database
    if(allProducts.length === 0){
      return;
    }
    let prods = [...allProducts];
    // sort by price 
    if(sortBy === 'asc'){
      prods = prods.sort((a,b) => a.price - b.price);
    }
    else if(sortBy === 'desc'){
      prods = prods.sort((a,b) => b.price - a.price);
    }
    else if(sortBy === 'newest'){
      prods = prods.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
    }
    setFilteredProducts([...prods]);
  }, [sortBy, allProducts])

  return (
    <>
      {showHeading && 
      <Heading>Trending Products</Heading>
      }

      {!isLoading && 
      <Container>
      {filteredproducts.length === 0 ? <h3>No Products Found</h3> : filteredproducts.slice(0,maxNums).map((item) => <Product key={item._id} item={item} />)}
      </Container>
      }

      {isLoading && 
      <Container>
        <h3>Loading Products .....</h3>
      </Container>
      }
    </>
  )
}

export default Products