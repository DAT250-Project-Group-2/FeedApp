import { Container, Row, Form, Button, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import "./LoginScreen.css";
import { useHistory } from "react-router-dom";

function LoginScreen() {
    const history = useHistory();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [responseEmail, setResponseEmail] = useState();
    const [responsePassword, setResponsePassword] = useState();
    const [userID, setUserID] = useState();

    useEffect(() => {
        const getUserByEmail = () => {
            UserService.getUserByEmail(email)
                .then((response) => {
                    let user = response.data
                    setResponseEmail(user.email);
                    setResponsePassword(user.password);
                    setUserID(user.id);
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
            localStorage.setItem("email",email);
            localStorage.setItem("userID",userID);
            alert("OK")
            routeChange(`/profile/${userID}`);
            window.location.reload(false)
        } else {
            alert("invalid credentials")           
        }
    }


    function routeChange(path) {
        history.push(path);
      }

    return (
        <>
        { (localStorage.getItem("userID") === null) ?
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
                                    type="password"
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
        : <h1 className="text-center">{`Already logged in as user ${localStorage.getItem("email")}`}</h1> }
        </>
    );
}
export default LoginScreen;