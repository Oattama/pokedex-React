import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import "./mainStyle.css";

import { fetchPokemon } from "../../API/Fetch";

import Card from "../../Component/Card";
import SearchBar from "../../Component/SearchBar";

export default function MainPage() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery("pokemon", fetchPokemon, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return false;
      },
    });

  return (
    <div className="main-container">
      <SearchBar />
      {isLoading ? (
        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
      ) : isError ? (
        <p>Pokemon not found.</p>
      ) : (
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          loader={
            <i
              className="fa fa-spinner fa-spin fa-3x fa-fw"
              aria-hidden="true"
            ></i>
          }
        >
          <div className="grid-con">
            {data.pages.map((page) =>
              page.result.map((pokemon) => (
                <Card key={pokemon.id} item={pokemon} />
              ))
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
