import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const Stats = (props) => {
  const { game, homeTeam, awayTeam } = props;

  return (
    <Col>
      <Table striped bordered hover size="sm" className="mb-0">
        <thead>
          <tr>
            <th />
            <th colSpan="4" className="text-center">{homeTeam}</th>
            <th colSpan="4" className="text-center">{awayTeam}</th>
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
          <tr>
            <td>Over/Under</td>
            <td className="text-center">{game.homeStats.over_under.avg}</td>
            <td className="text-center">{game.homeStats.over_under.median}</td>
            <td className="text-center">{game.homeStats.over_under.min}</td>
            <td className="text-center">{game.homeStats.over_under.max}</td>
            <td className="text-center">{game.awayStats.over_under.avg}</td>
            <td className="text-center">{game.awayStats.over_under.median}</td>
            <td className="text-center">{game.awayStats.over_under.min}</td>
            <td className="text-center">{game.awayStats.over_under.max}</td>
          </tr>
          <tr>
            <td>Spread</td>
            <td className="text-center">{game.homeStats.spread.avg}</td>
            <td className="text-center">{game.homeStats.spread.median}</td>
            <td className="text-center">{game.homeStats.spread.min}</td>
            <td className="text-center">{game.homeStats.spread.max}</td>
            <td className="text-center">{game.awayStats.spread.avg}</td>
            <td className="text-center">{game.awayStats.spread.median}</td>
            <td className="text-center">{game.awayStats.spread.min}</td>
            <td className="text-center">{game.awayStats.spread.max}</td>
          </tr>
          <tr>
            <td>Moneyline</td>
            <td className="text-center">{game.homeStats.money_line.avg}</td>
            <td className="text-center">{game.homeStats.money_line.median}</td>
            <td className="text-center">{game.homeStats.money_line.min}</td>
            <td className="text-center">{game.homeStats.money_line.max}</td>
            <td className="text-center">{game.awayStats.money_line.avg}</td>
            <td className="text-center">{game.awayStats.money_line.median}</td>
            <td className="text-center">{game.awayStats.money_line.min}</td>
            <td className="text-center">{game.awayStats.money_line.max}</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );
};

export default Stats;
