import { Container, Row, Form, Button, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import "./LoginScreen.css";

function LoginScreen() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [responseEmail, setResponseEmail] = useState();
    const [responsePassword, setResponsePassword] = useState();

    useEffect(() => {
        const getUserByEmail = () => {
            UserService.getUserByEmail(email)
                .then((response) => {
                    let user = response.data
                    setResponseEmail(user.email);
                    setResponsePassword(user.password);
                    console.log(user)
                })
                .catch((e) => {
                    console.log(e)
                });
        };
        getUserByEmail(email);
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if(email === responseEmail && password === responsePassword) {
            alert("OK")
        } else {
            alert("invalid credentials")           
        }
    }

    return (
        <div class="LoginScreenContainer">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={{ span: 3 }}>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    />
                               <Form.Control
                                    type="text"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    />
                            </Form.Group>
                                <div className = "col text-center">
                                <Button variant="secondary" type="submit" size="lg">
                                    Log in
                                </Button>
                                </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default LoginScreen;