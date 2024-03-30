import React, {useState, useEffect} from 'react';
import CardElement from '../components/CardElement';

export default function MyProjects() {
    let mystuff = [{"name":"hackathon 1", "readme":"blah blah blah"}, {"name":"school project", "readme":"More blah"}, {"name":"some other shit", "readme":"Even more blah"}];
  
    return (
      <>
        {mystuff.map((project, index) => (
          <CardElement key={index} project={project} barContent={`Project ${index + 1}: ${project.name}`}/>
        ))}
      </>
    );
  }