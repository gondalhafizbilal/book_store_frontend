import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const News = (props: any) => {
  const [articles, setArticles] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [endScroll, setEndScroll] = useState(false);
  const [source, setSource] = useState("");

  const [topHeading, setTopHeading] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(4);

  const updateNews = async () => {
    props.setProgress(10);
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/books?page=${page}&page_size=${totalResults}`,
      {
        method: "GET",
      }
    );
    let { data } = await res.json();
    if (data.length == 0) {
      setEndScroll(true);
    } else {
      setLoading(true);
      props.setProgress(30);
      setPage(page + 1);
      props.setProgress(70);
      setArticles([...data]);
      setLoading(false);
      props.setProgress(100);
    }
  };
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchMoreData = async () => {
    console.log("fetch More dt");
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/books?page=${page}&page_size=${totalResults}`,
      {
        method: "GET",
      }
    );
    let { data } = await res.json();
    if (data.length === 0) {
      setEndScroll(true);
    } else {
      props.setProgress(10);

      setPage(page + 1);
      setArticles((prevState: any) => [...prevState, ...data]);

      props.setProgress(100);
    }
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "65px" }}>
        <div className="row">
          <div className="col-md-6 col-sm-4">
            <h2>Top - {capitalizeFirstLetter(topHeading)} News</h2>
          </div>
          <div className="col-md-4 col-sm-8 text-end"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!endScroll}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element: any, index: number) => {
              return (
                <div className="col-md-4 my-2" key={index}>
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 50) : "Unknown ..."
                    }
                    imgUrl={element.cover_image}
                    author={element.writer}
                    date={element.createdAt}
                    bookId={element.id}
                    price={element.points}
                    tag={element.tag}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
