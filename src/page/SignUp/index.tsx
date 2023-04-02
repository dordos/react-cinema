import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import './style.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/firebase';
import SignIn from '../SignIn';
const logo = require('../../img/logo.png');
const checkImg = require('../../img/check_icon.png');
const SignUp = () => {
  const [email, setEmail] = useState('');
  // const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  });
  // const [mismatchError, setMismatchError] = useState(false);
  // const [passwordLengthError, setPasswordLengthError] = useState(false);
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const isPasswordError = !isFocused.password && password.length <= 6;
  const isEmailError = !isFocused.email && !/^\S+@\S+\.\S+$/.test(email.trim());
  const isPasswordCheckError = !isFocused.passwordCheck && passwordCheck !== password;

  // const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setNickname(e.target.value);
  // }, []);

  // const onChangePassword = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     setPassword(e.target.value);
  //     setMismatchError(e.target.value === passwordCheck);
  //   },
  //   [setPasswordCheck, setPasswordLengthError]
  // );

  const passwordLength = (event: React.ChangeEvent<any>) => {
    const value = event.target.value;
    if (value.length <= 6) {
      setPassword(value);
    } else {
      setPassword(value);
    }
  };

  const onChangePasswordCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  }, []);

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpPage, setSignPage] = useState(true);

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setSignUpSuccess(true);
          setSignPage(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [auth, email, password]
  );

  // focus Event
  const focusIn = (e: any) => {
    // if (e.target.previousSibling.className == 'inputOffFocus' && e.target.value == '')
    //   e.target.previousSibling.className = 'inputOnFocus';

    const inputName = e.target.name;
    setIsFocused((prevState) => ({
      ...prevState,
      [inputName]: true,
    }));
  };
  const focusOut = (e: any) => {
    // if (e.target.value == '') {
    //   e.target.previousSibling.className = 'inputOffFocus';
    //   e.target.nextSibling.className = 'errorMessage';
    // }

    const inputName = e.target.name;
    setIsFocused((prevState) => ({
      ...prevState,
      [inputName]: false,
    }));
  };

  const SignUpSuccessPage = () => {
    return (
      <div className='SignUpSuccessPageContainer'>
        <img src={checkImg} alt='' />
        <h1>
          <span>회원가입</span>을 축하드립니다.
        </h1>
        <p>RETFLX에서 제공하는 모든 서비스를 이용할 수 있습니다.</p>
        <div>
          {/* <Link to='/SignIn'>
            <button className='signInBtn'>로그인 하러가기</button>
          </Link> */}
          <Link to='/'>
            <button className='homeBtn'>홈으로 이동</button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className='signUp'>
      <div className='signUpContainer'>
        {signUpSuccess && <SignUpSuccessPage />}
        {signUpPage && (
          <>
            <div className='logo'>
              <img src={logo} alt='' />
            </div>

            <div className='signUp-title'>
              <h1>Sign Up</h1>
            </div>
            <Form>
              <div className='infoContainer'>
                <label onFocus={focusIn} onBlur={focusOut}>
                  <span className='inputOffFocus'>이메일</span>
                  <input type='email' name='email' onChange={onChangeEmail} value={email} />
                  {isEmailError ? <p>규칙에 맞는 이메일 주소를 입력해주세요</p> : null}
                </label>

                <label onFocus={focusIn} onBlur={focusOut}>
                  <span className='inputOffFocus'>비밀번호</span>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={passwordLength}
                  />
                  {isPasswordError ? <p>비밀번호는 8자리 이상으로 입력해주세요.</p> : null}
                </label>

                <label onFocus={focusIn} onBlur={focusOut}>
                  <span className='inputOffFocus'>비밀번호 확인</span>
                  <input
                    type='password'
                    name='password-check'
                    value={passwordCheck}
                    onChange={onChangePasswordCheck}
                  />
                  {isPasswordCheckError ? (
                    <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
                  ) : null}
                </label>

                <button type='submit' onClick={onSubmit}>
                  회원가입
                </button>
                <Link to='/'>
                  <button className='homeBtn'>홈으로 가기</button>
                </Link>
              </div>
            </Form>
            <div className='suggestion'>
              {/* <p>
                이미 회원이신가요?
                <Link to='/SignIn'>
                  <span>로그인 하러가기</span>
                </Link>
              </p> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
