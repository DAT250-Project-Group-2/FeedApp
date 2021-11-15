import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import PollService from "../services/PollService";
import UserService from "../services/UserService";
import "./Home.css";
import { useHistory } from "react-router-dom";


const CreatePoll = (props) => {
  const initialPollState = {
    question: "",
    user: props.location.state.user,
    is_active: false,
    is_public: false
  };
  
  const history = useHistory();
  const [poll, setPoll] = useState(initialPollState);
  const [userData,setUserData] = useState();
  const [submitted, setSubmitted] = useState(false);

  const createPoll = () => {
    console.log(poll);
    PollService.createPoll({
      question: poll.question,
      is_active: poll.is_active,
      is_public: poll.is_public,
      user_id: userData,
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

 useEffect(() => { 
  const findUserByID = () => {
      UserService.getUser(localStorage.getItem("userID"))
        .then((response) => {
          let res = response.data;
          setUserData(res);
        })
        .catch((e) => {
          console.log(e)
        });
  };
  findUserByID();
 },[]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPoll({ ...poll, [name]: value });
  };

  const handleCheckbox = (event) => {
    const { name } = event.target;
    setPoll({ ...poll, [name]: event.target.checked });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    createPoll();
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
          
            <Button variant='success' onClick={newPoll}>
              Add 
            </Button>
            {' '}
            <Button className="btn btn-success" onClick={() => history.push(`/profile/${localStorage.getItem("userID")}`)}>
              Back to profile
            </Button>
          </Container>
        </div>
      ) : (
        <div className="pollPinContainer">
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
                      required
                      size="lg"
                      type="text"
                      name="question"
                      value={poll.question}
                      onChange={handleInputChange}
                      placeholder="Enter your question"
                    />
                  </Form.Group>
                  <Row>
                  <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Make poll active"
                      name="is_active"
                      value={poll.is_active}
                      onChange={handleCheckbox}
                    />
                  </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Make poll public"
                      name="is_public"
                      value={poll.is_public}
                      onChange={handleCheckbox}
                    />
                  </Form.Group>
                  </Col>
                  </Row>

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
