import React from "react";

const StakingLevel = () => {
  return (
    // <div className="staking_level_box">
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Staking Level</th>
    //         <th>Mining Multiplier</th>
    //         <th>Credit Discount</th>
    //         <th>HERB Staked</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>1</td>
    //         <td>1.05x</td>
    //         <td>5%</td>
    //         <td>5,000</td>
    //       </tr>
    //       <tr>
    //         <td>2</td>
    //         <td>1.1x</td>
    //         <td>10%</td>
    //         <td>10,000</td>
    //       </tr>
    //       <tr>
    //         <td>3</td>
    //         <td>1.25x</td>
    //         <td>25%</td>
    //         <td>25,000</td>
    //       </tr>
    //       <tr>
    //         <td>4</td>
    //         <td>1.5x</td>
    //         <td>50%</td>
    //         <td>50,000</td>
    //       </tr>
    //       <tr>
    //         <td>5</td>
    //         <td>2x</td>
    //         <td>free</td>
    //         <td>100,000</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>
    <div className="staking_level_box">
    <table>
      <thead>
        <tr>
          <th>Perks</th>
          <th>T1</th>
          <th>T2</th>
          <th>T3</th>
          <th>T4</th>
          <th>T5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>HERB Staked</th>
          <td>2.5k</td>
          <td>5k</td>
          <td>10k</td>
          <td>17.5k</td>
          <td>25k</td>
        </tr>
        <tr>
          <th>Mining Multiplier</th>
          <td>1.05x</td>
          <td>1.1x</td>
          <td>1.2x</td>
          <td>1.35x</td>
          <td>1.5x</td>
        </tr>
        <tr>
        <th>Credit Discount</th>
          <td>5%</td>
          <td>10%</td>
          <td>20%</td>
          <td>35%</td>
          <td>50%</td>
        </tr>
        <tr>
        <th>Free Withdraw</th>
          <td>No</td>
          <td>yes</td>
          <td>yes</td>
          <td>yes</td>
          <td>yes</td>
        </tr>
        {/* <tr>
          <th>Listing Discount</th>
          <td>0%</td>
          <td>5%</td>
          <td>10%</td>
          <td>25%</td>
        </tr> */}
      </tbody>
    </table>
  </div>
  );
};

export default StakingLevel;
