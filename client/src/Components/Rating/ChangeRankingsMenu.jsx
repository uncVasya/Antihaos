import React from 'react';
import { Link } from 'react-router-dom';
import './Rankings.css';

function ChangeRankingsMenu() {
  return (
    <ul>
      {/* <div className="menu-wrapper">
        <div className="menu-item-wrapper">
          <li>
            <Link to="/rankings/solo"><img className="menu-img" src="/images/1v1.jpeg" alt="Rating" /></Link>
          </li>
        </div>
        <div className="menu-item-wrapper">
          <li>
            <Link to="/rankings/duo"><img className="menu-img" src="/images/2v2.jpeg" alt="Rating" /></Link>
          </li>
        </div>
      </div> */}
      <div className="menu-wrapper">
        <div className="menu-item-wrapper">

          <Link to="/rankings/solo"><button type="submit" className="change-ranking-btn">1 vs 1</button></Link>

        </div>
        <div className="menu-item-wrapper">

          <Link to="/rankings/duo"><button type="submit" className="change-ranking-btn">2 vs 2</button></Link>

        </div>
      </div>
    </ul>
  );
}

export default ChangeRankingsMenu;
