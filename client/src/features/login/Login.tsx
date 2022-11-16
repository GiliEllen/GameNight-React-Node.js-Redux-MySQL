import React from "react";
import axios from "axios";

export const Login = () => {
  const handleLogin = async (ev: any) => {
    try {
      ev.preventDefault();
      const email = ev.target.email.value;
      const password = ev.target.password.value;

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(data);
      const { userArray } = data;

      if (userArray.length === 0) {
        console.log("no user found");
      } else if(userArray.length > 0) {
        console.log("user found!")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Enter Email Here" />
        <input
          type="password"
          name="password"
          placeholder="Enter Password Here"
        />
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};
