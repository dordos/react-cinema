import React, { useCallback, useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import './style.scss';

const logo = require('../../img/logo.png');
const SignIn = () => {
  // focus Event
  const focusIn = (e: any) => {
    if (e.target.previousSibling.className == 'inputOffFocus' && e.target.value == '')
      e.target.previousSibling.className = 'inputOnFocus';
  };
  const focusOut = (e: any) => {
    if (e.target.value == '') {
      e.target.previousSibling.className = 'inputOffFocus';
      // e.target.nextSibling.className = 'errorMessage';
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

        <Form>
          <div className='infoContainer'>
            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>이메일</span>
              <input type='email' name='email' />
              <p>규칙에 맞는 이메일 주소를 입력해주세요</p>
            </label>

            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>비밀번호</span>
              <input type='password' name='password' />
              <p>비밀번호는 8자리 이상으로 입력해주세요.</p>
            </label>

            <button>로그인</button>
          </div>
        </Form>

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
