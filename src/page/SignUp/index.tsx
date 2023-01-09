import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import './style.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../../api/firebase';
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

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //     console.log(user);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    [email, nickname, password, passwordCheck]
  );

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [aniState, setAniState] = useState(false);

  //이메일 정규식
  const regEmail = (data: any) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
      data
    );
  };

  const focusState = (e: any) => {
    if (e.target.name == 'email' && e.target.value != '') {
      if (regEmail(e.target.value) === false) setSignUpSuccess(!signUpSuccess);
      // setAniState((state): any => {
      //   if (e.target.value != '') {
      //     return state;
      //   }
      //   return !state;
      // });
    }
  };

  const inFocus = (e: any) => {
    e.preventDefault();

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

  // const focusState = (e: any) => {
  //   e.target.previousSibling.className = 'inputOnFocus';
  // };

  // const offFocus = (e: any) => {
  // if ((e.target.value = '')) {
  // e.target.previousSibling.className = 'inputOffFocus';
  // }
  // };

  return (
    <div className='signUp'>
      <div className='signUpContainer'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>

        <Form onSubmit={onSubmit}>
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
              {signUpSuccess && <p>규칙에 맞는 이메일 주소를 입력해주세요</p>}
            </label>

            <label onFocus={inFocus} onBlur={outFocus}>
              <span>닉네임</span>
              <input type='text' name='nickname' value={nickname} onChange={onChangeNickname} />
            </label>

            <label onFocus={inFocus} onBlur={outFocus}>
              <span>비밀번호</span>
              <input type='password' name='password' value={password} onChange={onChangePassword} />
              <p>비밀번호는 8자리 이상으로 입력해주세요.</p>
            </label>

            <label>
              <span>비밀번호 확인</span>
              <input
                type='password'
                name='password-check'
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
            </label>

            <button type='submit'>회원가입</button>
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
