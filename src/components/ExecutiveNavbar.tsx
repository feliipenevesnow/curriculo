import React, { useState, useEffect } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import './ExecutiveNavbar.css';

interface ExecutiveNavbarProps {
  lang: 'pt' | 'en';
  onToggleLang: () => void;
  onDownloadPDF: () => void;
}

export const ExecutiveNavbar: React.FC<ExecutiveNavbarProps> = ({
  lang,
  onToggleLang,
  onDownloadPDF,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'experiencia', 'projetos', 'stack', 'formacao'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className={`executive-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* Left: Professional Brand & Status */}
        <div className="navbar-brand" onClick={() => scrollToSection('inicio')}>
          <div className="brand-monogram">FN</div>
          <div className="brand-info">
            <span className="brand-name">Felipe Neves</span>
            <div className="brand-status">
              <span className="status-dot" />
              <span className="status-text">
                {lang === 'pt' ? 'Disponível para contratação' : 'Available for hire'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Clean Section Links */}
        <nav className="navbar-nav" aria-label="Navegação Principal">
          <button
            onClick={() => scrollToSection('inicio')}
            className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}
          >
            {lang === 'pt' ? 'Início' : 'Home'}
          </button>
          <button
            onClick={() => scrollToSection('experiencia')}
            className={`nav-link ${activeSection === 'experiencia' ? 'active' : ''}`}
          >
            {lang === 'pt' ? 'Experiência' : 'Experience'}
          </button>
          <button
            onClick={() => scrollToSection('projetos')}
            className={`nav-link ${activeSection === 'projetos' ? 'active' : ''}`}
          >
            {lang === 'pt' ? 'Projetos' : 'Projects'}
          </button>
          <button
            onClick={() => scrollToSection('stack')}
            className={`nav-link ${activeSection === 'stack' ? 'active' : ''}`}
          >
            {lang === 'pt' ? 'Competências' : 'Skills'}
          </button>
          <button
            onClick={() => scrollToSection('formacao')}
            className={`nav-link ${activeSection === 'formacao' ? 'active' : ''}`}
          >
            {lang === 'pt' ? 'Formação' : 'Education'}
          </button>
        </nav>

        {/* Right: Actions (Language, PDF, AI Assistant) */}
        <div className="navbar-actions">
          <button
            onClick={onToggleLang}
            className="action-btn btn-lang"
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            <span className="lang-code">{lang.toUpperCase()}</span>
          </button>

          <button
            onClick={onDownloadPDF}
            className="action-btn btn-pdf"
            title={lang === 'pt' ? 'Baixar Currículo em PDF' : 'Download Resume PDF'}
          >
            <FaFilePdf className="btn-icon" />
            <span className="btn-label">{lang === 'pt' ? 'Currículo PDF' : 'Resume PDF'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
