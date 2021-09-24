import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";

const ProductDetails = ({ item }) => {
  const { addItemsToCart } = useContext(CartContext);
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [companyId, setCompanyId] = useState();
  const [quantity, setQuantity] = useState(1);
  //   extract product from url
  const params = useParams();
  const productId = params.productId;

  // fetches product data from the backend according to id
  useEffect(() => {
    const fetchProductData = async () => {
      const res = await fetch(`/products/${productId}`);
      const data = await res.json();
      setProductData(data.data);
      setCompanyId(data.data.companyId);
      setLoading(false);
    };
    fetchProductData();
  }, []);

  //   fetches the company data according to id
  useEffect(() => {
    setLoading(true);
    const fetchCompanyData = async () => {
      const res = await fetch(`/companies/${companyId}`);
      const data = await res.json();
      setCompanyData(data.data);
      setLoading(false);
    };
    fetchCompanyData();
  }, [companyId]);

  return loading ? (
    "Loading..."
  ) : (
    <ProductWrap key={productId}>
      <Img src={productData.imageSrc} />
      <Container>
        <Details>
          <h2>{productData.name}</h2>

          <p>{`${companyData.name} | ${companyData.country}`}</p>
          <p>{`Category: ${productData.category}`}</p>
          <p>{`Body Part: ${productData.body_location}`}</p>
          <h3>{productData.price}</h3>
          {productData.numInStock < 1 ? (
            <p>Out of Stock</p>
          ) : productData.numInStock < 11 ? (
            <p>{`${productData.numInStock} in stock`}</p>
          ) : (
            ""
          )}
        </Details>
        <Button
          onClick={() => productData.numInStock && addItemsToCart(productData)}
        >
          ADD TO CART
        </Button>
      </Container>
    </ProductWrap>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
const ProductWrap = styled.div`
  display: flex;
  width: 75%;
  margin: 0 auto;
  background-color: #fafafa;
  overflow: hidden;
`;

const Img = styled.img`
  width: 40%;
`;

const Container = styled.div`
  width: 60%;
  padding: 5%;
`;

const Details = styled.div`
  width: 80%;
  margin: 0 10%;
  font-family: sans-serif;
`;

const Button = styled.button`
  font-weight: bold;
  margin: 0 10%;
  width: 80%;
  border: none;
  padding: 25px 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 2px -1px gray;

  &:hover {
    cursor: pointer;
    background-color: #ffd750;
  }

  &:active {
    box-shadow: 0 2px 2px -1px gray;
  }
`;

export default ProductDetails;
