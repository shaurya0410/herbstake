import React from "react";
import "./Vote.css";
const VotePage = () => {
  return (
    <div>
      <h2 className="dao_heading">HERB DAO</h2>
      <div className="dao_note">
        <h3>NOTE:</h3>
        <ul>
          <li>
            Each staked HERB token represents the right to vote on proposals.
          </li>
          <li>Each staked HERB token equals one vote.</li>
          <li>For a proposal to pass:</li>
          <ul>
            <li>
              At least 51% of the votes must be in favor of the winning choice.
            </li>
            <li>There must be a minimum of 150,000 votes.</li>
          </ul>
          <li>Each proposal voting period lasts for three days.</li>
        </ul>
      </div>
      <div className="dao_proposals">
        <h2>Propsals</h2>
        <div className="dao_proposal_items">
          <h3 className="proposal_title">#1 title</h3>
          <div className="proposal_time">
            <small>start-date</small>
            <small>end-date</small>
          </div>
          <p className="proposal_description">description</p>
          <div className="proposal_options">
            <span>option 1</span>
            <span>option 2</span>
            <span>option 3</span>
          </div>
          <button className="vote_btn">vote</button>
        </div>
      </div>
    </div>
  );
};

export default VotePage;
