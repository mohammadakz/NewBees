import React from "react";
import { Link, Navlink } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router";
import loadingGif from "../assets/loading.gif";
import CartContext from "./Hooks/Cart/CartContext";
import SubNav from "./SubNav";

const CategoryDisplay = () => {
  const { categoryId } = useParams();
  const { addItemsToCart, cartItems } = React.useContext(CartContext);
  const [categoryData, setCategoryData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch(`/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data.data);
        setLoading(false);
      });
  }, [categoryId]);
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

  return loading ? (
    <LoadingWrapper>
      <LoadingGif src={loadingGif} />
    </LoadingWrapper>
  ) : (
    <Wrapper>
      <SubNav />
      <Container>
        {categoryData.map((item) => {
          return (
            <ProductWrap key={item.name}>
              <ItemLink to={`/products/${item._id}`}>
                <Img style={{ backgroundImage: `url(${item.imageSrc})` }}></Img>
                <ProductContent>
                  <h5>{item.name}</h5>
                </ProductContent>
              </ItemLink>
              <PriceAddRemove>
                <h4>{item.price}</h4>
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
      </Container>
    </Wrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LoadingGif = styled.img`
  margin: 15% auto;
  width: 75px;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: 
  align-content: space-around;
  flex-wrap: wrap;
  width: 75%;
  margin: 0 auto;
  margin-top: 50px;
`;

const ProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-repeat: no-repeat;
  align-items: center;
  position: relative;
  width: 31.2%;
  margin: 0 1%;
  margin-bottom: 25px;
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
  height: 100px;
`;

const PriceAddRemove = styled.div`
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

export default CategoryDisplay;
