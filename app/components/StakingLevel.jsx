import React from "react";

const StakingLevel = () => {
  return (
    <div className="staking_level_box">
      <table>
        <thead>
          <tr>
            <th>Staking Level</th>
            <th>Mining Multiplier</th>
            <th>Credit Discount</th>
            <th>HERB Staked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1.05x</td>
            <td>5%</td>
            <td>5,000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>1.1x</td>
            <td>10%</td>
            <td>10,000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>1.25x</td>
            <td>25%</td>
            <td>25,000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>1.05x</td>
            <td>50%</td>
            <td>50,000</td>
          </tr>
          <tr>
            <td>5</td>
            <td>2x</td>
            <td>free</td>
            <td>100,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StakingLevel;
