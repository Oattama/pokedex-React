import React, { useState } from "react";
import "./SignInStyle.css";
import { fetchLogin } from "../../API/Fetch";

export default function SignInPage({ open, onclose }) {
  const [input, setInput] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchLogin(input.email, input.password)
      .then((res) => {
        console.log(res.result);
        if (res.result.status !== true) {
          alert(res.result.msg);
        } else {
          localStorage.setItem("token", res.result.Token);
          window.location.reload();
        }
      })
      .catch((err) => {
        return err;
      });
  };

  if (!open) return null;

  return (
    <div className="PopupCon">
      <div className="bg" onClick={onclose} />
      <div className="InnerPopup">
        <i className="fa fa-times" aria-hidden="true" onClick={onclose} />
        <div className="topic">
          <p>Logo</p>
          <h1>SignIn</h1>
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
          <button className="btnSignIn" type="submit">
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
}
