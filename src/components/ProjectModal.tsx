import React, { useEffect } from 'react';
import type { ProjectItem } from '../data/translations';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCode } from 'react-icons/fa';

interface ProjectModalProps {
    project: ProjectItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Fechar">
                    <FaTimes />
                </button>

                <div className="modal-header">
                    <h2>{project.title}</h2>
                    <div className="modal-techs">
                        {project.techs.map((tech, i) => (
                            <span key={i} className="tech-badge"><FaCode /> {tech}</span>
                        ))}
                    </div>
                </div>

                <div className="modal-body">
                    <p className="modal-description">{project.details}</p>

                    <div className="modal-actions">
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-action primary">
                                <FaGithub /> Ver Código
                            </a>
                        )}
                        {project.deployUrl && (
                            <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="btn-action secondary">
                                <FaExternalLinkAlt /> Ver Projeto
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
