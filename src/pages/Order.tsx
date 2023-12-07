import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { AlertData } from "../types/alertTypes";
import { OrderData } from "../types/orderTypes";
export default function Order() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [reload, setReload] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);
  useEffect(() => {
    const userData: string = localStorage.getItem("userData") || "";
    const customerId = JSON.parse(userData).id;
    const getOrder = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/orders?customer_id=${customerId}`,
        {
          method: "GET",
        }
      );
      const { data } = await res.json();
      setOrders(data);
    };
    getOrder();
    setReload(false);
  }, [reload]);

  const handleOrderCancel = async (id: number) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      }
    );
    const alertObj: AlertData = {
      status: "",
      message: "",
    };
    if (res.status === 200) {
      alertObj.status = "success";
    } else {
      alertObj.status = "danger";
    }
    const { message } = await res.json();
    alertObj.message = message;
    setAlert(true);
    setAlertData(alertObj);
    setReload(true);
  };

  return (
    <div className="container" style={{ marginTop: "85px" }}>
      {alert && (
        <Alert
          key={alertData && alertData.status}
          variant={alertData && alertData.status}
        >
          {alertData && alertData.message}
        </Alert>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Cover Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order: OrderData, index: number) => {
              const id: number = order.id;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.title}</td>
                  <td>{order.writer}</td>
                  <td>{order.points}</td>
                  <td>
                    <img
                      src={order.cover_image}
                      alt="..."
                      style={{ height: "170px" }}
                    />
                  </td>
                  <td>
                    <Button
                      variant={
                        order.status === "confirmed" ? "primary" : "secondary"
                      }
                      disabled={order.status !== "confirmed"}
                      onClick={() => {
                        setOrderId(id);
                        handleShow();
                      }}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

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
              handleOrderCancel(orderId);
              handleClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
