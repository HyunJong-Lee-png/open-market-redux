import styled from "styled-components";
import HeaderCart from "../CartList/HeaderCart";
import TotalCart from "../CartList/TotalCart";
import { useSelector } from "react-redux";
import { State } from "../../App";
import CartList from "../CartList/CartList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 95%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 32px;
  padding: 54px 0;
  text-align: center;
`;


export default function Cart() {
  const cartList = useSelector((state: State) => state.openMarket.cartList);
  return (
    <>
      <Title>장바구니</Title>
      <Wrapper>
        <HeaderCart />
        {cartList.map(carItem => <CartList key={carItem.id} {...carItem}/>) }
        <TotalCart />
      </Wrapper>
    </>
  );
}