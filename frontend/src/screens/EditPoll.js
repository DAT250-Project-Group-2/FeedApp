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

const EditPoll = (props) => {
  const history = useHistory();
  const [poll, setPoll] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isActive, setIsActive] = useState();
  const [isPublic, setIsPublic] = useState();

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
      is_active: isActive,
      is_public: isPublic,
      yes_votes: poll.yes_votes,
      no_votes: poll.no_votes,
      user_id: poll.user,
    })
      .then((response) => {
        console.log(response.data);
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


  const onSubmit = (e) => {
    e.preventDefault();
    updatePoll();
  };

  return (
    <>
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

                        {poll.yes_votes > 0 || poll.no_votes > 0 ? (
                        <div>
                          <h5>{poll.question}</h5>
                          <Form.Control
                            placeholder="Votes have been registered. Question cannot be changed."
                            disabled={true}
                          /></div>
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
                              defaultChecked={poll.is_active}
                              value={isActive}
                              onClick={(e) => setIsActive(e.target.checked)}
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
                              value={isPublic}
                              onClick={(e) => setIsPublic(e.target.checked)}
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
