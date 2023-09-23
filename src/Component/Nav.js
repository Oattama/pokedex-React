import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import MiniProfile from "./MiniProfile";

const Navigation = styled.header`
  z-index: 1px;
  height: 100px;
  padding: 0 40px;
  background: #c00707;

  .sticky {
    position: sticky;
    top: 0;
  }

  .nav-con {
    display: flex;
    justify-content: space-between;
  }

  .logo {
    padding: 35px 0;
    a {
      font-size: 1.5rem;
      color: #fff;
      text-decoration: none;
    }
  }

  .fa-bars {
    display: none;
  }

  .menu ul {
    display: flex;
    padding: 35px 0;
    li {
      list-style: none;
      padding: 5px 30px;
      border-radius: 10px;

      &:hover {
        color: #c00707;
        background-color: #fff;
      }
    }
    a {
      font-size: 1.2rem;
      color: #fff;
      text-decoration: none;
    }
  }

  .btnFav {
    pointer-events: none;
    color: #aeaeae !important;
  }

  @media only screen and (max-width: 750px) {
    position: absolute;
    min-width: 40px;
    height: auto;
    height: 100vh;

    .fa-bars {
      display: block;
      positon: relative;
      left: 0;
      padding: 15px 0;
      font-size: 1.5rem;
      color: #fff;
      cursor: pointer;
    }

    .menu {
      ul {
          display: block;
          li {
            padding: 20px 20px;
            margin: 10px 0 30px 0;
          }
      }
    }

    .nav-con {
      display: none;
    }

    .nav-con.active {
      display: block;
  }

  @media only screen and (max-width: 400px) {
    min-width: 10px;

    .fa-bars {
      font-size: 1rem;
    }

    .menu {
      ul {
        li {
          font-size: 1rem;
        }
      }
    }

    .profile {
      li {
        a {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default function Nav() {
  const [sideBar, setSideBar] = useState(false);
  const [disable, setDisable] = useState(false);
  const token = localStorage.getItem("token");

  const disableActive = () => {
    if (token == null) {
      setDisable(!disable);
    }
  };

  const showSideBar = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    disableActive();
  }, []);

  return (
    <Navigation>
      <i className="fa fa-bars" aria-hidden="true" onClick={showSideBar}></i>
      <div className={sideBar ? "nav-con active" : "nav-con"}>
        <div className="logo">
          <NavLink reloadDocument activeClassName="Active" to="/">
            <a>Logo</a>
          </NavLink>
        </div>
        <div className="menu">
          <ul>
            <NavLink reloadDocument activeClassName="Active" to="/">
              <li>Pokemon</li>
            </NavLink>
            <NavLink
              activeClassName="Active"
              to="/itemPage"
              onClick={showSideBar}
            >
              <li>Item</li>
            </NavLink>
            <NavLink
              className={disable ? "btnFav" : ""}
              activeClassName="Active"
              to="/favorite"
              onClick={showSideBar}
            >
              <li>Favorite</li>
            </NavLink>
          </ul>
        </div>
        <MiniProfile className="profile" />
      </div>
    </Navigation>
  );
}
