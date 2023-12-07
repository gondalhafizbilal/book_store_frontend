import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { AlertData } from "../types/alertTypes";
const BookItem = (props: any) => {
  const { title, imgUrl, author, date, bookId, price, tag } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>();
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);
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
    const alertObj: AlertData = {
      status: "",
      message: "",
    };
    const rdata = await res.json();
    if (res.status === 200) {
      alertObj.status = "success";
    } else {
      alertObj.status = "danger";
    }
    alertObj.message = rdata.message;
    setAlert(true);
    setAlertData(alertObj);
  };
  return (
    <div>
      {alert && (
        <Alert
          key={alertData && alertData.status}
          variant={alertData && alertData.status}
        >
          {alertData && alertData.message}
        </Alert>
      )}
      <div className="card">
        <img
          src={imgUrl}
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

export default BookItem;
