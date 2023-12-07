import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
const NewsItem = (props: any) => {
  const { title, imgUrl, author, date, bookId, price, tag } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const placeOrder = async () => {
    const userData: string = localStorage.getItem("userData") || "";
    const customerId = JSON.parse(userData).id;

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id: bookId,
        customer_id: customerId,
        status: "confirmed",
      }),
    });
    // const rdata = await res.json();
    if (res.status === 200) {
      <Toast
        className="d-inline-block m-1"
        bg={"Success"}
        style={{ marginTop: 70 }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        </Toast.Header>
        <Toast.Body className={"text-white"}>
          Order has been placed successfully.
        </Toast.Body>
      </Toast>;
    } else {
      <Toast className="d-inline-block m-1" bg={"Warning"}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        </Toast.Header>
        <Toast.Body className={"text-white"}>
          Order has not been placed successfully.
        </Toast.Body>
      </Toast>;
    }
  };
  return (
    <div>
      <div className="card">
        <img
          src={
            !imgUrl
              ? "https://i.gadgets360cdn.com/large/spacex_reuters_1556260807227.JPG"
              : imgUrl
          }
          className="card-img-top"
          alt="..."
          style={{ height: "170px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">
            <Button variant="secondary">{tag}</Button>
          </p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toDateString()}
            </small>
          </p>
          <p>
            <small>{`$ ${price}.00`}</small>
          </p>
          <Button
            style={{ justifyContent: "right" }}
            variant="primary"
            onClick={handleShow}
          >
            Order
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Placing Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Would you like to purchase this book?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={async () => {
                  await placeOrder();
                  handleClose();
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
