import React from 'react';
import Category from './CategoryCards';

export const CategoryContext = React.createContext(null);

export const CategoryProvider = ({children}) => {
    const [categorySelected, setCategorySelected] = React.useState();
    const [isSelected, setIsSelected] = React.useState(false);

    return(
        <CategoryContext.Provider
            value = {{
                categorySelected,
                setCategorySelected,
                isSelected,
                setIsSelected
            }}>
                {children}
        </CategoryContext.Provider>
    )
}