import { Modal, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../Styles/BillsPage.css";
import { EyeOutlined } from "@ant-design/icons";
const BillsPage = () => {
  const [billsData, setBillsData] = useState(null);

  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/bills/get-bills"
      );
      setBillsData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  }, []);
  console.log(billsData);
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Number</th>
            <th>Total Price</th>
            <th>Payment Mode</th>
            <th>Items Bought</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billsData?.map((item) => (
            <tr>
              <td>{item.customerName}</td>
              <td>{item.customerNumber}</td>
              <td>{item.totalPrice}</td>
              <td>{item.paymentMode}</td>
              <td>{item.ItemsInCart.map((i)=>i.name).toString()}</td>
              <td>
                <EyeOutlined
                  className="actionEye"
                  onClick={() => {
                    setSelectedBill(item);
                    setPopupModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {console.log(selectedBill)}
      <Modal
        title="Invoice Details"
        visible={popupModal}
        onCancel={() => setPopupModal(false)}
        footer={false}
      >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDaWosONS_6N1ISdAzWgl2aBLfIu33rmH_eA&usqp=CAU" alt="error"/>
        <h1>CASHIE</h1>
        <p>Contact: 123456 | Gandhinagar Gujurat</p>
        <div>Customer Name: {selectedBill?.customerName}</div>
				<div>Phone No.: {selectedBill?.customerNumber}</div>
        <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>  
          {
            selectedBill?.ItemsInCart?.map((item) => {
             return  <tr>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{`${item.qty*item.price}`}</td>
            </tr>
          })
          }
        </tbody>
      </table>
      </Modal>
    </div>
  );
};

export default BillsPage;
