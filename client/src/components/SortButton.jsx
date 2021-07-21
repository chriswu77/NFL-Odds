import React, { useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SortButton = (props) => {
  const { sortBy, setSortBy, sortGames } = props;

  const onSelect = (eventKey) => {
    if (sortBy !== eventKey) {
      setSortBy(eventKey);
    }
  };

  useEffect(() => {
    sortGames();
  }, [sortBy]);

  return (
    <DropdownButton id="sort-btn" title="Sort by" onSelect={onSelect}>
      <Dropdown.Item eventKey="over_under">Over/Under</Dropdown.Item>
      <Dropdown.Item eventKey="spread">Spread</Dropdown.Item>
      <Dropdown.Item eventKey="moneyline">Moneyline</Dropdown.Item>
      <Dropdown.Item eventKey="date">Date</Dropdown.Item>
    </DropdownButton>
  );
};

export default SortButton;
