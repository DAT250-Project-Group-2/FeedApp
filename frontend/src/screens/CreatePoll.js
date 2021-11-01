import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import PollService from "../services/PollService";
import "./Home.css";

function CreatePoll() {
  const initialPollState = {
    question: "",
    user: {
      id: 4,
      email: "janne@hvl.no",
      password: "passord4",
    }
  };

  const [poll, setPoll] = useState(initialPollState);
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const createPoll = () => {
    PollService.createPoll({
      question: poll.question,
      is_active: checked,
      user_id: poll.user,
    })
      .then((response) => {
        let res = response.data;
        console.log(res);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPoll({ ...poll, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createPoll();
    alert("Poll Created");
  };

  const newPoll = () => {
    setPoll(initialPollState);
    setSubmitted(false);
  };

  return (
    <div>
      {submitted ? (
        <div className="pollPinContainer">
          <Container>
            <h4>Your poll was successfully created!</h4>
            <button className="btn btn-success" onClick={newPoll}>
              Add
            </button>
          </Container>
        </div>
      ) : (
        <div className="pollPinContainer">
          {console.log(poll.question)}
          {console.log(checked)}
          <Container>
            <Row className="justify-content-md-center">
              <Col md={{ span: 4 }}>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label
                      className="text-center"
                      column="lg"
                      lg={2}
                      style={{ width: "100%" }}
                    >
                      <h2>What do you want to ask the world?</h2>
                    </Form.Label>
                    <br />
                    <Form.Control
                      size="lg"
                      type="text"
                      name="question"
                      value={poll.question}
                      onChange={handleInputChange}
                      placeholder="Enter your question"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Make poll active"
                      value={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
export default CreatePoll;
