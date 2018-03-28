import React from 'react';
import { Link } from 'react-router-dom';

const Bracket = () => (
  <div>
    Bracket<br />
    <Link to="/boxers">Boxers</Link><br />
    <Link to="/spars">Spars</Link><br />
    <Link to="/signups">Signups</Link><br />
    <Link to="/stats">Stats</Link>
  </div>
)

export default Bracket
