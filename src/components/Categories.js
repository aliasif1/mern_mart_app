import React from 'react'
import { categories } from '../data'
import Category from './Category'
import styled from 'styled-components'
import { Mobile } from '../responsive'

const Heading = styled.h2`
padding: 10px 20px;
margin: 0px;
`

const Container = styled.div`
    padding: 10px 20px;
    margin-bottom: 10px;
    display: flex;
    gap: 12px;
    ${Mobile({padding: "10px", flexDirection: "column"})}
`

const Categories = () => {
  return (
    <>
      <Heading>Top Categories</Heading>
      <Container>
        {categories.map((item) => <Category key={item.id} item={item} />)}
      </Container>
    </>
    
    
  )
}

export default Categories