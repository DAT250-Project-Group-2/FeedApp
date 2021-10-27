import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './Home.css';


function Home() {

    const [pollPin, setPollPin] = useState(),
    onInput = ({target:{pollPin}}) => setPollPin(pollPin),
    onFormSubmit = e => {
      e.preventDefault()
      console.log(pollPin)
      setPollPin()
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
            onChange={onInput} 
            value={pollPin}
            placeholder="Enter Poll pin"
          />
                {/* <Form.Control type="text" placeholder="Enter Poll pin" /> */}
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
