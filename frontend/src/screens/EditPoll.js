import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import PollService from "../services/PollService";
import "./Home.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const EditPoll = (props) => {
  const history = useHistory();
  const [poll, setPoll] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(poll.is_active)  
  async function getPoll(id) {
    await PollService.getPoll(id)
      .then((response) => {
        setPoll(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getPoll(props.match.params.id);
  }, [props.match.params.id]);
  
  const updatePoll = () => {
    PollService.updatePoll(poll.id, {
      question: poll.question,
      is_active: poll.is_active,
      is_public: poll.is_public,
      yes_votes: poll.yes_votes,
      no_votes: poll.no_votes,
      user_id: poll.user,
    })
      .then((response) => {
        let res = response.data;
        console.log(res);
        setSubmitted(true);
        publishResults(res.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  async function publishResults(pollid) {
    const poll = await axios.get(`http://localhost:8080/polls/${pollid}`);
    alert("Published")
    const active = poll.data.is_active;
    const yes = poll.data.yes_votes;
    const no = poll.data.no_votes;
    const question = poll.data.question.replace(/ /g, "-").replace("?", "");

    await axios
      .post(`https://dweet.io/dweet/for/${question}`, {
        active,
        yes,
        no,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(`http://dweet.io/follow/${question}`);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPoll({ ...poll, [name]: value });
    console.log(poll);
  };

  const deletePoll = (pollid) => {
    PollService.removePoll(pollid)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    alert("Poll was successfully deleted.");
    history.push("/profile/" + localStorage.getItem("userID"));
  };

  const handleCheckbox = (event) => {
    const { name } = event.target;
    setPoll({ ...poll, [name]: event.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updatePoll();
  };

  return (
    <>
      {console.log(props)}
      {props.location.state.poll.user_id.id ==
      localStorage.getItem("userID") ? (
        <div>
          {submitted ? (
            <div className="pollPinContainer">
              <Container>
                <h4>Your poll was successfully updated!</h4>
                <button
                  className="btn btn-success"
                  onClick={() => history.push(`/profile/${poll.user_id.id}`)}
                >
                  Back to profile
                </button>
              </Container>
            </div>
          ) : (
            <div className="pollPinContainer">
              <Container>
                <Row className="justify-content-md-center">
                  <Col md={{ span: 5 }}>
                    <Form onSubmit={onSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          column="lg"
                          lg={2}
                          style={{ width: "100%" }}
                        >
                          <h4>Edit poll</h4>
                        </Form.Label>
                        <br />
                        <br />

                        {poll.yes_votes > 0 || poll.no_votes > 0 ? (
                          <Form.Control
                            placeholder="Votes have been registered. Question cannot be changed."
                            disabled={true}
                          />
                        ) : (
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Question"
                            className="mb-3"
                          >
                            <Form.Control
                              size="lg"
                              type="text"
                              name="question"
                              value={poll.question}
                              onChange={handleInputChange}
                            />
                          </FloatingLabel>
                        )}
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check
                              type="checkbox"
                              label="Make poll active"
                              name="is_active"          
                              defaultChecked={status}
                              value={status}
                              onChange={ (e) => setStatus(e.target.checked)}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check
                              type="checkbox"
                              label="Make poll public"
                              name="is_public"
                              defaultChecked={poll.is_public}
                              value={poll.is_public}
                              onChange={handleCheckbox}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />

                      <div className="text-center">
                        <Button variant="primary" type="submit">
                          Update poll
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => deletePoll(poll.id)}
                        >
                          Delete poll
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-center">
          {" "}
          You dont have permission to edit this poll
        </h1>
      )}
    </>
  );
};
export default EditPoll;
