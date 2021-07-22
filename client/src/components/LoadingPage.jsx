import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingPage = () => (
  <div className="loading-overlay">
    <Spinner
      className="spinner"
      animation="border"
      variant="danger"
      role="status"
    />
  </div>
);

export default LoadingPage;
