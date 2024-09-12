import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setLoginUI, State } from "../App";
import axios from "axios";

const Wrapper = styled.div`
  height: 90px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  align-items: center;
  position: relative;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`;

const HeaderIcon = styled.img`
  width: 124px;
  height: 38px;
  margin-left: 100px;
`;

const HeaderSearch = styled.form`
  border: 2px #06D001 solid;
  border-radius: 50px;
  max-width: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderInput = styled.input`
  border-radius: 100%;
  padding: 13px 22px;
  outline: none;
  border: none;
  font-size: 16px;
  flex: 1;
`;

const HeaderButton = styled.button`
  display: none;
`;

const HeaderLabel = styled.label`
  background-image: url('/images/icon-search.svg');
  background-size: cover;
  width: 19px;
  height: 19px;
  margin-right: 13px;
  cursor: pointer;
`;

const HeaderImoge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  position: absolute;
  right: 15%;
`;

const RedDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: tomato;
  border-radius: 50%;
  text-align: center;
  line-height: 15px;
  position: absolute;
  top: 0;
  right: 0;
  color:white;
`;

const Img = styled.img`
  width: 32px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  cursor:default;
  &>span:first-child{
    color:#CD5C08;
  }
  &>span>span,&>span:last-child{
    font-size: 12px;
    color:black;
  }
`;


export default function Header() {
  const cartList = useSelector((state: State) => state.openMarket.cartList);
  const loginUI = useSelector((state: State) => state.openMarket.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    const response = (await axios.post('http://localhost:3001/logout', {}, { withCredentials: true })).data;
    if(response.success){
      dispatch(setLoginUI({}));
    }
  }

  return (
    <Wrapper>
      <Link to={'/'}><HeaderIcon src="/images/logo.png" /></Link>
      <HeaderSearch>
        <HeaderInput placeholder="상품을 검색해보세요!" />
        <HeaderLabel />
        <HeaderButton id="button" />
      </HeaderSearch>
      <HeaderImoge style={{ right: '21%' }} onClick={() => navigate('/cart')}>
        <Img src="/images/icon-shopping-cart.svg" />
        <span>장바구니</span>
        {cartList.length ? <RedDot>{cartList.length}</RedDot> : null}
      </HeaderImoge>
      {Object.keys(loginUI).length ?
        <HeaderImoge style={{ right: '13%' }}>
          <LoginWrapper>
            <span>{loginUI.userName}
              <span>님</span>
            </span>
            <span>어서오세요!</span>
            <button onClick={handleSignOut}>로그아웃</button>
          </LoginWrapper>

        </HeaderImoge> :
        <HeaderImoge onClick={() => navigate('/signIn')}>
          <Img src="/images/icon-user.svg" />
          <span>로그인</span>
        </HeaderImoge>
      }
      <HeaderImoge style={{ right: '8%' }} onClick={() => navigate('/signUp')}>
        <Img src="/images/icon-signup.svg" />
        <span>회원가입</span>
      </HeaderImoge>
    </Wrapper>
  );
}