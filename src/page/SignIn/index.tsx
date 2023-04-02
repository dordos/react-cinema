import React, { useCallback, useRef, useState } from 'react';
import { Form, Link, useNavigation } from 'react-router-dom';
import { logIn } from '../../api/firebase';
import useInput from '../../hooks/useInput';
import './style.scss';

const logo = require('../../img/logo.png');
const SignIn = () => {
  const navigate: any = useNavigation();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      logIn(email, password).then(() => {
        navigate('/');
      });
    },
    [email, password]
  );

  // focus Event
  const focusIn = (e: any) => {
    if (e.target.previousSibling.className == 'inputOffFocus' && e.target.value == '')
      e.target.previousSibling.className = 'inputOnFocus';
  };
  const focusOut = (e: any) => {
    if (e.target.value == '') {
      e.target.previousSibling.className = 'inputOffFocus';
    }
  };

  return (
    <div className='signIn'>
      <div className='signInContainer'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>

        <div className='signIn-title'>
          <h1>Sign In</h1>
        </div>

        <form onSubmit={onSubmit}>
          <div className='infoContainer'>
            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>이메일</span>
              <input type='email' name='email' onChange={setEmail} />
              <p>규칙에 맞는 이메일 주소를 입력해주세요</p>
            </label>

            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>비밀번호</span>
              <input type='password' name='password' onChange={setPassword} />
              <p>비밀번호는 8자리 이상으로 입력해주세요.</p>
            </label>

            <button type='submit'>로그인</button>
          </div>
        </form>

        <div className='suggestion'>
          <p>
            아직 회원이 아니신가요?
            <Link to='/SignUp'>
              <span>회원가입 하러가기</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
