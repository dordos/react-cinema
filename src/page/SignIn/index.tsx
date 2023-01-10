import React, { useCallback, useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import './style.scss';

const logo = require('../../img/logo.png');
const SignIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useInput('');

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [aniState, setAniState] = useState([false, false, false, false]);

  const focusState = (e: any) => {
    setAniState((state): any => {
      if (e.target.value != '') {
        return state;
      }
      return !state;
    });
  };

  const inFocus = (e: any) => {
    e.preventDefault();

    // console.log(e);
    // if (
    //   (e.target.name == 'nickname' &&
    //     e.target.previousSibling.className == '') ||
    //   e.target.previousSibling.className == 'inputOffFocus'
    // ) {
    //   e.target.previousSibling.className = 'inputOnFocus';
    // }
  };

  const outFocus = (e: any) => {
    // if (
    //   e.target.name == 'nickname' &&
    //   e.target.value == '' &&
    //   e.target.previousSibling.className == 'inputOnFocus'
    // ) {
    //   e.target.previousSibling.className = 'inputOffFocus';
    // }
  };

  const onChangePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);
    },
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  // surbmit
  const onsSubmit = () => {};

  // const focusState = (e: any) => {
  //   e.target.previousSibling.className = 'inputOnFocus';
  // };

  // const offFocus = (e: any) => {
  // if ((e.target.value = '')) {
  // e.target.previousSibling.className = 'inputOffFocus';
  // }
  // };

  return (
    <div className='signIn'>
      <div className='signInContainer'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>

        <div className='signIn-title'>
          <h1>Sign In</h1>
        </div>

        <Form onSubmit={onsSubmit}>
          <div className='infoContainer'>
            <label>
              <span>이메일</span>
              <input
                type='email'
                name='email'
                onFocus={focusState}
                onBlur={focusState}
                onChange={onChangeEmail}
                value={email}
              />
              <p>규칙에 맞는 이메일 주소를 입력해주세요</p>
            </label>

            <label onFocus={inFocus} onBlur={outFocus}>
              <span>비밀번호</span>
              <input type='password' name='password' value={password} onChange={onChangePassword} />
              <p>비밀번호는 8자리 이상으로 입력해주세요.</p>
            </label>

            <button>회원가입</button>
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
