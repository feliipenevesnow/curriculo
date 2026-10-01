import { useState } from 'react';
import { FaBriefcase, FaCalendarAlt, FaCheck, FaLayerGroup, FaChevronDown } from 'react-icons/fa';
import './ExperienceBento.css';

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string[];
}

interface ExperienceBentoProps {
  items: ExperienceItem[];
  lang: 'pt' | 'en';
}

function parseItemContent(item: ExperienceItem) {
  const bullets: string[] = [];
  let techTags: string[] = [];

  item.description.forEach(desc => {
    const isTech = desc.includes('Tecnologias:') || desc.includes('Technologies:');
    if (isTech) {
      const parts = desc.split(/:(.+)/);
      if (parts[1]) {
        techTags = parts[1].split('•').map(t => t.trim()).filter(Boolean);
      }
    } else {
      bullets.push(desc.replace(/^[•\s]+/, ''));
    }
  });

  return { bullets, techTags };
}

export function ExperienceBento({ items, lang }: ExperienceBentoProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleCardClick = (idx: number) => {
    // If clicking the active one on mobile, toggle it; otherwise set active
    setSelectedIndex(prev => (prev === idx ? null : idx));
  };

  const currentActiveIndex = selectedIndex !== null ? selectedIndex : 0;
  const activeDesktopItem = items[currentActiveIndex] || items[0];
  const desktopParsed = parseItemContent(activeDesktopItem);

  return (
    <div className="experience-bento-container">
      {/* Cards List (Desktop Sidebar / Mobile Accordion) */}
      <div className="experience-sidebar-nav">
        {items.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          const isCurrent = idx === 0;
          const { bullets, techTags } = parseItemContent(item);

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`exp-selector-card ${isSelected ? 'active' : ''}`}
            >
              <div className="exp-selector-top">
                <span className="exp-company-badge">
                  <FaBriefcase className="badge-icon" />
                  {item.company.split('•')[0].trim()}
                </span>
                <div className="exp-top-right">
                  {isCurrent && (
                    <span className="current-pulse-badge">
                      {lang === 'pt' ? 'ATUAL' : 'CURRENT'}
                    </span>
                  )}
                  <FaChevronDown className={`mobile-chevron ${isSelected ? 'rotated' : ''}`} />
                </div>
              </div>

              <h4 className="exp-selector-role">{item.title}</h4>
              <span className="exp-selector-date">
                <FaCalendarAlt style={{ marginRight: 5, fontSize: '0.75rem' }} />
                {item.date}
              </span>

              {isSelected && <div className="active-rail-indicator" />}

              {/* Mobile Inline Drawer (Accordion on Mobile) */}
              {isSelected && (
                <div className="mobile-inline-detail">
                  <div className="detail-bullets-container">
                    <h5 className="detail-section-label">
                      {lang === 'pt' ? 'ENTREGAS & IMPACTO TÉCNICO' : 'DELIVERABLES & TECHNICAL IMPACT'}
                    </h5>
                    <ul className="detail-bullet-list">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="detail-bullet-item">
                          <span className="bullet-check-icon"><FaCheck /></span>
                          <span className="bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {techTags.length > 0 && (
                    <div className="detail-tech-stack-container">
                      <h5 className="detail-section-label">
                        <FaLayerGroup style={{ marginRight: 6 }} />
                        {lang === 'pt' ? 'STACK & FERRAMENTAS APLICADAS' : 'APPLIED STACK & TOOLS'}
                      </h5>
                      <div className="detail-tech-chips">
                        {techTags.map((tech, tIdx) => (
                          <span key={tIdx} className="tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop-Only Right Column: Deep-Dive Glass Inspector */}
      <div className="experience-detail-panel glass-card">
        <div className="detail-panel-header">
          <div>
            <span className="detail-company-sub">
              {activeDesktopItem.company} • <span className="detail-date">{activeDesktopItem.date}</span>
            </span>
            <h3 className="detail-role-title">{activeDesktopItem.title}</h3>
          </div>
        </div>

        {/* Bullets List */}
        <div className="detail-bullets-container">
          <h5 className="detail-section-label">
            {lang === 'pt' ? 'ENTREGAS & IMPACTO TÉCNICO' : 'DELIVERABLES & TECHNICAL IMPACT'}
          </h5>
          <ul className="detail-bullet-list">
            {desktopParsed.bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="detail-bullet-item">
                <span className="bullet-check-icon"><FaCheck /></span>
                <span className="bullet-text">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Matrix */}
        {desktopParsed.techTags.length > 0 && (
          <div className="detail-tech-stack-container">
            <h5 className="detail-section-label">
              <FaLayerGroup style={{ marginRight: 6 }} />
              {lang === 'pt' ? 'STACK & FERRAMENTAS APLICADAS' : 'APPLIED STACK & TOOLS'}
            </h5>
            <div className="detail-tech-chips">
              {desktopParsed.techTags.map((tech, tIdx) => (
                <span key={tIdx} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
