import React from 'react';
import axios from "axios";
import makeToast from "../Toaster";

const RegisterPage = () => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = (props) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;


    axios
      .post("http://localhost:8000/user/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        console.log(response.data);
        props.history.push("/login");
        // 
        // if(response.data.error == 200) {
        //   makeToast("error", err.response.data.error !== '');
        // } else {
        //   
        // }
         
      })
        .catch ((err) => {
        // console.log("erreur de la reponse");
          makeToast("error", err.response.data.message);
      });
};



return (
  <div className='card'>
    <div className='cardHeader'>Registration</div>
    <div className='cardBody'>
      <div className='inputGroup'>
        <label htmlFor='name'>Name</label>
        <input type="texte" name="name" id="name " placeholder='Votre nom' ref={nameRef} />
      </div>
      <label htmlFor='email'>Email</label>
      <input type="email" name="email" id="email" placeholder='abc@exemple.com' ref={emailRef} />
    </div>
    <div className='inputGroup'>
      <label htmlFor='password'>Password</label>
      <input type="password" name="password" id="password" placeholder='Votre mot de pass' ref={passwordRef} />
    </div>
    <button onClick={registerUser} >Register</button>

  </div>

);
};

export default RegisterPage
