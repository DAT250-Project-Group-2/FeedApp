import { Container, Row, Form, Button, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import "./LoginScreen.css";
import { useHistory } from "react-router-dom";


function RegisterScreen() {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [allEmails, setAllEmails] = useState([]);
    const [userID,setUserID] = useState();
    const history = useHistory();

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
                const c = []
                allusers.map(user => c.push(user.email))
                setAllEmails(c);
                setUserID(c.length + 1);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => getAllMails(), []);

    const onSubmit = (e) => {
        e.preventDefault();
        getAllMails();
        if (allEmails.includes(email)){
            alert("Account with that email already exists")
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address ")
        } else {
            console.log(userID)
            alert("Account Created")
            createUser()
            localStorage.setItem("email",email);
            localStorage.setItem("userID",userID);
            routeChange(`/profile/${userID}`);
            window.location.reload(false) 
        }
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
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
                                    Create user
                                </Button>
                                </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div> : <h1 className="text-center">{`Already logged in as user ${localStorage.getItem("email")}, please log out before creating a new account`}</h1> }
        </>
    );
}
export default RegisterScreen;