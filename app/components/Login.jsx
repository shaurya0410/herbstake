"use client";
import React from "react";
import "../Login.css";
const identifier = "stake.herb";
const Login = ({
  setLoginModal,
  setWallet,
  getData,
  setIsUser,
  link,
  setSession,
  wax,
}) => {
  return (
    <div className="login_wrapper">
      <div className="login_box">
        <span
          className="login_close"
          onClick={() => {
            setLoginModal(false);
          }}
        >
          X
        </span>
        <h2 className="wallet_heading">Select Wallet</h2>
        <button
          className="cw"
          onClick={async () => {
            try {
              const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
              if (isAutoLoginAvailable) {
                setIsUser(true);
                // alert(`${wax.userAccount} connected`);
                getData(wax.userAccount);
                setWallet("wax");
                setLoginModal(false);
              } else {
                const nonce = identifier;
                await wax.login(nonce);
                if (wax.proofVerified) {
                  setIsUser(true);
                  // alert(`${userAccount} connected`);
                  getData(wax.userAccount);
                  setWallet("wax");
                  setLoginModal(false);
                }
              }
            } catch (error) {
              return;
            }
          }}
        >
          {" "}
          ☁️ CLOUD WALLET
        </button>
        <button
          type="button"
          className="aw"
          onClick={async () => {
            // Perform the login, which returns the users identity
            // Save the session within your
            try {
              link
                .login(identifier)
                .then((result) => {
                  setSession(result.session);
                  setIsUser(true);
                  getData(result.session.auth.actor);
                  setWallet("anchor");
                  setLoginModal(false);
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          ⚓ ANCHOR
        </button>
      </div>
    </div>
  );
};

export default Login;
