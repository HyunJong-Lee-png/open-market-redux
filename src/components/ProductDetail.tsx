import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Product, setCartList, State } from "../App";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
 
  margin-top: 80px;
`;

const ProductImg = styled.img`
  border-radius: 10px;
  margin-right: 50px;
  width: 40%;
  aspect-ratio: 1/1;
  place-self: center;
`;

const ProductInfo = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
`;

const ProductProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  &>div:first-child{
    color:#767676;  
  }
  &>div:nth-child(2),&>div:last-child{
    font-size: 36px;
  }
`;

const ProductDelivery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color:#767676;
`;

export const Count = styled.div`
  position: relative;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  text-align: center;
  width: 150px;
  height: 50px;
  line-height: 50px;
  &>img:first-child,&>img:last-child{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  &>img:first-child{
    left: 10px;
  }
  &>img:last-child{
    right: 10px;
  }
`;

const ProductTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-top: 30px;
  &>div:first-child{  
    font-weight: 500;
  };
  &>div:last-child{
    &>span:first-child{
      margin-right: 10px;
      color:#767676;
      &>span{
        color:#19ce60;
      }
    };
   &>span:last-child{
    font-size: 36px;
    color:#19ce60;
    &>span{
      font-size: 16px;
    }
    &::before{
      content: '';
      background-color: #d3d5d7;
      width: 1px;
      height: 19px;
      display: inline-block;
      margin-right: 10px;
    }
   }
  }
`;

const ProductChoice = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  color: white;
  margin-top: 30px;
  &>div:first-child,&>div:last-child{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    height: 60px;
    font-weight: 700;
    cursor: pointer;
  }
  &>div:first-child{
    background-color:#19ce60;
    flex: 2;
  }
  &>div:last-child{
    background-color: #767676;
    flex: 1;
  }
`;

export interface CartList extends Product {
  count: number;
}

export default function ProductDetail() {
  const { id } = useParams();
  const products = useSelector((state: State) => state.openMarket.products);
  const product = products.find(product => product.id === (id && parseInt(id)));
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const handleCount = (oper: string) => {
    if (oper === '-') {
      setCount((prev) => prev + 1);
    } else {
      count === 0 ? setCount(0) : setCount(prev => prev - 1);
    }
  };

  const handleCart = () => {
    const newCart = product ? { ...product, count } : undefined;
    newCart && dispatch(setCartList(newCart));
  }
  return (
    <Wrapper>
      <ProductImg src={product?.image} />
      <ProductInfo>
        <ProductProfile>
          <div>{product?.provider}</div>
          <div>{product?.name}</div>
          <div>{(product?.price)?.toLocaleString()}원</div>
        </ProductProfile>
        <ProductDelivery>
          <div>택배배송/무료배송</div>
          <hr></hr>
          <Count>{count}
            <img src='/images/icon-minus-line.svg' onClick={() => handleCount('+')} />
            <img src='/images/icon-plus-line.svg' onClick={() => handleCount('-')} />
          </Count>
          <hr></hr>
        </ProductDelivery>
        <ProductTotalPrice>
          <div>총 상품 금액</div>
          <div>
            <span>총 수량 <span>{count}개</span></span>
            <span>{((product?.price ?? 0) * count).toLocaleString()}<span>원</span></span>
          </div>
        </ProductTotalPrice>
        <ProductChoice>
          <div>바로 구매</div>
          <div onClick={handleCart}>장바구니</div>
        </ProductChoice>
      </ProductInfo>
    </Wrapper>

  );
}