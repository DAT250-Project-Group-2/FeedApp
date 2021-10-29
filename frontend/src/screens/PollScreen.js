import React, { useState, useEffect } from "react";
import PollService from "../services/PollService";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./PollScreen.css";


const Poll = (props) => {
  const initialPollState = {
    id: null,
    question: "",
  };
  const[yesBool, setyesBool] = useState(false); //not zero get yes votes from the vote's poll id
  const[noBool, setnoBool] = useState(false); //not zero get yes votes from the vote's poll id

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
  function increament(){
    if (noBool || yesBool) {
      setyesBool(yesBool)
      console.log("I get here")
      setnoBool(noBool)
      return false
    }
    
    console.log({yesBool})
    return true
  }
  function reset(){
    setnoBool(false)
    setyesBool(false)
    console.log("reset success")
  }

  useEffect(() => {
    getPoll(props.match.params.id);
  }, [props.match.params.id]);

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
          <Button onClick={()=> setyesBool(increament(yesBool, noBool))} variant="secondary" size="lg"> {/* */}
            Yes
          </Button>{" "}
          <Button onClick={()=>setnoBool(increament(yesBool, noBool))} variant="secondary" size="lg">
            No
          </Button> 
          <Button onClick={()=> reset()} variant="secondary" size="lg">
            Reset
          </Button> 
          <Button variant="secondary" size="lg">
            Send
          </Button> 
          <h1>Yes is: {yesBool.toString()} No is: {noBool.toString()}</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Poll;
