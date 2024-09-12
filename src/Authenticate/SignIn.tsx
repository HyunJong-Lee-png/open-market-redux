import { useForm } from "react-hook-form";
import { Button, Form, Input, Nav, P, Title, Wrapper } from "../components/Auth-Component/Auth-Component";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginUI } from "../App";

interface FieldValues {
  userId: string;
  password: string;
}

export default function SignIn() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FieldValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = async (data: FieldValues) => {
    const response = await axios.get(`http://localhost:3000/users?userId=${data.userId}`);
    const user = response.data[0];
    if (!user) {
      setError('userId', {
        message: '없는 아이디 입니다. 계정을 생성하세요.'
      });
      return;
    }
    const respon = await axios.post('http://localhost:3001/signIn', data, { withCredentials: true });
    const responData = respon.data;
    if (responData) {
      dispatch(setLoginUI(responData));
      navigate('/');
    }
  }

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(validate)}>
        <Input {...register('userId', {
          required: 'ID is required!',
        })}
          placeholder="아이디" />
        <P>{errors.userId?.message}</P>
        <Input {...register('password', {
          required: 'write Here!',
        })}
          placeholder="비밀번호"
          type="password" />
        <P>{errors.password?.message}</P>
        <Button>로그인</Button>
      </Form>
      <Nav>Are you haven't an account? <Link to={'/signUp'}>회원가입 &rarr;</Link> </Nav>
    </Wrapper>

  );
}