import React from "react";
import { Row, Col, Container } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
              <footer className="footer">
                  <Container fluid>
                        <Row>
                            <Col sm={6}>
                                {new Date().getFullYear()} © TBS.
                            </Col>
                            <Col sm={6}>
                                <div className="text-sm-right d-none d-sm-block">
                                    Powered by Tema Business Systems
                                </div>
                            </Col>
                        </Row>
                  </Container>
              </footer>
    </React.Fragment>
  );
};

export default Footer;
