import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import Slates from './Slates';

const App = () => {
  const [week, setWeek] = useState(1);
  const [isNextWeek, setIsNextWeek] = useState(false);
  const [slateData, setSlateData] = useState();
  const [requestsRemaining, setRequestsRemaining] = useState(
    localStorage.getItem('requestsRemaining') || 500
  );
  const [requestsUsed, setRequestsUsed] = useState(
    localStorage.getItem('requestsUsed') || 0
  );
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentWeek = async () => {
    try {
      const res = await axios.get('/api/week');
      setWeek(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getCurrentWeek();
  }, []);

  const getSummaryData = async () => {
    try {
      const res = await axios.get(`/api/games/${week}`);
      setSlateData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getSummaryData();
  }, [week]);

  const refreshData = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get('/api/refresh');
      setRequestsRemaining(res.data.remaining);
      setRequestsUsed(res.data.used);

      localStorage.setItem('requestsRemaining', res.data.remaining);
      localStorage.setItem('requestsUsed', res.data.used);

      await getCurrentWeek();

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const loadingPage = (
    <div className="loading-overlay">
      <Spinner
        className="spinner"
        animation="border"
        variant="danger"
        role="status"
      />
    </div>
  );

  const toggleWeek = () => {
    setIsNextWeek(!isNextWeek);
  };

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (isNextWeek) {
      setWeek(week + 1);
    } else {
      setWeek(week - 1);
    }
  }, [isNextWeek]);

  return (
    <>
      <Container fluid className="main-container">
        <Row className="mx-auto mb-5">
          <Col className="pl-0">
            <h1 className="display-6 ">NFL 2021 - WEEK {week} ODDS</h1>
            <Button variant="primary" onClick={toggleWeek} className="mt-3">
              <div className="d-flex align-items-center">
                {isNextWeek && (
                  <FontAwesomeIcon
                    icon={faLongArrowAltLeft}
                    size="lg"
                    className="mr-2"
                  />
                )}
                <span>WEEK {isNextWeek ? week - 1 : week + 1}</span>
                {!isNextWeek && (
                  <FontAwesomeIcon
                    icon={faLongArrowAltRight}
                    size="lg"
                    className="ml-2"
                  />
                )}
              </div>
            </Button>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <div className="d-flex flex-column">
              <Button variant="secondary" onClick={refreshData}>
                Refresh
              </Button>
              <span>Requests remaining: {requestsRemaining}</span>
              <span>Requests used: {requestsUsed}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Slates slateData={slateData} />
        </Row>
      </Container>
      {isLoading && loadingPage}
    </>
  );
};

export default App;
