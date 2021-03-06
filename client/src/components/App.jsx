import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import parseISO from 'date-fns/parseISO';
import Slates from './Slates';
import RefreshButton from './RefreshButton';
import WeekButton from './WeekButton';
import SortButton from './SortButton';
import LoadingPage from './LoadingPage';

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
  const [sortBy, setSortBy] = useState('date');

  const getCurrentWeek = async () => {
    try {
      const res = await axios.get('/api/weeks/current');
      setWeek(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
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

      const res = await axios.get('/api/games/refresh');
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

  const toggleWeek = () => {
    setIsLoading(true);
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

  const sortGames = () => {
    const dataCopy = { ...slateData };

    if (sortBy === 'over_under') {
      for (const [slate, gamesArr] of Object.entries(dataCopy)) {
        const sortedArr = gamesArr.sort((game1, game2) => {
          const a = game1.homeStats.over_under;
          const b = game2.homeStats.over_under;

          return (
            (a === null) - (b === null) || -(a.avg > b.avg) || +(a.avg < b.avg)
          );
        });

        dataCopy[slate] = sortedArr;
      }
    } else if (sortBy === 'spread') {
      for (const [slate, gamesArr] of Object.entries(dataCopy)) {
        const sortedArr = gamesArr.sort((game1, game2) => {
          let game1spread;
          let game2spread;

          if (game1.homeStats.spread.avg > 0) {
            game1spread = game1.homeStats.spread.avg;
          } else {
            game1spread = game1.awayStats.spread.avg;
          }

          if (game2.homeStats.spread.avg > 0) {
            game2spread = game2.homeStats.spread.avg;
          } else {
            game2spread = game2.awayStats.spread.avg;
          }

          return game2spread - game1spread;
        });

        dataCopy[slate] = sortedArr;
      }
    } else if (sortBy === 'moneyline') {
      for (const [slate, gamesArr] of Object.entries(dataCopy)) {
        const sortedArr = gamesArr.sort((game1, game2) => {
          let game1moneyline;
          let game2moneyline;

          if (game1.homeStats.money_line.avg < 0) {
            game1moneyline = game1.homeStats.money_line.avg;
          } else {
            game1moneyline = game1.awayStats.money_line.avg;
          }

          if (game2.homeStats.money_line.avg < 0) {
            game2moneyline = game2.homeStats.money_line.avg;
          } else {
            game2moneyline = game2.awayStats.money_line.avg;
          }

          return game1moneyline - game2moneyline;
        });

        dataCopy[slate] = sortedArr;
      }
    } else {
      for (const [slate, gamesArr] of Object.entries(dataCopy)) {
        const sortedArr = gamesArr.sort((game1, game2) => {
          const game1date = parseISO(game1.commence_time);
          const game2date = parseISO(game2.commence_time);

          return game1date - game2date;
        });

        dataCopy[slate] = sortedArr;
      }
    }

    setSlateData(dataCopy);
  };

  return (
    <>
      <Container fluid className="main-container">
        <Row className="mx-auto mb-5">
          <Col xs={9} className="pl-0">
            <h1 className="display-6 ">NFL 2021 - Week {week} Odds</h1>
          </Col>
          <Col className="d-flex justify-content-end p-0">
            <RefreshButton
              refreshData={refreshData}
              requestsRemaining={requestsRemaining}
              requestsUsed={requestsUsed}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <WeekButton
              toggleWeek={toggleWeek}
              isNextWeek={isNextWeek}
              week={week}
            />
            {slateData && (
              <SortButton
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortGames={sortGames}
                setIsLoading={setIsLoading}
              />
            )}
          </Col>
        </Row>
        <Row>
          {slateData && (
            <Slates
              slateData={slateData}
              sortGames={sortGames}
              sortBy={sortBy}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </Row>
      </Container>
      {isLoading && <LoadingPage />}
    </>
  );
};

export default App;
