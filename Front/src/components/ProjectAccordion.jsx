import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectAccordion = ({ project, barContent, setProjects }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div classname='py-2'>
            <button 
                onClick={() => setAccordionOpen(!accordionOpen)} 
                className='flex justify-between w-half'
            >
                <span>{barContent}</span>
                {accordionOpen ? <span>-</span> : <span>+</span>}
            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                accordionOpen 
                ? "grid-rows-[1fr] opacity-100" 
                : "grid-rows-[0fr] opacity-0" 
            }`}>
                <div>
                    {project.readme}
                </div>
            </div>
        </div>
    );
};

export default ProjectAccordion; 