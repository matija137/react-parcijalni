import React, { Component } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import PropTypes from "prop-types";

// example of class component

class UserRepoList extends Component {
  render() {
    const { userRepoList } = this.props;
    return (
      <Row className="justify-content-center mt-3">
        <Col className="col-md-6">
          <ListGroup>
            {userRepoList.map((repo) => (
              <ListGroup.Item key={repo.id}>{repo.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

UserRepoList.propTypes = {
  userRepoList: PropTypes.array,
};

export default UserRepoList;
