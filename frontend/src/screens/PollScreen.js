import React, { useState, useEffect } from "react";
import PollService from "../services/PollService";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./PollScreen.css";
import { useHistory } from "react-router";


const Poll = (props) => {
  const initialPollState = {
    id: null,
    question: "",
  };
  const[yesBool, setyesBool] = useState(false); //not zero get yes votes from the vote's poll id
  const[noBool, setnoBool] = useState(false); //not zero get yes votes from the vote's poll id
  const history = useHistory();
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

  const registerVote = (id,vote) => {
    PollService.registerVote(id,vote,{vote})
      .then((response) => {
        setCurrentPoll(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function increament(){
    if (noBool || yesBool) {
      setyesBool(yesBool)
      setnoBool(noBool)
      return false
    }
    return true
  }

  function reset(){
    setnoBool(false)
    setyesBool(false)
    console.log("reset success")
  }

  function sendVote(yesBool,noBool) {
    if (!yesBool && !noBool) {
      alert("please vote");
    }
    registerVote(currentPoll.id,yesBool);
    history.push(`/polls/${currentPoll.id}/results`, {currentPoll})
  }

  useEffect(() => {
    getPoll(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <>
    { ((localStorage.getItem("userID") === null) && (currentPoll.is_public === true)) ?
    <h1 className="text-center"> Log in or create an account to access this poll!</h1>
    :
    <>
    { (currentPoll.is_active === true) ?
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
          <Button onClick={()=> setyesBool(increament(yesBool, noBool))} variant={yesBool === true ? 'success' : 'danger'} size="lg">
            Yes
          </Button>{' '}
          <Button onClick={()=>setnoBool(increament(yesBool, noBool))} variant={noBool === true ? 'success' : 'danger'} size="lg">
            No
          </Button>{' '}
          <Button onClick={()=> reset()} variant="secondary" size="lg">
            Reset
          </Button>{' '}
          <Button onClick ={() => sendVote(yesBool,noBool)}variant="secondary" size="lg">
            Send
          </Button> 
          </div>
        </Col>
      </Row>
    </Container> 
    : <h1 className="text-center"> Poll is not active</h1>  }
    </>
    }
    </>
  );
};

export default Poll;
