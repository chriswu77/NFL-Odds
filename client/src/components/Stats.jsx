import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import StatsRows from './StatsRows';

const Stats = (props) => {
  const { game, homeTeam, awayTeam } = props;

  return (
    <Col>
      <Table striped bordered hover size="sm" className="mb-0">
        <thead>
          <tr>
            <th />
            <th colSpan="4" className="text-center">
              {awayTeam}
            </th>
            <th colSpan="4" className="text-center">
              {homeTeam}
            </th>
          </tr>
          <tr>
            <th />
            <th className="text-center">Avg</th>
            <th className="text-center">Median</th>
            <th className="text-center">Min</th>
            <th className="text-center">Max</th>
            <th className="text-center">Avg</th>
            <th className="text-center">Median</th>
            <th className="text-center">Min</th>
            <th className="text-center">Max</th>
          </tr>
        </thead>
        <tbody>
          <StatsRows name="Over/Under" game={game} />
          <StatsRows name="Spread" game={game} />
          <StatsRows name="Moneyline" game={game} />
        </tbody>
      </Table>
    </Col>
  );
};

export default Stats;
