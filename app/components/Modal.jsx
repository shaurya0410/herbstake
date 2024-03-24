import React, { useState } from "react";
import "../Modal.css";

const Modal = ({ setModal, transact, user, type, getData }) => {
  const [amount, setAmount] = useState(0);
  const onChange = async (e) => {
    let val = e.target.value;
    // console.log(val,user.balance);
    if (type == "stake") {
      if (parseFloat(val) > user.balance) {
        val = user.balance;
      }
    } else if (type == "unstake") {
      let asset = user.staked_amount.split(" ");
      let amount = parseFloat(asset[0]);
      if (parseFloat(val) > amount) {
        val = amount;
      }
    } else if (type == "restake") {
      let asset = user.unstaked_amount.split(" ");
      let amount = parseFloat(asset[0]);
      if (parseFloat(val) > amount) {
        val = amount;
      }
    }
    setAmount(val);
  };
  return (
    <div className="modal_wrapper">
      <div className="modal_container">
        <span
          className="modal_close"
          onClick={() => {
            setModal(false);
          }}
        >
          X
        </span>
        <span className="modal_title">{type} HERB</span>
        <div className="modal_items">
          <form className="type_form">
            <div className="type_item">
              <input type="text" name="owner" value={user.owner} disabled />
            </div>
            {type != "claim" && (
              <div className="type_item">
                {type != "redeem" && (
                  <input
                    type="number"
                    name="quantity"
                    placeholder="quantity"
                    value={amount}
                    onChange={onChange}
                  />
                )}
              </div>
            )}
            <button
              type="button"
              className="btn"
              onClick={async () => {
                try {
                  let tx = await transact(user.owner, amount, type);
                  setModal(false);
                  if (tx.value != -1) {
                    alert(`${type} completed`);
                    getData(user.owner);
                  } else {
                    alert(tx.message);
                  }
                } catch (error) {
                  setModal(false);
                  alert(error);
                }
              }}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
