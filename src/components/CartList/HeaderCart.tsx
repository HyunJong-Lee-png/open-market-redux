import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fullCheckedList, resetCheckedList, State } from "../../App";

const AllCartInfo = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  border-radius: 10px;
  &>input{
   display: none;
  }
`;

export const Label = styled.label<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #19ce60;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.checked) {
      return '#19ce60';
    }
    return '#ffffff';
  }};
`;


export default function HeaderCart() {
  const cartList = useSelector((state: State) => state.openMarket.cartList);
  const checkedList = useSelector((state: State) => state.openMarket.checkedList);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      dispatch(fullCheckedList());
    } else {
      dispatch(resetCheckedList());
    }
  }
  return (
    <AllCartInfo>
      <Label htmlFor="checkbox" checked={checkedList.length > 0 && (cartList.length === checkedList.length)} />
      <input id="checkbox" type="checkbox" onChange={handleChange} checked={checkedList.length > 0 && (cartList.length === checkedList.length)} />
      <span>상품정보</span>
      <span>수량</span>
      <span>상품금액</span>
    </AllCartInfo>
  );
}