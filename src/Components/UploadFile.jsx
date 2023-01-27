import React, { useState } from "react";
import { pushFile, make_id } from "../functions";
import { Card, Button, Alert, Form, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { principe_wayspot, fuente_wayspot, yassef_wayspot } from "../wayspots";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_OBJECTS } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function UploadFile() {
  const history = useNavigate();

  const { currentUser } = useAuth();
  const [current_file, set_current_file] = useState();
  const [error, setError] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [is_Yassef_switch_on, set_is_Yassef_switch] = useState(false);
  const [is_fuente_switch, set_fuente_switch] = useState(false);
  const [is_principe_switch, set_principe_switch] = useState(false);

  async function add_art_data(wayspot, file) {
    const art_unveil = isSwitchOn;
    const data = {
      Artist: currentUser.uid,
      Wayspot: wayspot,
      Storage_link: file.newId,
      Artist_unveil_only: art_unveil,
    };
    await setDoc(
      doc(FIREBASE_OBJECTS.firestore, "Addressable_requests", make_id(20)),
      data
    );
  }

  function handleFile(e) {
    let wayspot;
    console.log(current_file);
    if (current_file) {
      console.log(current_file);
      if (is_Yassef_switch_on) {
        wayspot = yassef_wayspot;
      } else if (is_principe_switch) {
        wayspot = principe_wayspot;
      } else {
        wayspot = fuente_wayspot;
      }
      pushFile(current_file.file, current_file.newId);
      add_art_data(wayspot, current_file);
      history("/");
    } else {
      alert("Make sure to select a file");
    }
  }

  const yasse_switch_action = () => {
    is_fuente_switch || is_principe_switch
      ? alert("Only select one wayspot")
      : set_is_Yassef_switch(!is_Yassef_switch_on);
  };

  const fuente_switch_action = () => {
    is_Yassef_switch_on || is_principe_switch
      ? alert("Only select one wayspot")
      : set_fuente_switch(!is_fuente_switch);
  };

  const princpipe_switch_action = () => {
    is_fuente_switch || is_Yassef_switch_on
      ? alert("Only select one wayspot")
      : set_principe_switch(!is_principe_switch);
  };
  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const popover_fuente = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{fuente_wayspot.title}</Popover.Header>
      <Popover.Body>{fuente_wayspot.address}</Popover.Body>
    </Popover>
  );

  const popover_Yassef = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{yassef_wayspot.title}</Popover.Header>
      <Popover.Body>{yassef_wayspot.address}</Popover.Body>
    </Popover>
  );

  const popover_Principe = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{principe_wayspot.title}</Popover.Header>
      <Popover.Body>{principe_wayspot.address}</Popover.Body>
    </Popover>
  );

  function handleStorage(e) {
    const currentUserEmail = currentUser.email;
    const fileName = e.target.files[0].name;
    const newId = currentUserEmail.concat("/").concat(fileName);
    const file = e.target.files[0];
    set_current_file({ file, newId });
    console.log(current_file);
    return;
  }
  return (
    <>
      <Container className="myCard dashboard_container d-flex align-items-center justify-content-center">
        <Card style={{ "background-color": "0x8d97a6" }} className="border-0">
          <Card.Body>
            <h2 className="text-center mb-4">Upload your master piece:</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong style={{ color: "black" }}>Email:</strong>{" "}
            <span style={{ color: "black" }}> {currentUser.email}</span>
            <Form.Group
              onChange={handleStorage}
              className="text center mb-4 justify-content-center"
              controlId="formFileSm"
            >
              <Form.Label>Upload a file:</Form.Label>
              <Form.Control type="file" size="sm" />
            </Form.Group>
            <Form.Check
              type="switch"
              id="unveil-switch"
              checked={isSwitchOn}
              onChange={onSwitchAction}
              label="Do you want your art piece to be unveiled only by you?"
            />
            <Button className="btn btn-primary w-100 mt-3" onClick={handleFile}>
              Upload File
            </Button>
            <br />
            <br />
            <span style={{ color: "black" }}>
              Please select a location from these available{" "}
              <strong>wayspots</strong> for your art piece to be displayed:
            </span>
          </Card.Body>
        </Card>
      </Container>
      <br />

      <Container className="dashboard_container d-flex align-items-center justify-content-center">
        <Row>
          <Col>
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={popover_fuente}
            >
              <iframe
                className="ms-auto"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7985.78021044019!2d-99.18775969369077!3d19.472983613853657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x96a0bc4545ddd925!2zMTnCsDI4JzEyLjAiTiA5OcKwMTEnMTYuOCJX!5e0!3m2!1sen!2smx!4v1672955429540!5m2!1sen!2smx"
                width="150"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={false}
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </OverlayTrigger>
            <Form.Check
              type="switch"
              id="unveil-switch"
              checked={is_fuente_switch}
              onChange={fuente_switch_action}
            />
          </Col>
          <Col>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={popover_Principe}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.78103971932!2d-99.18118868508999!3d19.465005044687548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe07ab9e440ceba01!2zMTnCsDI3JzU0LjAiTiA5OcKwMTAnNDQuNCJX!5e0!3m2!1sen!2smx!4v1672956031467!5m2!1sen!2smx"
                width="150"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </OverlayTrigger>
            <Form.Check
              type="switch"
              id="unveil-switch"
              checked={is_principe_switch}
              onChange={princpipe_switch_action}
            />
          </Col>

          <Col>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={popover_Yassef}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.7810397193207!2d-99.18418868508999!3d19.46500504468751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x29a089bec1d0ebf5!2zMTnCsDI3JzU0LjAiTiA5OcKwMTAnNTUuMiJX!5e0!3m2!1sen!2smx!4v1672956120957!5m2!1sen!2smx"
                width="150"
                height="150"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </OverlayTrigger>
            <Form.Check
              type="switch"
              id="unveil-switch"
              checked={is_Yassef_switch_on}
              onChange={yasse_switch_action}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UploadFile;
