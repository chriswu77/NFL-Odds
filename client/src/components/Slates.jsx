import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Slate from './Slate';

const Slates = (props) => {
  const { slateData, sortGames } = props;

  const [thurs, setThurs] = useState([]);
  const [sat, setSat] = useState([]);
  const [sunMorning, setSunMorning] = useState([]);
  const [sunAfternoon, setSunAfternoon] = useState([]);
  const [sunEvening, setSunEvening] = useState([]);
  const [primetime, setPrimeTime] = useState([]);

  useEffect(() => {
    setThurs(slateData.tnf);
    setSat(slateData.sat);
    setSunMorning(slateData.morning);
    setSunAfternoon(slateData.afternoon);
    setSunEvening(slateData.evening);
    setPrimeTime(slateData.pt);
  }, [slateData]);

  useEffect(() => {
    sortGames();
  }, [thurs, sat, sunMorning, sunAfternoon, sunEvening, primetime]);

  return (
    <Col>
      {thurs.length > 0 && <Slate name="thurs" games={thurs} />}
      {sat.length > 0 && <Slate name="sat" games={sat} />}
      {sunMorning.length > 0 && <Slate name="sunMorning" games={sunMorning} />}
      {sunAfternoon.length > 0 && (
        <Slate name="sunAfternoon" games={sunAfternoon} />
      )}
      {sunEvening.length > 0 && <Slate name="sunEvening" games={sunEvening} />}
      {primetime.length > 0 && <Slate name="primetime" games={primetime} />}
    </Col>
  );
};

export default Slates;
