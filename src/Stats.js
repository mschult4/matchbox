import React from 'react';
import { Link } from 'react-router-dom';

const Stats = () => (
  <div>
    Stats<br />
    <Link to="/boxers">Boxers</Link><br />
    <Link to="/spars">Spars</Link><br />
    <Link to="/signups">Signups</Link><br />
    <Link to="/bracket">Bracket</Link><br />
  </div>
)

export default Stats
