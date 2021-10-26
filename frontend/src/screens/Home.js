import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './Home.css';

function Home() {
  return (
    <div class="pollPinContainer">
      <Container>
        <Row className="justify-content-md-center">
        
          <Col md={{ span: 3 }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPollpin">
                <Form.Label
                  className="text-center"
                  column="lg"
                  lg={2}
                  style={{ width: "100%" }}
                >
                  Poll Pin
                </Form.Label>
                <Form.Control type="pollpin" placeholder="Enter Poll pin" />
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
