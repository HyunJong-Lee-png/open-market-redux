import styled from "styled-components";
import { Product as Pro } from "../App";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:90%;
  gap: 15px;
`;

const ProductImg = styled.img`
 width: 100%;
 aspect-ratio: 1 / 1;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
`;

const ProductProvider = styled.div`
  color:#767676;
`;

const ProductName = styled.div`
  font-size: 18px;
`;

const ProductPrice = styled.span`
 &>span:first-child{
  font-size: 24px;
  font-weight: bold;
 }
`;

export default function Product({ id, image, price, provider, name }: Pro) {

  return (
    <Wrapper>
      <Link to={`/product/${id}`}>
        <ProductImg src={image} />
      </Link>
      <ProductProvider>{provider}</ProductProvider>
      <ProductName>{name}</ProductName>
      <ProductPrice><span>{price.toLocaleString()}</span><span>원</span></ProductPrice>
    </Wrapper>

  );
}