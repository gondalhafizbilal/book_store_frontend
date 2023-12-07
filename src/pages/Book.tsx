import { useEffect, useState } from "react";
import BookItem from "../components/BookItem";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Book = () => {
  const [books, setBooks] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const pageSize = 2;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/books?page=${page}&page_size=${pageSize}`,
        {
          method: "GET",
        }
      );
      let parseData = await res.json();
      setTotalBooks(parseData.totalResults);
      setPage(page + 1);
      setBooks([...parseData.data]);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const fetchMoreData = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/books?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
      }
    );
    let { data } = await res.json();

    setPage(page + 1);
    setBooks((prevState: any) => [...prevState, ...data]);
  };
  return (
    <>
      <div className="container" style={{ paddingTop: "65px" }}>
        <div className="row">
          <div className="col-md-6 col-sm-4">
            <h2>Top - Selling Books</h2>
          </div>
          <div className="col-md-4 col-sm-8 text-end"></div>
        </div>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={books.length}
        next={fetchMoreData}
        hasMore={books.length < totalBooks}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {books.map((element: any, index: number) => {
              return (
                <div className="col-md-4 my-2" key={index}>
                  <BookItem
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

export default Book;
