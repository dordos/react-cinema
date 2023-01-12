import React, { useCallback, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import SingUp from '../../page/SignUp';
import './style.scss';

const LogInModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const onSubmit = useCallback(
  //   (e: React.FormEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //   },
  //   [email, password]
  // );

  return (
    <div className='logInModal'>
      {/* <Form onSubmit={onSubmit}> */}
      <div className='logInContainer'>
        <input type='email' placeholder='이메일' />
        <input
          type='password'
          placeholder='비밀번호'
          // onChange={setPassword}
        />
        <button>로그인</button>
        <div>
          <p>
            계정이 없으신가요?
            <Link to='/SignUp'>
              <span>회원가입</span>
            </Link>
          </p>
        </div>
      </div>
      {/* </Form> */}
    </div>
  );
};

export default LogInModal;
