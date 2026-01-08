import React from 'react';
import type { ProjectItem } from '../data/translations';
import { FaInfoCircle } from 'react-icons/fa';

interface ProjectCardProps {
    project: ProjectItem;
    onClick: () => void;
    btnText: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, btnText }) => {
    return (
        <div className="project-card glass-card" onClick={onClick}>
            <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="card-tags">
                    {project.techs.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.techs.length > 3 && <span className="tech-tag">+{project.techs.length - 3}</span>}
                </div>

                <button className="btn-details">
                    <FaInfoCircle /> {btnText}
                </button>
            </div>
        </div>
    );
};
