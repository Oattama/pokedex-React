import React, { useState } from "react";
import styled from "styled-components";

const SearchBarStyle = styled.div`
  padding: 0 auto;
  display: flex;
  justify-content: center;

  .inputText {
    padding: 9px 15px 5px 0;
  }

  .btn {
    margin: 5px 0;
  }

  .fa-search {
    padding: 5px;
    font-size: 1.2rem;
  }
`;

export default function SearchBar() {
  const [input, setInput] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {};

  return (
    <SearchBarStyle>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="keyword"
          className="inputText"
          placeholder="Search"
          value={input.keyword || ""}
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    </SearchBarStyle>
  );
}
