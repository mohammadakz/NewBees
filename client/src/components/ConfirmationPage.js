import React from 'react';
import styled from 'styled-components';
import CartContext from './Hooks/Cart/CartContext';

const ConfirmationPage = () => {
    
    const { cartItems } = React.useContext(CartContext);
    return (
        <Wrapper>
            {cartItems.map((item, index) => {
                return (
                    <ItemBox>
                        <img style={{maxWidth: '10%' }} src={item.imageSrc} />
                        <h4>{item.name}</h4>
                        <h3>{item.price}</h3>
                    </ItemBox>
                )
            })
            }
        </Wrapper>

    )
}

export default ConfirmationPage;

const Wrapper = styled.div`

`;

const ItemBox = styled.div`

`;