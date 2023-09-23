import React, { useState } from "react";
import { fetchLogin, fetchRegister } from "../../API/Fetch";

export default function SingUpPage({ open, onclose }) {
  const [input, setInput] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.password !== input.confirmPassword) {
      alert("Password not match!!!");
    } else {
      await fetchRegister(input.email, input.username, input.password).then(
        (res) => {
          if (res.result.status !== true) {
            alert(res.result.msg);
          } else {
            fetchLogin(input.email, input.password)
              .then((res) => {
                localStorage.setItem("token", res.result.Token);
                window.location.reload();
              })
              .catch((err) => {
                return err;
              });
          }
        }
      );
    }
  };

  if (!open) return null;

  return (
    <div className="PopupCon">
      <div className="bg" onClick={onclose} />
      <div className="InnerPopup">
        <i className="fa fa-times" aria-hidden="true" onClick={onclose} />
        <div className="topic">
          <p>Logo</p>
          <h1>SignUp</h1>
        </div>
        <form className="input" onSubmit={handleSubmit}>
          <div className="formInput">
            <i className="fa fa-envelope" aria-hidden="true" />
            <input
              name="email"
              required
              type="email"
              className="emailInput"
              placeholder="Email"
              value={input.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <i className="fa fa-user" aria-hidden="true" />
            <input
              name="username"
              required
              type="username"
              className="usernameInput"
              placeholder="Username"
              value={input.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <i className="fa fa-lock" aria-hidden="true" />
            <input
              name="password"
              required
              type="password"
              className="passwordInput"
              placeholder="Password"
              value={input.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="formInput">
            <i className="fa fa-lock" aria-hidden="true" />
            <input
              name="confirmPassword"
              required
              type="password"
              className="confirmPasswordInput"
              placeholder="confirmPassword"
              value={input.confirmPassword || ""}
              onChange={handleChange}
            />
          </div>
          <button className="btnSignIn" type="submit">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
