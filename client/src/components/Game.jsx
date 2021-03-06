import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import parseISO from 'date-fns/parseISO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import Stats from './Stats';
import logos from '../../dist/logos';

const Game = (props) => {
  const { game, slate } = props;

  const gameDate = parseISO(game.commence_time);
  const hour = gameDate.getHours();
  const minutes = gameDate.getMinutes();
  const day = gameDate.getDay();

  let displayHour;

  if (hour === 0) {
    displayHour = 12;
  } else if (hour > 12) {
    displayHour = hour - 12;
  } else {
    displayHour = hour;
  }

  let displayMinutes;

  if (minutes < 10) {
    displayMinutes = `0${minutes}`;
  } else {
    displayMinutes = minutes;
  }

  const timeText = `${displayHour}:${displayMinutes} ${
    hour < 12 ? 'AM' : 'PM'
  }`;

  let awayTeam = game.away_team.split(' ');
  if (game.away_team === 'Washington Football Team') {
    awayTeam = awayTeam[0];
  } else {
    awayTeam = awayTeam[awayTeam.length - 1];
  }

  let homeTeam = game.home_team.split(' ');
  if (game.home_team === 'Washington Football Team') {
    homeTeam = homeTeam[0];
  } else {
    homeTeam = homeTeam[homeTeam.length - 1];
  }

  return (
    <Row className="game-container d-flex align-items-center py-3 mx-auto mb-4">
      <Col xs={1} className="d-flex flex-column font-weight-bold">
        <span>{timeText}</span>
        {slate === 'primetime' && <span>{day === 0 ? 'Sun' : 'Mon'}</span>}
      </Col>
      <Col className="d-flex align-items-center justify-content-center py-4">
        <div className="team-info left">
          <span>{awayTeam}</span>
          <img
            className="logo left"
            src={logos[game.away_team]}
            alt={game.away_team}
          />
        </div>
        <FontAwesomeIcon icon={faAt} size="lg" className="at-sign" />
        <div className="team-info right">
          <img
            className="logo right"
            src={logos[game.home_team]}
            alt={game.home_team}
          />
          <span>{homeTeam}</span>
        </div>
      </Col>
      <Stats game={game} homeTeam={homeTeam} awayTeam={awayTeam} />
    </Row>
  );
};

export default Game;
