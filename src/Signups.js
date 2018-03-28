import React from 'react';
import { Link } from 'react-router-dom';

const Signups = () => (
  <div>
    Signups<br />
    <Link to="/boxers">Boxers</Link><br />
    <Link to="/spars">Spars</Link><br />
    <Link to="/bracket">Bracket</Link><br />
    <Link to="/stats">Stats</Link>
  </div>
)

export default Signups
