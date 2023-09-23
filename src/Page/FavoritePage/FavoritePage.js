import React from "react";
import { useInfiniteQuery } from "react-query";
import { listFavPokemon } from "../../API/Fetch";
import InfiniteScroll from "react-infinite-scroller";

import Card from "../../Component/Card";

export default function FavoritePage() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery("favorite", listFavPokemon, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return false;
      },
    });

  return (
    <div className="Fav-container">
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
