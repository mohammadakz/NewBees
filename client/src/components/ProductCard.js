import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import PlusIcon from "../assets/plus_icon.svg";
import MinusIcon from "../assets/minus_icon.svg";
import loadingGif from "../assets/loading.gif";

const ProductCard = () => {
  const { addItemsToCart, cartItems } = useContext(CartContext);

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const [page, setPage] = useState(1);

  // to increase number of item
  const incrementItem = () => {
    setQuantity(quantity + 1);
  };

  // to increase number of item

  const decrementItem = () => {
    if (quantity === 0) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

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
    <LoadingGif src={loadingGif} />
  ) : (
    <>
      {productData.map((item) => {
        return (
          <ProductWrap key={item.name}>
            <ItemLink to={`/products/${item._id}`}>
              <Img style={{ backgroundImage: `url(${item.imageSrc})` }} />
              <ProductContent>
                <h5>{item.name}</h5>
              </ProductContent>
            </ItemLink>
            <PriceAddRemove>
              <h4>{item.price}</h4>
              {item.numInStock > 0 ? (
                <IconWrap>
                  <Minus src={MinusIcon} onClick={() => decrementItem(item)} />
                  <div>{quantity}</div>
                  <Plus src={PlusIcon} onClick={() => incrementItem(item)} />
                </IconWrap>
              ) : null}
            </PriceAddRemove>

            {/* {item.numInStock < 11 ? <p>Only {item.numInStock} left!</p> : null} */}

            {item.numInStock > 0 ? (
              <AddButton onClick={() => addItemsToCart(item)}>
                Add to Cart
              </AddButton>
            ) : (
              <AddButton onClick={() => addItemsToCart(item)} disabled>
                Out of Stock
              </AddButton>
            )}
          </ProductWrap>
        );
      })}
    </>
  );
};

const LoadingGif = styled.img`
  margin: auto;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const ProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-repeat: no-repeat;
  align-items: center;
  position: relative;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const Img = styled.div`
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ProductContent = styled.div`
  padding: 3%;
`;

const PriceAddRemove = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
`;

const IconWrap = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
`;

const Plus = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    filter: hue-rotate(125deg);
  }
`;
const Minus = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    filter: hue-rotate(125deg);
  }
`;

const AddButton = styled.button`
  bottom: 0px;
  border-style: none;
  margin: 5% 0 5% 0;
  width: 90%;
  height: 4.5vh;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  z-index: 100;
  border-radius: 10px;

  &:hover {
    background-color: #ffd750;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #f2f2f2;
    color: #000;
    opacity: 75%;
    &:hover {
      background-color: none;
    }
  }
`;

export default ProductCard;
