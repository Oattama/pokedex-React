import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Favorite from "./Favorite";

const CardStyle = styled.div`
  border: solid 1px;
  padding: 20px 0;
  border-radius: 20px;
  max-width: 300px;

  .headCon {
    display: flex;
    padding: 0 20px;
    margin: 0 0 15px 0;
    justify-content: space-between;
  }

  .img {
    padding: 10px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .img.active {
    pointer-events: none;
  }

  @media only screen and (max-width: 400px) {
    .img {
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
`;

export default function Card({ item }) {
  const token = localStorage.getItem("token");
  const [disable, setDisable] = useState(false);

  const favoriteHandle = (id) => {
    if (id !== undefined) {
      if (token !== null) {
        return <Favorite key={id} id={id} />;
      }
    } else {
      return null;
    }
  };

  const disableHandle = () => {
    if (item.id === undefined) {
      setDisable(!disable);
    }
  };

  useEffect(() => {
    disableHandle();
  }, []);

  return (
    <CardStyle>
      <div className="headCon">
        <p>{item.id}</p>
        <div className="favorite">{favoriteHandle(item.id)}</div>
      </div>

      <Link
        className={disable ? "img active" : ""}
        to={`/DataPage/${item.name}`}
      >
        <div className="img">
          <img
            src={item.sprites || "/images/icon/missingNo.png"}
            alt={item.name}
          />
        </div>
      </Link>
      <div className="text">
        <p>{item.name}</p>
      </div>
    </CardStyle>
  );
}
