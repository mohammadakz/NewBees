import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router";
import PlusIcon from "../assets/plus_icon.svg";
import MinusIcon from "../assets/minus_icon.svg";
import loadingGif from "../assets/loading.gif";
import CartContext from "./Hooks/Cart/CartContext";

const CategoryDisplay = () => {
  const { categoryId } = useParams();
  const { addItemsToCart, cartItems } = React.useContext(CartContext);
  const [categoryData, setCategoryData] = React.useState();
  const [loaded, setLoaded] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetch(`/products/categories/${categoryId}`)
      .then(res => res.json())
      .then(data => {
        setCategoryData(data.data);
        setLoaded(true);
      })
  }, [])
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

  return !loaded ? (
    <LoadingGif src={loadingGif} />
  ) : (
    <Wrapper>
      {categoryData.map((item) => {
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
    </Wrapper>
  );
};


const LoadingGif = styled.img`
  margin: auto;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const ProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-repeat: no-repeat;
  align-items: center;
  position: relative;
  width: 25%;
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


export default CategoryDisplay;