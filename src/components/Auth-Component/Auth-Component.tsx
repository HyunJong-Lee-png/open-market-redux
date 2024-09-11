import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const Title = styled.div`
  font-size: 50px;
  color:#06D001;
  font-weight: bold;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: 1px green solid;
`;

export const Button = styled.button`
  background-color:#06D001;
  border: none;
  border-radius: 5px;
  padding: 10px 0;
`;

export const Nav = styled.div`
  text-align: center;
  color: #80AF81;
  font-weight: 600;
  margin-top: 10px;
  &>a{
    margin-left: 10px;
    color:inherit;
    font-size: 14px;
  }
`;

export const P = styled.p`
  color:tomato;
`;