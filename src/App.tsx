import { useState, useRef, useEffect } from 'react';
import { translations, type TranslationData } from './data/translations';
import { ProjectCarousel } from './components/ProjectCarousel';
import html2pdf from 'html2pdf.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import { AmbientBackground } from './components/AmbientBackground';
import { ExecutiveNavbar } from './components/ExecutiveNavbar';
import { ExperienceBento } from './components/ExperienceBento';
import { ChatBot } from './components/ChatBot';

import {
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaArrowRight,
  FaBrain,
  FaServer,
  FaCloud,
  FaMicrochip,
  FaCheckCircle
} from "react-icons/fa";

import profileImg from './assets/profile.jpeg';
import tccVant from './assets/TccFaculdade.png';
import tccExpressale from './assets/TccIntegrado.png';

function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);
  const T: TranslationData = translations[lang];
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    setLang((currentLang) => (currentLang === 'pt' ? 'en' : 'pt'));
  };

  const downloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    element.classList.add('pdf-mode');

    const filename = (lang === 'pt') ? 'CV_Felipe_Neves.pdf' : 'Resume_Felipe_Neves.pdf';
    const options = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0, backgroundColor: '#090a0f', logging: false },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    try {
      // @ts-ignore
      await html2pdf().set(options).from(element).save();
    } finally {
      setTimeout(() => {
        element.classList.remove('pdf-mode');
      }, 1000);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    const msg = encodeURIComponent(
      lang === 'pt'
        ? "Olá Felipe! Vi seu currículo online e gostaria de conversar sobre uma oportunidade."
        : "Hello Felipe! I saw your online resume and would like to discuss an opportunity."
    );
    window.open(`https://wa.me/5518981712939?text=${msg}`, '_blank');
  };

  return (
    <>
      {/* Calm Ambient Lighting (No lasers / No moving grid) */}
      <AmbientBackground />

      {/* Clean Fixed Executive Navbar */}
      <ExecutiveNavbar
        lang={lang}
        onToggleLang={toggleLang}
        onDownloadPDF={downloadPDF}
      />

      <main id="curriculo" ref={contentRef} className="curriculo-executive-container">

        {/* ================================================================ */}
        {/* HERO SECTION                                                     */}
        {/* ================================================================ */}
        <section id="inicio" className="hero-executive-section" data-aos="fade-up">
          <div className="hero-executive-grid">
            
            {/* Left: Professional Title & Authority */}
            <div className="hero-left-column">
              <div className="hero-status-pill">
                <span className="hero-status-dot" />
                <span>
                  {lang === 'pt'
                    ? 'Disponível para novos projetos & contratos'
                    : 'Available for new projects & contracts'}
                </span>
              </div>

              <h1 className="hero-main-title">
                {lang === 'pt' ? (
                  <>
                    Desenvolvedor Full Stack & <span className="text-gradient">Especialista em IA Generativa</span>
                  </>
                ) : (
                  <>
                    Full Stack Developer & <span className="text-gradient">Generative AI Specialist</span>
                  </>
                )}
              </h1>

              <p className="hero-description-text">
                {lang === 'pt' ? (
                  <>
                    Engenheiro de Software com foco no desenvolvimento de sistemas corporativos escaláveis em <strong>Python (FastAPI)</strong> e <strong>React (TypeScript)</strong>. Implementação de arquiteturas modernas de IA Generativa com <strong>RAG (LangGraph/LangChain)</strong>, modelagem relacional de alta performance (PostgreSQL) e infraestrutura em nuvem (Docker / Azure).
                  </>
                ) : (
                  <>
                    Software Engineer focused on building scalable enterprise systems with <strong>Python (FastAPI)</strong> and <strong>React (TypeScript)</strong>. Implementation of cutting-edge Generative AI architectures with <strong>RAG (LangGraph/LangChain)</strong>, high-performance relational databases (PostgreSQL), and cloud infrastructure (Docker / Azure).
                  </>
                )}
              </p>

              {/* Action Buttons */}
              <div className="hero-actions-group">
                <button
                  onClick={() => {
                    const el = document.getElementById('projetos');
                    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' });
                  }}
                  className="btn-executive-primary"
                >
                  <span>{lang === 'pt' ? 'Explorar Projetos' : 'Explore Projects'}</span>
                  <FaArrowRight className="btn-arrow" />
                </button>

                <button onClick={handleWhatsAppClick} className="btn-executive-whatsapp">
                  <FaWhatsapp />
                  <span>{lang === 'pt' ? 'Iniciar Conversa' : 'Get in Touch'}</span>
                </button>

                <div className="hero-social-links">
                  <button
                    onClick={() => handleLinkClick('https://github.com/feliipenevesnow')}
                    className="btn-executive-ghost"
                    title="GitHub"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </button>
                  <button
                    onClick={() => handleLinkClick('https://www.linkedin.com/in/feliipenevesnow/')}
                    className="btn-executive-ghost"
                    title="LinkedIn"
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Executive Identity Card */}
            <div className="hero-right-column">
              <div className="executive-id-card glass-panel">
                <div className="id-avatar-frame">
                  <img src={profileImg} alt="Felipe Neves" className="id-avatar-img" />
                </div>
                <div className="id-details">
                  <h3 className="id-name">Felipe Neves</h3>
                  <span className="id-title">Full Stack & AI Engineer</span>

                  <div className="id-divider" />

                  <div className="id-meta-list">
                    <div className="id-meta-item">
                      <span className="meta-key">{lang === 'pt' ? 'FORMAÇÃO' : 'DEGREE'}</span>
                      <span className="meta-val">B.S. Ciência da Computação @ IFSP</span>
                    </div>
                    <div className="id-meta-item">
                      <span className="meta-key">{lang === 'pt' ? 'LOCALIZAÇÃO' : 'LOCATION'}</span>
                      <span className="meta-val">Presidente Prudente, SP • Brasil</span>
                    </div>
                    <div className="id-meta-item">
                      <span className="meta-key">{lang === 'pt' ? 'IDIOMA' : 'ENGLISH'}</span>
                      <span className="meta-val">C1 Intermediário (EF SET 63/100)</span>
                    </div>
                    <div className="id-meta-item">
                      <span className="meta-key">{lang === 'pt' ? 'CONTRATO' : 'HIRING'}</span>
                      <span className="meta-val highlight-green">{lang === 'pt' ? 'CLT / PJ / Remoto / Presencial' : 'CLT / Contract / Full-time'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Key Engineering Metrics Bar */}
          <div className="executive-metrics-bar">
            <div className="metric-cell">
              <span className="metric-number">3+ Anos</span>
              <span className="metric-desc">
                {lang === 'pt' ? 'Experiência em Engenharia de Software' : 'Software Engineering Experience'}
              </span>
            </div>
            <div className="metric-cell">
              <span className="metric-number">100% Full Stack</span>
              <span className="metric-desc">
                {lang === 'pt' ? 'Python, React, TypeScript & IA' : 'Python, React, TypeScript & AI'}
              </span>
            </div>
            <div className="metric-cell">
              <span className="metric-number">ERPs & Web</span>
              <span className="metric-desc">
                {lang === 'pt' ? 'Sistemas Críticos em Produção' : 'Critical Systems in Production'}
              </span>
            </div>
            <div className="metric-cell">
              <span className="metric-number">IFSP</span>
              <span className="metric-desc">
                {lang === 'pt' ? 'Ciência da Computação & TCC IoT' : 'Computer Science & IoT Research'}
              </span>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* EXPERIÊNCIA PROFISSIONAL                                         */}
        {/* ================================================================ */}
        <section id="experiencia" className="section-block" data-aos="fade-up">
          <div className="section-header-executive">
            <span className="section-label-executive">
              {lang === 'pt' ? 'CARREIRA & HISTÓRICO' : 'CAREER & BACKGROUND'}
            </span>
            <h2 className="section-title-executive">{T.experience.title}</h2>
            <p className="section-desc-executive">
              {lang === 'pt'
                ? 'Histórico comprovado em entregas de engenharia, sistemas web robustos e arquiteturas com modelos de linguagem.'
                : 'Proven track record in engineering deliverables, robust web systems, and language model architectures.'}
            </p>
          </div>

          <ExperienceBento items={T.experience.items} lang={lang} />
        </section>

        {/* ================================================================ */}
        {/* PROJETOS EM DESTAQUE                                             */}
        {/* ================================================================ */}
        <section id="projetos" className="section-block" data-aos="fade-up">
          <div className="section-header-executive">
            <span className="section-label-executive">
              {lang === 'pt' ? 'PORTFÓLIO & LABORATÓRIO' : 'PORTFOLIO & LAB'}
            </span>
            <h2 className="section-title-executive">{T.projects.title}</h2>
            <p className="section-desc-executive">
              {lang === 'pt'
                ? 'Projetos reais, microsserviços, orquestrações de IA e sistemas completos de gestão.'
                : 'Real-world projects, microservices, AI orchestrations, and complete management systems.'}
            </p>
          </div>

          <ProjectCarousel projects={T.projects.items} btnText={T.btnViewMore} />
        </section>

        {/* ================================================================ */}
        {/* COMPETÊNCIAS & STACK TÉCNICA                                     */}
        {/* ================================================================ */}
        <section id="stack" className="section-block" data-aos="fade-up">
          <div className="section-header-executive">
            <span className="section-label-executive">
              {lang === 'pt' ? 'COMPETÊNCIAS' : 'SKILLS & TECH'}
            </span>
            <h2 className="section-title-executive">{T.skills.title}</h2>
          </div>

          <div className="skills-executive-grid">
            {/* Core Stack */}
            <div className="skill-panel glass-panel">
              <div className="skill-panel-icon"><FaServer /></div>
              <h3 className="skill-panel-title">{T.skills.categories[0]?.title || 'Core Stack'}</h3>
              <p className="skill-panel-desc">
                {lang === 'pt'
                  ? 'Foco primário em desenvolvimento Full Stack de alta performance com Python e TypeScript.'
                  : 'Primary focus on high-performance Full Stack development with Python and TypeScript.'}
              </p>
              <div className="skill-tags-group">
                <span className="skill-tag core">Python</span>
                <span className="skill-tag core">FastAPI</span>
                <span className="skill-tag core">React</span>
                <span className="skill-tag core">TypeScript</span>
                <span className="skill-tag core">PostgreSQL</span>
                <span className="skill-tag core">RAG Pipelines</span>
                <span className="skill-tag core">LangGraph</span>
                <span className="skill-tag core">Docker</span>
                <span className="skill-tag core">Azure</span>
              </div>
            </div>

            {/* AI & Data */}
            <div className="skill-panel glass-panel">
              <div className="skill-panel-icon icon-ai"><FaBrain /></div>
              <h3 className="skill-panel-title">{T.skills.categories[2]?.title || 'IA & Engenharia de Dados'}</h3>
              <div className="skill-tags-group">
                <span className="skill-tag">LangChain</span>
                <span className="skill-tag">LangGraph</span>
                <span className="skill-tag">OpenAI API</span>
                <span className="skill-tag">Gemini API</span>
                <span className="skill-tag">Vector Embeddings</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">Deep Learning CNN</span>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="skill-panel glass-panel">
              <div className="skill-panel-icon icon-cloud"><FaCloud /></div>
              <h3 className="skill-panel-title">{T.skills.categories[3]?.title || 'Cloud, DevOps & Infraestrutura'}</h3>
              <div className="skill-tags-group">
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Azure Cloud</span>
                <span className="skill-tag">Linux Ubuntu</span>
                <span className="skill-tag">Git / GitHub</span>
                <span className="skill-tag">Postman / Insomnia</span>
                <span className="skill-tag">CI/CD Pipelines</span>
              </div>
            </div>

            {/* Other Languages & Hardware */}
            <div className="skill-panel glass-panel">
              <div className="skill-panel-icon icon-code"><FaMicrochip /></div>
              <h3 className="skill-panel-title">{T.skills.categories[1]?.title || 'Outras Stacks & Hardware'}</h3>
              <div className="skill-tags-group">
                <span className="skill-tag">Node.js (NestJS)</span>
                <span className="skill-tag">C# (.NET)</span>
                <span className="skill-tag">Java (Spring Boot)</span>
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">C / C++</span>
                <span className="skill-tag">ESP32 / Arduino</span>
                <span className="skill-tag">SDN (Open vSwitch)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FORMAÇÃO ACADÊMICA & TCC                                         */}
        {/* ================================================================ */}
        <section id="formacao" className="section-block" data-aos="fade-up">
          <div className="section-header-executive">
            <span className="section-label-executive">
              {lang === 'pt' ? 'EDUCAÇÃO & CIÊNCIA' : 'EDUCATION & SCIENCE'}
            </span>
            <h2 className="section-title-executive">{T.education.title}</h2>
          </div>

          <div className="education-executive-grid">
            {/* Bacharelado */}
            <div className="education-card glass-panel">
              <div className="education-card-top">
                <span className="education-level-badge">{lang === 'pt' ? 'GRADUAÇÃO' : 'BACHELOR DEGREE'}</span>
                <span className="education-period">Concluído em 07/2025</span>
              </div>
              <h3 className="education-degree-name">Bacharelado em Ciência da Computação</h3>
              <span className="education-institution">Instituto Federal de São Paulo (IFSP)</span>

              <div className="education-tcc-box">
                <span className="tcc-meta-badge">TCC // EMBEDDED &amp; IOT</span>
                <h4 className="tcc-title">Protótipo de um VANT Modular de Baixo Custo no Contexto IoT</h4>
                <p className="tcc-desc">
                  Drone quadricóptero funcional com telemetria via internet utilizando microcontrolador ESP32 conectado ao Adafruit IO, estabilização giroscópica em tempo real via sensor MPU6050 e algoritmo de controle PID em Arduino.
                </p>
                <div className="tcc-image-wrapper">
                  <img src={tccVant} alt="Drone VANT IFSP" className="tcc-preview-img" />
                </div>
              </div>
            </div>

            {/* Técnico Integrado */}
            <div className="education-card glass-panel">
              <div className="education-card-top">
                <span className="education-level-badge">{lang === 'pt' ? 'ENSINO TÉCNICO' : 'TECHNICAL DIPLOMA'}</span>
                <span className="education-period">Concluído em 12/2019</span>
              </div>
              <h3 className="education-degree-name">Técnico em Informática Integrado ao Ensino Médio</h3>
              <span className="education-institution">Instituto Federal de São Paulo (IFSP)</span>

              <div className="education-tcc-box">
                <span className="tcc-meta-badge">TCC // ERP &amp; BANCO DE DADOS</span>
                <h4 className="tcc-title">ExpresSale: Sistema Completo de Gestão de Vendas e Estoque</h4>
                <p className="tcc-desc">
                  Software desktop para controle comercial com arquitetura MVC, modelagem relacional completa em banco de dados e regras de negócio para faturamento, estoque e relatórios analíticos.
                </p>
                <div className="tcc-image-wrapper">
                  <img src={tccExpressale} alt="ExpresSale ERP" className="tcc-preview-img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* CERTIFICAÇÕES & EXTENSÃO                                         */}
        {/* ================================================================ */}
        <section className="section-block" data-aos="fade-up">
          <div className="certifications-panel glass-panel">
            <div className="certifications-header-bar">
              <div>
                <span className="cert-meta-label">CREDENCIAIS &amp; APERFEIÇOAMENTO</span>
                <h3 className="cert-main-title">{T.courses.title}</h3>
              </div>
              <button
                onClick={() => setIsCoursesExpanded(!isCoursesExpanded)}
                className="btn-toggle-credentials"
              >
                {isCoursesExpanded
                  ? (lang === 'pt' ? 'Ocultar Extras' : 'Show Less')
                  : (lang === 'pt' ? 'Ver Todas (+18 Conquistas)' : 'View All (+18 Credentials)')}
              </button>
            </div>

            <div className="certifications-list-grid">
              {T.courses.items.featured.map((item, idx) => (
                <div key={`feat-${idx}`} className="cert-item-row">
                  <FaCheckCircle className="cert-check" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>

            {isCoursesExpanded && (
              <div className="certifications-extra-grid">
                {T.courses.items.others.map((item, idx) => (
                  <div key={`oth-${idx}`} className="cert-item-row extra">
                    <FaCheckCircle className="cert-check" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================================================================ */}
        {/* EXECUTIVE FOOTER                                                 */}
        {/* ================================================================ */}
        <footer className="executive-footer">
          <div className="footer-top-row">
            <div className="footer-identity">
              <span className="footer-brand-name">Felipe Neves</span>
              <p className="footer-role">Desenvolvedor Full Stack &amp; Especialista em IA Generativa</p>
            </div>
            <div className="footer-social-group">
              <button onClick={() => handleLinkClick('https://github.com/feliipenevesnow')} className="footer-link">
                <FaGithub /> GitHub
              </button>
              <button onClick={() => handleLinkClick('https://www.linkedin.com/in/feliipenevesnow/')} className="footer-link">
                <FaLinkedin /> LinkedIn
              </button>
              <button onClick={handleWhatsAppClick} className="footer-link highlight">
                <FaWhatsapp /> WhatsApp
              </button>
            </div>
          </div>
          <div className="footer-bottom-row">
            <span>Desenvolvido com React 19, TypeScript &amp; Vite.</span>
            <span>Presidente Prudente, SP • Brasil</span>
          </div>
        </footer>

      </main>

      {/* Floating AI ChatBot */}
      <ChatBot lang={lang} />
    </>
  );
}

export default App;