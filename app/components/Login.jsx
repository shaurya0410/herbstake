"use client";
import React from "react";
import "../Login.css";
const identifier = "stake.herb";
const Login = ({
  setLoginModal,
  setWallet,
  getData,
  setUser,
  setIsUser,
  link,
  setSession,
  wax,
}) => {
  // console.log(typeof getData);
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
          type="button"
          className="cw"
          onClick={async () => {
            try {
              const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
              if (isAutoLoginAvailable) {
                setIsUser(true);
                // alert(`${wax.userAccount} connected`);
                // getData(wax.userAccount);
                if (typeof getData === "function") {
                  getData(wax.userAccount);
                }
                setWallet("wax");
                // setUser(wax.userAccount);
                setUser((previous_obj) => ({
                  ...previous_obj,
                  owner: wax.userAccount,
                }));

                setLoginModal(false);
              } else {
                const nonce = identifier;
                await wax.login(nonce);
                if (wax.proofVerified) {
                  setIsUser(true);
                  // alert(`${userAccount} connected`);
                  // getData(wax.userAccount);
                  setWallet("wax");
                  if (typeof getData === "function") {
                    getData(wax.userAccount);
                  }
                  // setUser(wax.userAccount);
                  setUser((previous_obj) => ({
                    ...previous_obj,
                    owner: wax.userAccount,
                  }));
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
                  // getData(result.session.auth.actor);
                  setWallet("anchor");
                  if (typeof getData === "function") {
                    getData(result.session.auth.actor);
                  }
                  // setUser(result.session.auth.actor);
                  setUser((previous_obj) => ({
                    ...previous_obj,
                    owner: result.session.auth.actor,
                  }));
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
