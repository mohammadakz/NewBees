import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import loadingGif from "../assets/loading.gif";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductCard = () => {
  const { addItemsToCart, cartItems } = useContext(CartContext);

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

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
          <InfiniteScroll
            dataLength={productData.length} //This is important field to render the next data
            next={() => setPage(page + 1)}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ProductWrap key={item.name}>
              <ItemLink to={`/products/${item._id}`}>
                <Img style={{ backgroundImage: `url(${item.imageSrc})` }} />
                <ProductContent>
                  <h5>{item.name}</h5>
                </ProductContent>
              </ItemLink>
              <PriceAdd>
                <h4>{item.price}</h4>

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
              </PriceAdd>
            </ProductWrap>
          </InfiniteScroll>
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
  background-color: #fff;
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
  height: 270px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ProductContent = styled.div`
  padding: 3%;
`;

const PriceAdd = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
`;

const AddButton = styled.button`
  bottom: 0px;
  border-style: none;
  margin: 5% 0 5% 0;
  width: 50%;
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
