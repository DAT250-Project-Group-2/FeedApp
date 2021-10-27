import { Container, Row, Form, Button, Col } from "react-bootstrap";
import React, { useState } from "react";
import UserService from "../services/UserService";
import "./LoginScreen.css";

function RegisterScreen() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [allEmails, setAllEmails] = useState([]);


    const createUser = () => {
        UserService.createUser({"email":email,"password":password})
            .then((response) => {
                let res = response.data
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getAllMails = () => {
        UserService.getAllUsers()
            .then((response) => {
                let allusers = response.data
                setAllEmails(allusers.map(user => allEmails.push(user.email)));
                console.log(allEmails)
            })
            .catch((e) => {
                console.log(e)
            })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        getAllMails()
        if (allEmails.includes(email)){
            alert("Account with that email already exists")
        } else {
            createUser()
            alert("Account Created")
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
                                    Create user
                                </Button>
                                </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default RegisterScreen;