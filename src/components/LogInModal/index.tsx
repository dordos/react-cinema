import React, { useCallback, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import SingUp from '../../page/SignUp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './style.scss';
import useInput from '../../hooks/useInput';
import LogOutModal from '../LogOutModal';

const LogInModal = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const [user, setUser] = useState(true);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      login();
      setUser(true);
    },
    [email, password]
  );

  const auth = getAuth();
  async function login() {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    });
  }

  return (
    <LogOutModal />
    // <div className='logInModal'>
    //   <div className='logInContainer'>
    //     <form onSubmit={onSubmit}>
    //       <input type='email' placeholder='이메일' onChange={setEmail} />
    //       <input type='password' placeholder='비밀번호' onChange={setPassword} />
    //       <button type='submit'>로그인</button>
    //     </form>
    //     <div>
    //       <p>
    //         계정이 없으신가요?
    //         <Link to='/SignUp'>
    //           <span>회원가입</span>
    //         </Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LogInModal;
