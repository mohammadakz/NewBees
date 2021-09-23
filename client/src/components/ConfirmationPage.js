import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import styled from 'styled-components';
import CartContext from './Hooks/Cart/CartContext';

const ConfirmationPage = () => {
    const { cartItems, removeItemsFromCart, updateCart } = React.useContext(
        CartContext
      );
    const { user, isAuthenticated } = useAuth0();
    console.log(cartItems)
    React.useEffect(() => {
        if (isAuthenticated) {
            const userEmail = user.email;
            fetch('/getcart', {
                method: 'POST',
                body: JSON.stringify({ email: userEmail}),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then(res => res.json())
                .then(data => updateCart(data.data))
        }
    }, [user])

    return (isAuthenticated &&
        <Wrapper>
            <Message>
                Thank you {user.given_name} for your purchase!
            </Message>
            <ItemWrapper>
                {cartItems.map((item, index) => {
                    return (
                        <ItemBox>
                            <img style={{ maxWidth: '30%' }} src={item.imageSrc} />
                            <ItemInfo>
                                <h4>{item.name}</h4>
                                <h3>{item.price}</h3>
                            </ItemInfo>
                        </ItemBox>
                    )
                })
                }
            </ItemWrapper>
        </Wrapper>


    )
}

export default ConfirmationPage;

const ItemInfo = styled.div`

`;

const Message = styled.div`

`;

const ItemWrapper = styled.div`
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
`;

const ItemBox = styled.div`
    display: flex;
    margin-top: 10%;
`;