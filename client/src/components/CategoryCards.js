import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CategoryContext } from "./CategoryContext";
import CategoryDisplay from "./CategoryDisplay";
import { categories } from "./categoryObject";

const CategoryCards = ({ categoryName }) => {
  const { categorySelected, setCategorySelected, isSelected, setIsSelected } = React.useContext(CategoryContext);

  console.log(categorySelected, 'hit');

  const handleClick = (category) => {
    setCategorySelected(category);
    setIsSelected(true);
  }
  return categories.map((category, index) => {
    console.log(category.imgSrc);
    return (
    <Wrapper to={`/categories/${category.name}`}>
        <img src={category.imgSrc} style={{'height':'150px'}}/>
        <name>{category.name}</name>
    </Wrapper>
    )
  })
};

export default CategoryCards;

const Wrapper = styled(Link)`
  text-decoration: none;
  color: initial;
  cursor: pointer;
`;