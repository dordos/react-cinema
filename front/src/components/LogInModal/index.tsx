import React, { useCallback, useState } from 'react';
import { Form } from 'react-router-dom';
import './style.scss';

const LogInModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
    },
    [email, password]
  );

  return (
    <div className='logInModal'>
      <Form onSubmit={onSubmit}>
        <div className='logInContainer'>
          <input
            type='email'
            placeholder='이메일'
            value={email}
            onChange={setEmail}
          />
          <input
            type='password'
            placeholder='비밀번호'
            onChange={setPassword}
          />
          <button>로그인</button>
          <div>
            <p>
              계정이 없으신가요? <span>회원가입</span>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LogInModal;
