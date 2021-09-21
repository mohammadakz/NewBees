import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";

const ProductCard = () => {
  const { addItemsToCart } = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      const res = await fetch(`/products`);
      const data = await res.json();
      console.log(data);
      setProductData(data.data);
      setLoading(false);
    };
    fetchProductData();
  }, []);

  return loading ? (
    "Loading..."
  ) : (
    <>
      {productData.map((item) => {
        return (
          <ProductWrap key={item.name}>
            <Img src={item.imageSrc} />
            <h2>{item.name}</h2>
            <h3>{item.price}</h3>
            <button onClick={() => addItemsToCart(item)}>ADD TO CARD</button>
          </ProductWrap>
        );
      })}
    </>
  );
};

const ProductWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #fafafa;
  border: 1px solid lightgray;
  padding: 2%;
  align-items: center;
`;

const Img = styled.img`
  width: 150px;
`;

export default ProductCard;
