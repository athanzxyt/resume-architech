import React, { useState, useEffect } from "react";
import CardElement from "../components/CardElement";
import axios from "axios";
import { Accordion, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "../components/ProjectBullets.css";

export default function ProjectBullets() {
  let [projects, setProjects] = useState([]);

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

  const saveBullets = () => {
    axios
      .post("http://localhost:8000/updateprojects", {
        username: window.localStorage.getItem("username"),
        repos: projects,
      })
      .then((res) => {
        setProjects(res.data.repos);
        console.log(res.data.repos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className="py-3 my-2 text-center">
        <h1 className="display-2">Projects</h1>
        <Button className="my-3" onClick={saveBullets}>
          Save Bullets
        </Button>
        <Accordion defaultActiveKey={0}>
          {Object.values(projects).map((project, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{project.name}</Accordion.Header>
                <Accordion.Body>
                  {(project.bullets ?? []).map((bullet, bullet_index) => {
                    return (
                      <>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            setProjects((prevProjects) => {
                              prevProjects[project.name].bullets[bullet_index] =
                                e.target.value;
                              return { ...prevProjects };
                            });
                          }}
                          className="w-100 border border-primary rounded p-1 my-1 "
                        />
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
    </>
  );
}
