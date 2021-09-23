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
  const params = useParams();
  const productId = params.productId;

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

  useEffect(() => {
    setLoading(true);
    const fetchCompanyData = async () => {
      const res = await fetch(`/companies/${companyId}`);
      const data = await res.json();
      console.log("company data", data);
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
        <button onClick={() => addItemsToCart(productData)}>ADD TO CARD</button>
      </Details>
    </ProductWrap>
  );
};

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

const Details = styled.div`
  padding: 25px;
  font-family: sans-serif;
`;

export default ProductDetails;
