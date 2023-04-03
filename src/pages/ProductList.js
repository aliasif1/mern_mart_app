import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import styled from 'styled-components'
import { Mobile } from '../responsive'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
    padding: 0px 20px;
    ${Mobile({padding: "10px 10px"})}
`
const Title = styled.h1`
    font-size: 1.8rem;
    margin-top: 16px;
    margin-bottom: 16px;
    ${Mobile({fontSize: "1.5rem"})}
`

const FilterContainer = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    ${Mobile({flexDirection: "column"})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 400;
    ${Mobile({fontSize: "1rem"})}
`
const FilterItem = styled.div`
    display: flex;
    margin-left: 12px;
`
const Select = styled.select`
    padding: 4px;
    font-size: 1.2rem;
    min-width: 100px;
    ${Mobile({fontSize: "1rem"})}
`
const Option = styled.option``

const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split('/')[2];
    const [filters, setFilters] = useState({color: '', size: ''});
    const [sortBy, setSortBy] = useState('newest');
    
    const handleFilter = (e) =>{
        setFilters(prevFilters => {
            return {...prevFilters, [e.target.name]: e.target.value}
        });
    }
    const handleSortBy = (e) =>{
        setSortBy(e.target.value);
    }

    return (
    <div>
        <Navbar />
        <Container>
            <Title>{category.toUpperCase()} COLLECTION</Title>
            <FilterContainer>
                <Filter>
                    <FilterTitle>Filter</FilterTitle>
                    <FilterItem>
                        <Select name="color" onChange={handleFilter}>
                            <Option value="" defaultValue={true}>Color</Option>
                            <Option value="white">White</Option>
                            <Option value="black">Black</Option>
                            <Option value="red">Red</Option>
                        </Select>
                    </FilterItem>
                    <FilterItem>
                        <Select name="size" onChange={handleFilter}>
                            <Option value="" defaultValue={true} >Size</Option>
                            <Option value="small">Small</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="large">Large</Option>
                        </Select>
                    </FilterItem>
                </Filter>
                <Filter>
                    <FilterTitle>Sort</FilterTitle>
                    <FilterItem>
                        <Select name="sortBy" onChange={handleSortBy}>
                            <Option value="newest" defaultValue={true}>Newest</Option>
                            <Option value="asc">Price (Asc)</Option>
                            <Option value="desc">Price (Desc)</Option>
                        </Select>
                    </FilterItem>
                </Filter>
            </FilterContainer>
        </Container>
        <Products category={category} filters={filters} sortBy={sortBy} showHeading={false}/>
        <Newsletter />
        <Footer />
  </div>
  )
}

export default ProductList
