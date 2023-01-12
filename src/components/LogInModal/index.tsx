import React, { useCallback, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import SingUp from '../../page/SignUp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './style.scss';
import useInput from '../../hooks/useInput';

const LogInModal = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmit = useCallback(() => {}, [email, password]);

  const auth = getAuth();
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    });
  };
  const handler = () => {};
  const handleLogin = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') login();
  };
  return (
    <div className='logInModal'>
      {/* <Form onSubmit={onSubmit}> */}
      <div className='logInContainer'>
        <Form onKeyDown={onSubmit}>
          <input type='email' placeholder='이메일' onChange={setEmail} />
          <input type='password' placeholder='비밀번호' onChange={setPassword} />
          <button onClick={login}>로그인</button>
        </Form>
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
