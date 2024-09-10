import styled from "styled-components";
import { CartList as BIM, Count } from "../ProductDetail";
import { Label } from "./HeaderCart";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartListAndCheckedList, setCartList, setCheckedList, State } from "../../App";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 1fr;
  place-items: center;
  border: 1px #c4c4c4 solid;
  border-radius: 10px;
  height: 200px;
  position: relative;
  & input[type='checkbox']{
    display: none;
  }
`;

const Img = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  &>div:first-child{
    font-size: 12px;
    color:#767676;
  }
  &>div:nth-child(2),&>div:nth-child(3){
    font-size: 15px;
  }
  &>div:last-child{
    font-size: 14px;
    color:#767676;
  }
`;

const Order = styled.div`
  width: 130px;
  height: 40px;
  background-color: #19ce60;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  border-radius: 5px;
  color:white;
  cursor: pointer;
`;

const Delete = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export interface CheckedList {
  checked: boolean;
  id: number
};

export default function CartList({ id, name, price, provider, image, count }: BIM) {
  const dispatch = useDispatch();
  const cartList = useSelector((state: State) => state.openMarket.cartList);
  const cartItem = cartList.find(cartItem => cartItem.id === id)!;
  const checkedList = useSelector((state: State) => state.openMarket.checkedList);

  const handleCount = (oper: string) => {
    if (oper === '+') {
      const newCartItem = { ...cartItem, count: 1 };
      dispatch(setCartList(newCartItem));
    } else {
      if (count === 1) return;
      const newCartItem = { ...cartItem, count: -1 };
      dispatch(setCartList(newCartItem));
    }
  }
  console.log('CartList.tsx', checkedList);
  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      dispatch(setCheckedList({ checked: true, id }));
    } else {
      dispatch(setCheckedList({ checked: false, id }));
    }
  };

  const handleClick = () => {

    dispatch(deleteCartListAndCheckedList(id))
  }


  return (
    <Wrapper>
      <Label htmlFor={String(id)} checked={checkedList.includes(id)} />
      <input id={String(id)} type="checkbox" onChange={handleChecked} checked={checkedList.includes(id)} />
      <ProductInfo>
        <Img src={image} />
        <Info>
          <div>{provider}</div>
          <div>{name}</div>
          <div>{price}원</div>
          <div>택배배송 / 무료배송</div>
        </Info>
      </ProductInfo>
      <Count>{count}
        <img src='/images/icon-minus-line.svg' onClick={() => handleCount('-')} />
        <img src='/images/icon-plus-line.svg' onClick={() => handleCount('+')} />
      </Count>
      <Order>
        주문하기
      </Order>
      <Delete src="/images/icon-delete.svg" onClick={handleClick}></Delete>
    </Wrapper>
  );
}