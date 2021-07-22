import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import parseISO from 'date-fns/parseISO';
import { motion } from 'framer-motion';
import Game from './Game';

const Slate = (props) => {
  const { name, games, isLoading } = props;

  const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  const monthMap = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  const gameDate = parseISO(games[0].commence_time);
  const calendarDay = gameDate.getDate();
  const day = gameDate.getDay();
  const month = gameDate.getMonth();

  let slateText;

  if (name === 'thurs' || name === 'sat') {
    slateText = `${dayMap[day]} - ${monthMap[month]} ${calendarDay}`;
  } else if (name === 'sunMorning') {
    slateText = `${dayMap[day]} Morning - ${monthMap[month]} ${calendarDay}`;
  } else if (name === 'sunAfternoon') {
    slateText = `${dayMap[day]} 1pm - ${monthMap[month]} ${calendarDay}`;
  } else if (name === 'sunEvening') {
    slateText = `${dayMap[day]} 4pm - ${monthMap[month]} ${calendarDay}`;
  } else if (name === 'primetime') {
    const game2Date = parseISO(games[1].commence_time);
    const calendarDay2 = game2Date.getDate();
    const month2 = game2Date.getMonth();

    if (gameDate < game2Date) {
      slateText = `Primetime - ${monthMap[month]} ${calendarDay} to ${monthMap[month2]} ${calendarDay2}`;
    } else {
      slateText = `Primetime - ${monthMap[month2]} ${calendarDay2} to ${monthMap[month]} ${calendarDay}`;
    }
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isLoading ? 'hidden' : 'visible'}
      variants={variants}
    >
      <Row>
        <Col>
          <Row className="mx-auto mt-3 mb-3">
            <Col className="pl-0">
              <h2>{slateText}</h2>
            </Col>
          </Row>
          {games.map((game) => (
            <Game game={game} slate={name} key={game.id} />
          ))}
        </Col>
      </Row>
    </motion.div>
  );
};

export default Slate;
