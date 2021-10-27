import React, { useState, useEffect } from "react";
import PollService from "../services/PollService";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./PollScreen.css";

const Poll = (props) => {
  const initialPollState = {
    id: null,
    question: "",
  };

  const [currentPoll, setCurrentPoll] = useState(initialPollState);

  const getPoll = (id) => {
    PollService.getPoll(id)
      .then((response) => {
        setCurrentPoll(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPoll(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPoll({ ...currentPoll, [name]: value });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 8 }}>
          <div className="pollContainer">
            <h5 className="text-center">Poll Question</h5>
            <br />
            <h1 className="text-center">{currentPoll.question}</h1>
          </div>
          <br />
          <div className="text-center">
          <Button variant="secondary" size="lg">
            Yes
          </Button>{" "}
          <Button variant="secondary" size="lg">
            No
          </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Poll;
