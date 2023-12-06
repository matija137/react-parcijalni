import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import UserHeader from "./UserHeader";
import UserRepoList from "./UserRepoList";
import { isEmpty } from "lodash";

const SearchForm = () => {
  const [input, setInput] = useState("");
  const [queryUserName, setQueryUserName] = useState("");
  const [user, setUser] = useState({});
  const [userRepoList, setUserRepoList] = useState([]);

  function fetchUserNameData() {
    if (queryUserName === "") return;

    fetch(`https://api.github.com/users/${queryUserName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUser({
          avatar_url: data.avatar_url,
          name: data.name,
          location: data.location,
          bio: data.bio,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUserRepoListData() {
    if (queryUserName === "") return;

    fetch(`https://api.github.com/users/${queryUserName}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let extractedDataArray = [];
        data.forEach((element) => {
          extractedDataArray.push({ id: element.id, name: element.name });
        });
        setUserRepoList(extractedDataArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchDataFromGitHub() {
    fetchUserNameData();
    fetchUserRepoListData();
  }

  function handleReset() {
    setInput("");
    setQueryUserName("");
    setUser({});
    setUserRepoList([]);
  }

  useEffect(() => {
    // fetchUserNameData();
    fetchDataFromGitHub();
  }, [queryUserName]);

  function handleSubmit(event) {
    event.preventDefault();

    if (input.length > 0) {
      setQueryUserName(input);
      setInput("");
    }
  }

  return (
    <>
      <h1 className="text-center">Github user search</h1>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Row className="justify-content-center">
          <Col className="col-md-6">
            <Form.Control
              type="text"
              placeholder="e.g. facebook"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col className="col-md-6">
            <Button variant="primary" type="submit" className="w-100">
              GO!
            </Button>
          </Col>
        </Row>
      </Form>

      <UserHeader user={user} />
      <UserRepoList userRepoList={userRepoList} />

      {userRepoList.length > 0 || typeof user.name !== "undefined" ? (
        <Row className="justify-content-center mt-3">
          <Col className="col-md-6">
            <Button variant="danger" onClick={handleReset} className="w-100">
              Reset
            </Button>
          </Col>
        </Row>
      ) : null}
    </>
  );
};

export default SearchForm;
