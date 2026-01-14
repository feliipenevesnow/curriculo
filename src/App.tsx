import { useState, useRef, useEffect } from 'react';
import { translations, type TranslationData } from './data/translations';
import { ProjectCarousel } from './components/ProjectCarousel';
import html2pdf from 'html2pdf.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { ScrollBot } from './components/ScrollBot';
import { Chatbot } from './components/Chatbot';
import { HandGuide } from './components/HandGuide';
import { BackgroundShapes } from './components/BackgroundShapes';
import './components/HandGuide.css';
import {
  FaFilePdf,
  FaLanguage,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import profileImg from './assets/profile.jpeg';
import tccVant from './assets/TccFaculdade.png';
import tccExpressale from './assets/TccIntegrado.png';

function App() {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);
  const T: TranslationData = translations[lang];
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    setLang((currentLang) => (currentLang === 'pt' ? 'en' : 'pt'));
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const downloadPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    // Add PDF specific class
    element.classList.add('pdf-mode');

    const filename = (lang === 'pt') ? 'CV_Felipe_Neves.pdf' : 'Resume_Felipe_Neves.pdf';
    const options = {
      margin: [10, 10, 10, 10], // Top, Left, Bottom, Right
      filename: filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0, backgroundColor: '#ffffff', logging: false },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    try {
      // @ts-ignore
      await html2pdf().set(options).from(element).save();
    } finally {
      // Remove PDF specific class ensuring it runs even if save fails (it's async though)
      // Since html2pdf is a promise (usually), better wait.
      // However the lib might not return promise on save() depending on version/usage.
      // A small timeout ensures the rendering started.
      setTimeout(() => {
        element.classList.remove('pdf-mode');
      }, 1000);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '5518981712939';
    const defaultMessage = 'Olá! Vi seu portfólio e gostaria de conversar.';
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <BackgroundShapes />
      <HandGuide />
      <ScrollBot onClick={toggleChat} lang={lang} />
      <Chatbot
        isOpen={isChatOpen}
        onClose={toggleChat}
        lang={lang}
      />

      <div className="botoes-acao-flutuantes">
        <button id="download-pdf" onClick={downloadPDF} aria-label={T.btnDownload} title={T.btnDownload}>
          <FaFilePdf className="icone" />
          <span>PDF</span>
        </button>
        <button id="toggle-lang" onClick={toggleLang} aria-label={T.btnLang} title={T.btnLang}>
          <FaLanguage className="icone" />
          <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
        </button>
        <button
          id="whatsapp"
          onClick={handleWhatsAppClick}
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <FaWhatsapp className="icone" />
          <span>Zap</span>
        </button>
        <button
          id="linkedin"
          onClick={() => handleLinkClick('https://www.linkedin.com/in/feliipenevesnow/')}
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <FaLinkedin className="icone" />
          <span>In</span>
        </button>
        <button
          id="github"
          onClick={() => handleLinkClick('https://github.com/feliipenevesnow')}
          aria-label="GitHub"
          title="GitHub"
        >
          <FaGithub className="icone" />
          <span>Git</span>
        </button>
      </div>

      <main id="curriculo" ref={contentRef} lang={lang}>
        <header className="cabecalho-curriculo" data-aos="zoom-in" data-aos-duration="1200">
          <img src={profileImg} alt="Felipe Neves" className="profile-photo" />
          <h1>Felipe Neves</h1>
          <h2>{T.header.jobTitle}</h2>

          <ul className="lista-contato">
            <li><FaPhone /> +55 (18) 98171-2939</li>
            <li><FaEnvelope /> feliipenevesnow@gmail.com</li>
            <li><FaMapMarkerAlt /> {T.header.location}</li>
          </ul>
        </header>

        <div className="container-conteudo">
          <section className="glass-card" id="resumo" data-aos="fade-up">
            <h3 className="section-title">{T.summary.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: T.summary.body }}></p>
          </section>

          <section className="glass-card" id="experiencia" data-aos="fade-up" data-aos-delay="100">
            <h3 className="section-title">{T.experience.title}</h3>
            {T.experience.items.map((item, index) => (
              <article className="item-experiencia" key={index}>
                <div className="exp-header">
                  <h4>{item.title}</h4>
                  <span><strong>{item.company}</strong> | {item.date}</span>
                </div>
                <ul>
                  {item.description.map((desc, i) => {
                    const isTechLine = desc.indexOf('Tecnologias:') !== -1 || desc.indexOf('Technologies:') !== -1;

                    if (isTechLine) {
                      // Remove bullets from start if any (though we added them manually in text, 
                      // we want to strip the "Tecnologias:" part cleanly)
                      // Actually the line comes as "Technologies: A • B • C" (sometimes with bullet prefix from previous edits? Let's be safe)
                      // The previous edit added manual bullets to ALL lines?
                      // Let's check if the line STARTS with "Technologies" or "• Technologies"

                      const cleanDesc = desc.replace(/^•\s*/, ''); // Remove leading bullet if present
                      if (cleanDesc.startsWith('Tecnologias:') || cleanDesc.startsWith('Technologies:')) {
                        const [label, techsString] = cleanDesc.split(/:(.+)/);
                        if (techsString) {
                          const techs = techsString.split('•').map(t => t.trim()).filter(Boolean);
                          return (
                            <li key={i} className="tech-tags-wrapper" style={{ listStyle: 'none', marginTop: '12px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                              <span className="tech-list-label" style={{ fontWeight: 'bold', marginRight: '5px', color: 'var(--accent-primary)' }}>{label}:</span>
                              {techs.map((tech, tIndex) => (
                                <span key={tIndex} className="tech-badge" style={{
                                  background: 'rgba(6, 182, 212, 0.15)',
                                  color: 'var(--accent-primary)',
                                  padding: '4px 10px',
                                  borderRadius: '12px',
                                  fontSize: '0.85em',
                                  border: '1px solid rgba(6, 182, 212, 0.3)'
                                }}>
                                  {tech}
                                </span>
                              ))}
                            </li>
                          );
                        }
                      }
                    }

                    return <li key={i}>{desc}</li>;
                  })}
                </ul>
              </article>
            ))}
          </section>

          <section className="glass-card" id="tecnologias" data-aos="fade-up" data-aos-delay="200">
            <h3 className="section-title">{T.skills.title}</h3>
            <div className="container-skills">
              {T.skills.categories.map((cat, index) => (
                <div className="skill-categoria" key={index}>
                  <h4>{cat.title}</h4>
                  <div className="tags">{cat.tags}</div>
                </div>
              ))}
            </div>
          </section>


          <section className="glass-card" id="formacao" data-aos="fade-up" data-aos-delay="300">

            <div className="coluna-formacao">
              <h3 className="section-title">{T.education.title}</h3>
              {T.education.items.map((item, index) => (
                <div className="item-formacao" key={index} style={{ position: 'relative', marginBottom: '40px' }}>
                  <strong>{item.degree}</strong>
                  <span>{item.institution}</span>
                  <span>{item.date}</span>

                  {/* TCC Info */}
                  {item.tccTitle && (
                    <div className="tcc-info" style={{
                      marginTop: '25px',
                      padding: '25px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '16px',
                      borderLeft: '4px solid var(--accent-primary)',
                      maxWidth: '85%', /* Giving room for the big image */
                      position: 'relative'
                    }}>
                      <h5 style={{ margin: '0 0 15px 0', color: '#fff', fontSize: '1.2rem', paddingRight: '100px' }}>{item.tccTitle}</h5>
                      <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{item.tccDescription}</p>
                    </div>
                  )}

                  {/* Floating Image */}
                  {item.tccImage === 'vant' && (
                    <img
                      src={tccVant}
                      alt="VANT TCC"
                      className="tcc-floating-img"
                    />
                  )}
                  {item.tccImage === 'expressale' && (
                    <img
                      src={tccExpressale}
                      alt="ExpresSale TCC"
                      className="tcc-floating-img"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card" id="cursos" data-aos="fade-up" data-aos-delay="350">
            <div className="coluna-cursos">
              <h3 className="section-title">{T.courses.title}</h3>
              <ul>
                {T.courses.items.featured.map((item, index) => (
                  <li key={`featured-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>

              {isCoursesExpanded && (
                <ul className="cursos-lista-extra" style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                  {T.courses.items.others.map((item, index) => (
                    <li key={`others-${index}`} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}

              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button
                  onClick={() => setIsCoursesExpanded(!isCoursesExpanded)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--accent-primary)',
                    color: 'var(--text-primary)',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isCoursesExpanded
                    ? (lang === 'pt' ? 'Ver menos' : 'Show less')
                    : (lang === 'pt' ? 'Ver mais' : 'Show more')
                  }
                </button>
              </div>
            </div>
          </section>

          <section className="glass-card" id="projetos" data-aos="fade-up" data-aos-delay="400">
            <div className="coluna-projetos">
              <h3 className="section-title">{T.projects.title}</h3>
              <ProjectCarousel projects={T.projects.items} btnText={T.btnViewMore} />
            </div>
          </section>

          <section className="glass-card" id="idiomas" data-aos="fade-up" data-aos-delay="500">
            <div className="coluna-idiomas">
              <h3 className="section-title">{T.languages.title}</h3>
              {T.languages.items.map((item, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p>
          {lang === 'pt' ? 'Desenvolvido com ❤️ por' : 'Developed with ❤️ by'} <strong>Felipe Neves</strong>
        </p>
        <p className="tech-stack">
          {lang === 'pt' ? 'Frontend em' : 'Frontend with'} <strong>React, TypeScript e Vite.</strong>
        </p>
        <p className="tech-stack">
          {lang === 'pt'
            ? 'Potencializado com '
            : 'Powered by '
          }
          <strong>IA Generativa (Google Gemini)</strong>
          {lang === 'pt'
            ? ' para responder perguntas sobre meu perfil e projetos.'
            : ' to answer questions about my profile and projects.'
          }
        </p>
      </footer>
    </>
  );
}

export default App;