import React, { useState } from "react";

const GiftCode = ({ code }) => {
  
  const [copied, setCopied] = useState(false);
  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className="giftcode_box">
        <input type="text" value={code} disabled placeholder="..." />
        <button
          className="copybtn"
          onClick={() => {
            handleCopy(code);
          }}
          disabled={!code}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </>
  );
};

export default GiftCode;
