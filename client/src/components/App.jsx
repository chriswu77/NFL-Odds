import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slates from './Slates';

const App = () => {
  const [week, setWeek] = useState(1);
  const [slateData, setSlateData] = useState();

  const getCurrentWeek = async () => {
    try {
      const res = await axios.get('/api/current');
      setWeek(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSummaryData = async () => {
    try {
      const res = await axios.get('/api/summary');
      setSlateData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getCurrentWeek();
    await getSummaryData();
  }, []);

  return (
    <Container fluid className="main-container">
      <Row className="mx-auto mb-5">
        <Col className="pl-0">
          <h1 className="display-6 ">NFL 2021 - WEEK {week} ODDS</h1>
        </Col>
      </Row>
      <Row>
        <Slates slateData={slateData} />
      </Row>
    </Container>
  );
};

export default App;
