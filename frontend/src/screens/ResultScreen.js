import React, { useState, useEffect } from "react";
import PollService from "../services/PollService";
import { Container, Row, Col } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import "./PollScreen.css";

const ResultScreen = (props) => {
  const [currentPoll, setCurrentPoll] = useState([]);

  useEffect(() => {
    setInterval(() => {
      getPoll(props.match.params.id);
    }, 1000);
    }, [props.match.params.id]);
    
  

  async function getPoll(id) {
    await PollService.getPoll(id)
      .then((response) => {
        setCurrentPoll(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const pieData = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [currentPoll.yes_votes, currentPoll.no_votes],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 5 }}>
          <div className="resultContainer">
            <h5 className="text-center">Current results for poll:</h5>
            <h1 className="text-center">{currentPoll.question}</h1>
          </div>
          <br />
          {currentPoll.yes_votes === 0 && currentPoll.no_votes === 0 ? (
            <div className="text-center">
              <p> There are no votes registered for this poll.</p>
            </div>
          ) : (
            <Pie data={pieData} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ResultScreen;
