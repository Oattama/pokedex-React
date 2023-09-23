import React, { useState } from "react";
import "./dataStyle.css";
import { fetchViewPokemon } from "../../API/Fetch";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Chart from "../../Component/Chart";

export default function DataPage() {
  const [form, setForm] = useState(false);

  const { name } = useParams();
  const { data, isLoading, isError } = useQuery("data", () =>
    fetchViewPokemon(name)
  );

  const changeForm = (onchange) => {
    if (onchange !== form) {
      setForm(!form);
    }
  };

  return (
    <div className="Data-container">
      {isLoading ? (
        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
      ) : isError ? (
        <p>Pokemon not found.</p>
      ) : (
        <div className="contentContainer">
          <div className="head">
            <p>#{data.result.id}</p>
            <p>{data.result.name}</p>
          </div>
          <div className="pokeImg">
            <img
              className={form ? "normal hide" : "normal"}
              src={
                data.result.sprites[0].default || "/images/icon/missingNo.png"
              }
              alt={data.result.name}
            />
            <img
              className={form ? "shiny" : "shiny hide"}
              src={data.result.sprites[0].shiny || "/images/icon/missingNo.png"}
              alt={data.result.name}
            />
            <div className="formBtn">
              <img
                src={data.result.sprites[0].default}
                alt={data.result.name}
                onClick={() => {
                  changeForm(false);
                }}
              />
              <img
                src={data.result.sprites[0].shiny}
                alt={data.result.name}
                onClick={() => {
                  changeForm(true);
                }}
              />
            </div>
          </div>
          <div className="Con">
            <div className="leftCon">
              <div className="typeCon">
                <p>Type:</p>
                {data.result.types.map((types, index) => {
                  return <p key={index}>{types.type.name}</p>;
                })}
              </div>
              <div className="abiCon">
                <p>ability:</p>
                <div className="abi">
                  {data.result.abilities.map((ability, index) => {
                    switch (ability.is_hidden) {
                      case true:
                        return (
                          <p key={index}>{ability.ability.name} (hidden)</p>
                        );

                      default:
                        return <p key={index}>{ability.ability.name}</p>;
                    }
                  })}
                </div>
              </div>
              <div className="bodyCon">
                <p>height: {data.result.height}</p>
                <p>weight: {data.result.weight}</p>
              </div>
              <div className="movesCon">
                <p>Moves</p>
                <div className="moves">
                  <div className="levelMoves">
                    <h3>level</h3>
                    {data.result.moves[0].levelMove.map((move, index) => {
                      return (
                        <div className="table">
                          <p className="move" key={index}>
                            {move.name}
                          </p>
                          <p className="level" key={index}>
                            {move.level}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="other">
                    <h3>other</h3>
                    {data.result.moves[0].otherMove.map((move, index) => {
                      return (
                        <div className="table">
                          <p className="move" key={index}>
                            {move.name}
                          </p>
                          <p className="level" key={index}>
                            {move.method}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="rightCon">
              <div className="statsCon">
                <p>stats</p>
                <Chart stat={data.result.stats} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
