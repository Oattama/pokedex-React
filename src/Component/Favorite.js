import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addFavPokemon, getFavPokemon } from "../API/Fetch";

const FavoriteStyle = styled.div`
  .fa-heart-o {
    color: #c00707;
    font-size: 1.2em;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
  .fa-heart {
    color: #c00707;
    font-size: 1.2em;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export default function Favorite({ id }) {
  const [favActive, setFavActive] = useState(false);

  const checkActive = () => {
    setFavActive(!favActive);
  };

  const addFavorite = () => {
    addFavPokemon(id).then(() => {
      getFavPokemon()
        .then((res) => {
          const list = res.result;
          const number = !!list.find((item) => item === id);
          if (number === true) {
            checkActive();
          } else {
            checkActive();
          }
        })
        .catch((err) => {
          return err;
        });
    });
  };

  useEffect(() => {
    getFavPokemon()
      .then((res) => {
        const list = res.result;
        const number = !!list.find((item) => item === id);
        if (number === true) {
          checkActive();
        }
      })
      .catch((err) => {
        return err;
      });
  }, [id]);

  return (
    <FavoriteStyle>
      <i
        className={favActive ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
        onClick={() => {
          addFavorite();
        }}
      ></i>
    </FavoriteStyle>
  );
}
