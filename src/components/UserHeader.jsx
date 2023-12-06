import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const UserHeader = ({ user }) => {
  if (typeof user.name === "undefined") {
    return null;
  }

  return (
    <>
      <Row className="justify-content-center mt-3 text-center">
        <Col className="col-md-3 ">
          <Image src={user.avatar_url} width={"50%"} />
        </Col>
        <Col className="col-md-3 d-flex align-items-center">
          <h1>{user.name}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col className="col-md-6">
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
        </Col>
      </Row>
    </>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserHeader;
