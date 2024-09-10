import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPriceProducts, State } from "../App";
import Product from "./Product";

const EventBanner = styled.img`
  width: 100%;
  height: 500px;
  margin-bottom: 80px;
`;

const Option = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  gap: 20px;
  &>span{
    cursor: pointer;
  }
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minMax(380px,1fr));
  gap: 70px;
  place-items: center;
  margin-top: 35px;
`;

export default function Home() {
  const products = useSelector((state: State) => state.openMarket.products);
  const dispatch = useDispatch();

  const handlePrice = (price: string) => {
    if (price === 'row') {
      dispatch(setPriceProducts('row'));
    } else if (price === 'high') {
      dispatch(setPriceProducts('high'));
    } else {
      dispatch(setPriceProducts('latest'));
    }
  }
  return (
    <>
      <EventBanner src="/images/event.png" />
      <Option>
        <span onClick={() => handlePrice('latest')}>최신순</span>
        <span onClick={() => handlePrice('row')}>낮은가격</span>
        <span onClick={() => handlePrice('high')}>높은가격</span>
      </Option>
      <ProductWrapper>
        {products.map(product => <Product key={product.id} {...product} />)}
      </ProductWrapper>
    </>

  );
}