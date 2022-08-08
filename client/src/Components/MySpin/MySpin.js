import React from 'react';
import { Row, Spinner } from 'reactstrap';

function MySpin() {
  return (
    <Row className="mySpin">
      <Spinner
        color="primary"
        type="grow"
      />
    </Row>
  );
}

export default MySpin;
