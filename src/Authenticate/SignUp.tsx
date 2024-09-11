import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Nav, P, Title, Wrapper } from "../components/Auth-Component/Auth-Component";

interface FieldValues {
  email: string;
  userName: string;
  userId: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const { handleSubmit, formState: { errors }, register, setError } = useForm<FieldValues>({
    defaultValues: {
      email: '@naver.com'
    }
  });
  const navigate = useNavigate();

  const validate = async (data: FieldValues) => {
    if (data.password !== data.passwordConfirm) {
      setError('passwordConfirm', {
        message: 'password have to same'
      }, {
        shouldFocus: true,
      });
      return;
    };
    const response = await axios.post('http://localhost:3001/signUp', data);
    const responseData = response.data;
    if (!responseData) {
      //서버에서 이미 한번 확인을해서 이 코드가 실행될 일은 없다.
      setError('userId', {
        message: '이미 가입한 계정이래요.'
      }, {
        shouldFocus: true,
      })
    } else if (responseData) {
      navigate('/signIn');
    }
  }
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(validate)}>
        <Input {...register('email', {
          required: 'Email is required!',
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: 'Only @naver.com is allowed',
          }
        })}
          placeholder="이메일"
          type="email"
        />
        <P>{errors.email?.message}</P>
        <Input {...register('userName', {
          required: 'Name is required!',

        })}
          placeholder="이름" />
        <P>{errors.userName?.message}</P>
        <Input {...register('userId', {
          required: 'ID is required!',
          validate: {
            areadyHas: async (value) => {
              const response = await axios.get(`http://localhost:3000/users?userId=${value}`);
              const user = response.data[0];
              return user ? 'already have this ID!' : true;
            }
          }
        })}
          placeholder="아이디" />
        <P>{errors.userId?.message}</P>
        <Input {...register('password',
          {
            required: 'write Here!',
            minLength: {
              value: 5,
              message: 'Your password is too short',
            }
          })}
          placeholder="비밀번호"
          type="password"
        />
        <P>{errors.password?.message}</P>
        <Input {...register('passwordConfirm', {
          required: 'write Here!',
          minLength: 5,
        })}
          placeholder="비밀번호 확인"
          type="password"
        />
        <Button>회원가입</Button>
      </Form>
      <Nav>Are you have an account? <Link to={'/signIn'}>로그인 &rarr;</Link> </Nav>
    </Wrapper>
  );
}