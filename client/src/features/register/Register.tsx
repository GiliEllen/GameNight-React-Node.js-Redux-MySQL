import React, { useState } from 'react';
import axios from "axios";

export const Register = () => {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [input, setInput] = useState({
        password: '',
        rePassword: ''
      });
     
      const [error, setError] = useState({
        password: '',
        rePassword: ''
      })
     
      function onInputChange (e:React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(e);
      }
     
      function validateInput (e:React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj:any = { ...prev, [name]: "" };
       
          switch (name) {
       
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (input.rePassword && value !== input.rePassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["rePassword"] = input.rePassword ? "" : error.rePassword;
              }
              break;
       
            case "rePassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
       
            default:
              break;
          }
       
          return stateObj;
        });
      }
    const handleLogin = async (ev:any) => {
        try {
            ev.preventDefault();
            const firstName = ev.target.first_name.value;
            const lastName = ev.target.last_name.value;
            const email = ev.target.email.value;
            const password = ev.target.password.value;
            const rePassword = ev.target.rePassword.value;


            const {data} = await axios.post("/api/users/register", {firstName, lastName, email, password, rePassword})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <form onSubmit={handleLogin}>
            <input type="text" name="first_name" placeholder='Enter Your name'/>
            <input type="text" name="last_name" placeholder='Enter Your last name'/>
            <input type="email" name="email" placeholder='Enter Your Email'/>
            <input onBlur={validateInput} onChange={onInputChange} value={input.password} type="password" name="password" placeholder='Enter Your Password'/>
            {error.password && <span className='err'>{error.password}</span>}
            <input value={input.rePassword} onChange={onInputChange} onBlur={validateInput} type="password" name="rePassword" placeholder='Repeat Your Password'/>
            {error.rePassword && <span className='err'>{error.rePassword}</span>}
            <button type="submit">SIGN UP</button>
      </form>
  </div>
  )
}
