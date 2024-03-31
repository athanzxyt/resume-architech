import React, { useState, useEffect } from "react";
import CardElement from "../components/CardElement";
import axios from "axios";
import { Accordion } from "react-bootstrap";
import { Container } from "react-bootstrap";

export default function ProjectBullets() {
  let [projects, setProjects] = useState([]);
  let [projectName, setProjectName] = useState("");
  let [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getprojects", {
        params: {
          username: window.localStorage.getItem("username"),
        },
      })
      .then((res) => {
        setProjects(res.data.repos);
        console.log(res.data.repos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="py-5 my-5">
      <Accordion defaultActiveKey={0}>
        {Object.values(projects).map((project, index) => {
          return (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{project.name}</Accordion.Header>
              <Accordion.Body>
                {(project.bullets ?? []).map((bullet) => {
                  return (
                    <>
                      <input type="text" value={bullet} className="width-100" />
                      <br />
                    </>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}
