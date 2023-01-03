import React, { useCallback, useRef, useState } from 'react';
import useInput from '../../hooks/useInput';
import './style.scss';

const logo = require('../../img/logo.png');
const SingUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useInput('');

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [aniState, setAniState] = useState(false);

  const focusState = (e: any, select: any) => {
    setAniState((state: boolean | undefined): any => {
      if (e.target.value != '') {
        return state;
      }
      return !state;
    });
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
        <div className='infoContainer'>
          <label>
            <span
              className={aniState && 'email' ? 'inputOnFocus' : 'inputOffFocus'}
            >
              이메일
            </span>
            <input
              type='email'
              onFocus={(e) => {
                focusState(e, 'email');
              }}
              onBlur={(e) => {
                focusState(e, '');
              }}
              onChange={onChangeEmail}
              value={email}
            />
            {signUpSuccess && <p>규칙에 맞는 이메일 주소를 입력해주세요</p>}
          </label>

          <label>
            <span className={aniState ? 'inputOnFocus' : 'inputOffFocus'}>
              닉네임
            </span>
            <input type='text' />
          </label>

          <label>
            <span className={aniState ? 'inputOnFocus' : 'inputOffFocus'}>
              비밀번호
            </span>
            <input
              type='password'
              value={password}
              onChange={onChangePassword}
            />
            <p>비밀번호는 8자리 이상으로 입력해주세요.</p>
          </label>

          <label>
            <span className={aniState ? 'inputOnFocus' : 'inputOffFocus'}>
              비밀번호 확인
            </span>
            <input
              type='password'
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
          </label>

          <button>회원가입</button>
        </div>
        <div className='suggestion'>
          <p>
            이미 회원이신가요? <span>로그인 하러가기</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
