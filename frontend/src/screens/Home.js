import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import PollService from "../services/PollService";
import "./Home.css";

function Home() {
  const history = useHistory();
  const [pollPin, setPollPin] = useState();
  const [pollIds, setPollIds] = useState([]);
  const user = localStorage.getItem("userID");

  useEffect(() => {
    const getAllPolls = () => {
      PollService.getAllPolls()
        .then((response) => {
          let polls = response.data
          let IDs = [];
          setPollIds(polls.map(poll => IDs.push(poll.id)));
          // console.log(pollIds)
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getAllPolls();
  });
  

//function that gets executed whenever you press enter if pollid exists reroutes you to routeChange(`/polls/${pollPin}`);
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (pollIds.includes(Number(pollPin))) {

        routeChange(`/polls/${pollPin}`);

    }
    else {
      alert("Could not find poll. Please enter a different pin.")
    }
  };




  function routeChange(path) {
    history.push(path);
  }

  return (
    <div class="pollPinContainer">
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 3 }}>
            <Form onSubmit={onFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPollpin">
                <Form.Label
                  className="text-center"
                  column="lg"
                  lg={2}
                  style={{ width: "100%" }}
                >
                  Poll Pin
                </Form.Label>
                <Form.Control
                  type="text"
                  value={pollPin}
                  onChange={(e) => setPollPin(e.target.value)}
                  placeholder="Enter Poll pin"
                />
              </Form.Group>
              <div class="col text-center">
                <Button variant="secondary" type="submit" size="lg">
                  Enter
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home;
