import React, { useState, useEffect } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import PollService from "../services/PollService";
import { useHistory } from "react-router-dom";
import axios from "axios";

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

    console.log(`https://dweet.io/get/latest/dweet/for/${question}`);
  }

  return (
    <>
      {localStorage.getItem("userID") ===
      history.location.pathname.replace(/[^0-9]/g, "") ? (
        <div className="container">
          <h1 className="text-center"> Your Polls</h1>
          <table className="table table-striped">
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
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        history.push(`/polls/${poll.id}/results`, { poll })
                      }
                    >
                      View results
                    </Button>
                  </td>

                  <td>
                    {!poll.is_active ? (
                      <Button variant="secondary">Open poll</Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => publishResults(poll.id)}
                      >
                        Close and publish
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        history.push(`/editPoll/${poll.id}`, { poll })
                      }
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deletePoll(poll.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      ) : (
        <h1 className="text-center">This profile page is private</h1>
      )}
    </>
  );
};

export default Profile;
