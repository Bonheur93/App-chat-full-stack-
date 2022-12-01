import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import makeToast from '../Toaster';



const LoginPage = (props) => {
  const navigate = useNavigate();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = (props) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("https://bonheur-chat.onrender.com/user/login", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        navigate("/dashboard")
        localStorage.setItem("CC_Token", response.data.token);
        console.log(response.data);

        props.setupSocket();

      })
      .catch((err) => {
        console.log("erreur de la reponse");
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        );
      });
  };

  // const handleClick = () => {
  //   navigate("/dashboard")
  // };

  return (
    <div className='card'>
      <div className='cardHeader'>Login</div>
      <div className='cardBody'>
        <div className='inputGroup'>
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" id="email" placeholder='abc@exemple.com' ref={emailRef} />
        </div>
        <div className='inputGroup'>
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" id="password" placeholder='Votre mot de pass' ref={passwordRef} />
        </div>
        <button onClick={loginUser}>Login</button>


      </div>

    </div>
  );
};
export default LoginPage;
