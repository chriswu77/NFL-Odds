import React from 'react';
import Button from 'react-bootstrap/Button';

const RefreshButton = (props) => {
  const { refreshData, requestsRemaining, requestsUsed } = props;

  return (
    <div className="d-flex flex-column">
      <Button variant="secondary" onClick={refreshData}>
        Refresh
      </Button>
      <span>Requests remaining: {requestsRemaining}</span>
      <span>Requests used: {requestsUsed}</span>
    </div>
  );
};

export default RefreshButton;
