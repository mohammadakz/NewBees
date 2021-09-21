import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
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
      {productData.map((item, index) => {
        return (
          <ProductWrap key={item.name}>
            <ItemLink to={`/products/${item._id}`}>
              <Img src={item.imageSrc} />
              <ProductContent>
                <h2>{item.name}</h2>
                <h3>{item.price}</h3>
              </ProductContent>
            </ItemLink>
            <AddButton onClick={() => addItemsToCart(item)}>
              Add To Cart
            </AddButton>
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
  align-items: center;
  position: relative;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Img = styled.img`
  width: 100%;
`;

const ProductContent = styled.div`
  padding: 3%;
`;

const AddButton = styled.button`
  bottom: 0px;
  position: absolute;
  border-style: none;
  padding: 3%;
  width: 60%;
  height: 3vh;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  z-index: 100;
  margin: 3%;
  border-radius: 10px;

  &:hover {
    background-color: #ffd750;
  }
`;

export default ProductCard;
