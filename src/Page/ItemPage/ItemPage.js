import React from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import "./itemStyle.css";

import { fetchItem } from "../../API/Fetch";

import Card from "../../Component/Card";

export default function ItemPage() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery("item", fetchItem, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return false;
      },
    });

  return (
    <div className="Item-Container">
      {isLoading ? (
        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
      ) : isError ? (
        <p>Item not found</p>
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
              page.result.map((item, index) => <Card key={index} item={item} />)
            )}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
