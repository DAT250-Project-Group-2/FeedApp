import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import PollService from "../services/PollService";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Profile = () => {
  const user = localStorage.getItem("userID");
  const history = useHistory();
  const [userPolls, setUserPolls] = useState([]);

  const getUserPolls = () => {
    PollService.getAllPolls()
      .then((response) => {
        let allPolls = response.data;
        setUserPolls(
          allPolls
            .map(function (poll) {
              if (Number(poll.user_id.id) === Number(user)) {
                return poll;
              }
              return null;
            })
            .filter((noNulls) => noNulls)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePoll = (pollid) => {
    PollService.removePoll(pollid)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    window.location.reload(false);
  };

  useEffect(() => {
    getUserPolls();
  });

  const updatePoll = (poll) => {
    console.log("open");
    PollService.updatePoll(poll.id, {
      question: poll.question,
      is_active: true,
    })
      .then((response) => {
        let res = response.data;
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function publishResults(pollid) {
    const poll = await axios.get(`http://localhost:8080/polls/${pollid}`);

    const yes = poll.data.yes_votes;
    const no = poll.data.no_votes;
    const question = poll.data.question.replace(/ /g, "-").replace("?", "");

    await axios
      .post(`https://dweet.io/dweet/for/${question}`, {
        yes,
        no,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(`http://dweet.io/follow/${question}`);
  }

  return (
    <>
      {localStorage.getItem("userID") ===
      history.location.pathname.replace(/[^0-9]/g, "") ? (
        <Container className="pollPinContainer">
          <h1> Your Polls</h1>
          <br />
          {userPolls.length === 0 ? (
            <h5>You don't have any polls. Go ahead and create one!</h5>
          ) : (
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th> Poll Question</th>
                  <th> Active</th>
                </tr>
              </thead>
              <tbody>
                {userPolls.map((poll) => (
                  <tr key={poll.id}>
                    <td> {poll.question}</td>
                    <td> {poll.is_active ? "Yes" : "No"}</td>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          history.push(`/polls/${poll.id}/results`, { poll })
                        }
                      >
                        View results
                      </Button>
                    </td>
                    {" "}
                    <td>
                      <Button
                      
                        variant="outline-success"
                        onClick={() => publishResults(poll.id)}
                      >
                        Publish results
                        <i class="bi-alarm"></i>
                      </Button>
                    </td>
                    {" "}
                    <td>
                      <Button
                      variant="outline-danger"
                        // variant="secondary"
                        onClick={() =>
                          history.push(`/editPoll/${poll.id}`, { poll })
                        }
                      >
                        Edit
                      </Button>
                    </td>
                    </div>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <br />
          <Button
            variant="success"
            onClick={() =>
              history.push(`/createPoll`, {
                id: localStorage.getItem("userID"),
                email: localStorage.getItem("email"),
              })
            }
          >
            Create new Poll
          </Button>
        </Container>
      ) : (
        <h1 className="text-center">This profile page is private</h1>
      )}
    </>
  );
};

export default Profile;
