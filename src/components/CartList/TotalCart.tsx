import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../../App";

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    background-color: #f2f2f2;
    height: 150px;
    &>div:last-child{
      font-weight: bold;
      &>div:first-child{
        font-weight: bold;
      }
      &>div:last-child{
        color: red;
        font-size: 36px;
        font-weight: bold;
      }
    }
`;

const TotalFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  font-size: 16px;
  &>div:last-child{
    font-size: 24px;
  }
`;

const TotalImoge = styled.div`
  background-color: #ffffff;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusImg = styled.div`
  background: url('/images/icon-plus-line.svg');
  width: 20px;
  height: 20px;
`;

const MinusImg = styled.div`
 background: url('/images/icon-minus-line.svg');
 width: 20px;
 height: 20px;
`;

export default function TotalCart() {
  const checkedList = useSelector((state: State) => state.openMarket.checkedList);
  const cartList = useSelector((state:State) => state.openMarket.cartList);
  const reconstructedList = cartList.filter(cartItem => checkedList.includes(cartItem.id));

  return (
    <TotalPrice>
      <TotalFlex>
        <div>총상품금액</div>
        <div>{(reconstructedList.reduce((prev, cur) => prev + (cur.price) * (cur.count), 0)).toLocaleString()}</div>
      </TotalFlex>
      <TotalImoge>
        <MinusImg />
      </TotalImoge>
      <TotalFlex>
        <div>상품 할인</div>
        <div>
          <span>0</span>
          <span>원</span>
        </div>
      </TotalFlex>
      <TotalImoge>
        <PlusImg />
      </TotalImoge>
      <TotalFlex>
        <div>배송비</div>
        <div>
          <span>0</span>
          <span>원</span>
        </div>
      </TotalFlex>
      <TotalFlex>
        <div>결제예정금액</div>
        <div>{(reconstructedList.reduce((prev, cur) => prev + (cur.price) * (cur.count), 0)).toLocaleString()}</div>
      </TotalFlex>
    </TotalPrice>
  );

}