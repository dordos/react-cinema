import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { User } from '@firebase/auth';
import useInput from '../../hooks/useInput';
import './style.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../../api/firebase';
import { EventEmitter } from 'stream';
import { stringLength } from '@firebase/util';
import SignIn from '../SignIn';
const logo = require('../../img/logo.png');

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  }, []);

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value === passwordCheck);
    },
    [setPasswordCheck]
  );

  const onChangePasswordCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  }, []);

  // async function onSubmit() {
  //   // e.preventDefault();
  //   return createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [auth, email, password]
  );
  const [signUpState, setSignUpState] = useState();

  // async function onSubmit() {
  //   return createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // const handleLogin = () => {
  //   // onSubmit().then(setSignUpState);
  // };

  const [signUpError, setSignUpError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  //이메일 정규식
  const regEmail = (data: any) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    return regex.test(data);
  };

  // focus Event
  const focusIn = (e: any) => {
    if (e.target.previousSibling.className == 'inputOffFocus' && e.target.value == '')
      e.target.previousSibling.className = 'inputOnFocus';
  };
  const focusOut = (e: any) => {
    if (e.target.value == '') {
      e.target.previousSibling.className = 'inputOffFocus';
      e.target.nextSibling.className = 'errorMessage';
    }
  };

  return (
    <div className='signUp'>
      <div className='signUpContainer'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>

        <div className='signUp-title'>
          <h1>Sign Up</h1>
        </div>
        {signUpState && <div>ddd</div>}
        <Form>
          <div className='infoContainer'>
            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>이메일</span>
              <input type='email' name='email' onChange={onChangeEmail} value={email} />
              <p>규칙에 맞는 이메일 주소를 입력해주세요</p>
            </label>

            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>닉네임</span>
              <input type='text' name='nickname' value={nickname} onChange={onChangeNickname} />
              <p>규칙에 맞는 이메일 주소를 입력해주세요</p>
            </label>

            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>비밀번호</span>
              <input type='password' name='password' value={password} onChange={onChangePassword} />
              <p>비밀번호는 8자리 이상으로 입력해주세요.</p>
            </label>

            <label onFocus={focusIn} onBlur={focusOut}>
              <span className='inputOffFocus'>비밀번호 확인</span>
              <input
                type='password'
                name='password-check'
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
            </label>

            <button type='submit' onClick={onSubmit}>
              회원가입
            </button>
          </div>
        </Form>

        <div className='suggestion'>
          <p>
            이미 회원이신가요?
            <Link to='/SignIn'>
              <span>로그인 하러가기</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
