import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import PollService from "../services/PollService";
import "./Home.css";
import { useHistory } from "react-router-dom";


const EditPoll = (props) => {
  const initialPollState = {
    newQuestion: "",
    id: Number(props.location.state.poll.id),
    is_active: props.location.state.poll.is_active,
    oldQuestion: props.location.state.poll.question,
    time_limit: props.location.state.poll.time_limit,
    user_id: props.location.state.poll.user_id
        
  };
  const history = useHistory();
  const [poll, setPoll] = useState(initialPollState);
  const user = poll.user_id;
  const [checked, setChecked] = useState(Boolean(initialPollState.is_active));
  const [submitted, setSubmitted] = useState(false);

  const updatePoll = () => {
    PollService.updatePoll(poll.id,{
        time_limit: poll.time_limit,
      question: (poll.newQuestion === "")? poll.oldQuestion : poll.newQuestion ,
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
    console.log(poll);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePoll();
    alert("Poll Updated");
  };

  return (
    <div>
      {submitted ? (
        <div className="pollPinContainer">
          <Container>
            <h4>Your poll was successfully Updated!</h4>
            <button className="btn btn-success" onClick={() => history.push(`/profile/${poll.user_id.id}`, {user})}>
              Back to profile
            </button>
          </Container>
        </div>
      ) : (
        <div className="pollPinContainer">
          {console.log(props)}
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
                      name="newQuestion"
                      value={poll.newQuestion}
                      onChange={handleInputChange}
                      placeholder={poll.oldQuestion}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Make poll active"
                      defaultChecked = {checked}
                      onChange={() => setChecked(!checked)}
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
export default EditPoll;