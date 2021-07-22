import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';

const WeekButton = (props) => {
  const { toggleWeek, isNextWeek, week } = props;

  return (
    <Button variant="primary" onClick={toggleWeek}>
      <div className="d-flex align-items-center">
        {isNextWeek && (
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            size="lg"
            className="mr-2"
          />
        )}
        <span>Week {isNextWeek ? week - 1 : week + 1}</span>
        {!isNextWeek && (
          <FontAwesomeIcon
            icon={faLongArrowAltRight}
            size="lg"
            className="ml-2"
          />
        )}
      </div>
    </Button>
  );
};

export default WeekButton;
