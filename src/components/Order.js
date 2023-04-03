import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Card = styled.div`
    margin: 12px 0px;
    padding: 8px 8px;
    background-color: #ffffff;
    border: 1px solid gray;
    border-radius: 4px;
    width: 100%;
    max-width: 800px;
`
const Product = styled.div`
    display: flex;
    padding: 4px;
    border-bottom: 0.5px solid gray;
`

const Summary = styled.div`
    border-bottom: 2px solid gray;
`

const Detail = styled.div`
    margin: 8px 0px;
    display: flex;
    font-size: 1rem;
    font-weight: bold;
    align-items: flex-start;
`
const Name = styled.div`
    flex:1;
`
const Value = styled.div`
    flex: 1;
`

const ProductDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`


const PriceDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Large = styled.span`
    font-size: 1rem;
`

const Small = styled.span`
    font-size: 0.9rem;
`

const Order = ({order}) => {
  return (
    <div>
        <Card>
            <Summary>
            <Detail>
                <Name>Ordered At:</Name>
                <Value>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Value>
            </Detail>
            <Detail>
                <Name>Ship To:</Name>
                <Value>{order.shipTo}</Value>
            </Detail>
            <Detail>
                <Name>Address:</Name>
                <Value>{order.address}</Value>
            </Detail>
            <Detail>
                <Name>Amount:</Name>
                <Value>${order.amount}</Value>
            </Detail>
            <Detail>
                <Name>Payment Method:</Name>
                <Value>Cash on Delivery</Value>
            </Detail>
            <Detail>
                <Name>Status:</Name>
                <Value>Pending</Value>
            </Detail>
            </Summary>
            {order.products.map((product) =>
            <Product key={`${product._id}${product._color}${product._size}`}>
                <ProductDetail>
                    <Large>{product.title}</Large>
                    <Small>color: {product.color}</Small>
                    <Small>size: {product.color}</Small>
                </ProductDetail>
                <PriceDetail>
                    <Large>${product.quantity * product.price}</Large>
                    <Small>Qty: {product.quantity}</Small>
                </PriceDetail>
            </Product>
            )}
        </Card>
    </div>
  )
}

export default Order