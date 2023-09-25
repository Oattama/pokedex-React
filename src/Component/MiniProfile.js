import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignInPage from "../Page/SignInPage/SignInPage";
import { fetchUser } from "../API/Fetch";
import SingUpPage from "../Page/SingUpPage/SingUpPage";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;

  .btnCon {
    padding: 20px 0;
    ul {
      display: flex;

      li {
        list-style: none;
        padding: 10px 10px;
        margin: 10px 2px;
        color: #fff;
        font-size: 1.1em;
        cursor: pointer;

        &:hover {
          opacity: 0.9;
        }
      }
    }
    .btnSignIn {
      background-color: #17ba00;
      border-radius: 5px;
      pointer-event: none !important;
    }
    .btnSignUp {
      background-color: #037bd4;
      border-radius: 5px;
      pointer-event: none !important;
    }
  }

  .btnCon.active {
    display: none;
  }

  .profile {
    display: none;
    p {
      color: #fff;
      font-size: 1rem;
      letter-spacing: 0.4px;
    }
  }

  .profile.active {
    display: block;
  }

  .btnSignOut {
    margin: 5px 0;
    padding: 10px;
    background-color: #ffb128;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ffa200;
    }
  }

  @media only screen and (max-width: 750px) {
    display: block;
    justify-content: center;
    text-align: center;
    .btnCon {
      ul {
        display: block;
      }
    }
    .profile {
      padding: 0;
    }
    .btnSignOut {
      margin: 20px 0;
    }
  }
`;

export default function MiniProfile() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSingUp, setOpenSignUP] = useState(false);
  const [active, setActive] = useState(false);
  let navigate = useNavigate();

  const handleOpen = (type) => {
    if (type !== "signIn") {
      setOpenSignUP(!openSingUp);
    } else {
      setOpenSignIn(!openSignIn);
    }
  };

  const handleActive = () => {
    if (token !== null) {
      setActive(!active);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    handleActive();
    if (token !== null) {
      fetchUser()
        .then((res) => setUser(res.result.data))
        .catch((err) => {
          return err;
        });
    }
  }, []);

  return (
    <Container>
      <div className={active ? "btnCon active" : "btnCon"}>
        <ul>
          <li className="btnSignIn" onClick={() => handleOpen("signIn")}>
            SignIn
          </li>
          <SignInPage open={openSignIn} onclose={() => setOpenSignIn(false)} />
          <li className="btnSignUp" onClick={() => handleOpen("signUp")}>
            SignUp
          </li>
          <SingUpPage open={openSingUp} onclose={() => setOpenSignUP(false)} />
        </ul>
      </div>
      <div className={active ? "profile active" : "profile"}>
        <ul>
          <p>{user.uId || "error"}</p>
          <p>{user.username || "error"}</p>
        </ul>
        <p className="btnSignOut" onClick={() => handleSignOut()}>
          SignOut
        </p>
      </div>
    </Container>
  );
}
