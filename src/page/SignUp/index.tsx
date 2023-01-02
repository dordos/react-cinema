import React from 'react';
import './style.scss';

const SingUp = () => {
  const logo = require('../../img/logo.png');
  return (
    <div className='signUp'>
      <div className='signUpContainer'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
        <div className='infoContainer'>
          <label>
            <span>이메일</span>
            <input type='email' />
          </label>
          <label>
            <span>닉네임</span>
            <input type='text' />
          </label>
          <label>
            <span>비밀번호</span>
            <input type='password' />
          </label>
          <label>
            <span>비밀번호 확인</span>
            <input type='password' />
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
