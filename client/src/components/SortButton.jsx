import React, { useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SortButton = (props) => {
  const { sortBy, setSortBy, sortGames, setIsLoading } = props;

  const onSelect = (eventKey) => {
    if (sortBy !== eventKey) {
      setIsLoading(true);
      setSortBy(eventKey);
    }
  };

  useEffect(() => {
    sortGames();
    setIsLoading(false);
  }, [sortBy]);

  let dropdownText;
  if (sortBy === 'date') {
    dropdownText = 'Date';
  } else if (sortBy === 'over_under') {
    dropdownText = 'Over/Under';
  } else if (sortBy === 'spread') {
    dropdownText = 'Spread';
  } else {
    dropdownText = 'Moneyline';
  }

  return (
    <DropdownButton
      id="sort-btn"
      title={`Sort by: ${dropdownText}`}
      variant="outline-primary"
      onSelect={onSelect}
    >
      <Dropdown.Item eventKey="over_under" active={sortBy === 'over_under'}>
        Over/Under
      </Dropdown.Item>
      <Dropdown.Item eventKey="spread" active={sortBy === 'spread'}>
        Spread
      </Dropdown.Item>
      <Dropdown.Item eventKey="moneyline" active={sortBy === 'moneyline'}>
        Moneyline
      </Dropdown.Item>
      <Dropdown.Item eventKey="date" active={sortBy === 'date'}>
        Date
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default SortButton;
