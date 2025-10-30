import { useState, useRef, useEffect } from 'react';
import { translations, type TranslationData } from './data/translations';
import html2pdf from 'html2pdf.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { ScrollBot } from './components/ScrollBot';
import { Chatbot } from './components/Chatbot';
import { HandGuide } from './components/HandGuide';
import './components/HandGuide.css';
import { FaFilePdf, FaLanguage, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
function App() {
  const handleLinkClick = (url: any) => {
    window.open(url, '_blank');
  };
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const T: TranslationData = translations[lang];
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleLang = () => {
    setLang((currentLang) => (currentLang === 'pt' ? 'en' : 'pt'));
  };
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const downloadPDF = () => {
    const element = contentRef.current;
    if (!element) return;
    const filename = (lang === 'pt') ? 'CV_Felipe_Neves.pdf' : 'Resume_Felipe_Neves.pdf';
    const options = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      pagebreak: { mode: 'css' as const },
    };
    html2pdf().set(options).from(element).save();
  };
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
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
      <HandGuide />
      <ScrollBot onClick={toggleChat} />
      <Chatbot
        isOpen={isChatOpen}
        onClose={toggleChat}
        lang={lang} 
      />
      <div className="botoes-acao-flutuantes">
        <button id="download-pdf" onClick={downloadPDF} aria-label={T.btnDownload} title={T.btnDownload}>
          <FaFilePdf className="icone" />
          <span>{T.btnDownload}</span>
        </button>
        <button id="toggle-lang" onClick={toggleLang} aria-label={T.btnLang} title={T.btnLang}>
          <FaLanguage className="icone" />
          <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
        </button>
        <button
          id="whatsapp"
          onClick={handleWhatsAppClick}
          aria-label="Fale comigo no WhatsApp"
          title="Fale comigo no WhatsApp"
        >
          <FaWhatsapp className="icone" />
          <span>Whatsapp</span>
        </button>
        <button
          id="linkedin"
          onClick={() => handleLinkClick('https://www.linkedin.com/in/feliipenevesnow/')}
          aria-label="Meu LinkedIn"
          title="Meu LinkedIn"
        >
          <FaLinkedin className="icone" />
          <span>LinkedIn</span>
        </button>
        <button
          id="github"
          onClick={() => handleLinkClick('https://github.com/feliipenevesnow')}
          aria-label="Meu GitHub"
          title="Meu GitHub"
        >
          <FaGithub className="icone" />
          <span>GitHub</span>
        </button>
      </div>
      <main id="curriculo" ref={contentRef} lang={lang}>
        <header className="cabecalho-curriculo" data-aos="fade-in">
          <h1>Felipe Neves</h1>
          <h2>{T.header.jobTitle}</h2>
          <ul className="lista-contato">
            <li><i className="fa-solid fa-phone"></i> +55 (18) 98171-2939</li>
            <li><i className="fa-solid fa-envelope"></i> feliipenevesnow@gmail.com</li>
            <li><i className="fa-solid fa-location-dot"></i> {T.header.location}</li>
            <li><i className="fa-brands fa-linkedin"></i> linkedin.com/in/feliipenevesnow/</li>
            <li><i className="fa-brands fa-github"></i> github.com/feliipenevesnow</li>
          </ul>
        </header>
        <div className="container-conteudo">
          <section className="secao-principal" id="resumo" data-aos="fade-up">
            <h3>{T.summary.title}</h3>
            <p>{T.summary.body}</p>
          </section>
          <section className="secao-principal" id="experiencia" data-aos="fade-up">
            <h3>{T.experience.title}</h3>
            {T.experience.items.map((item, index) => (
              <article className="item-experiencia" data-aos="fade-up" key={index}>
                <div className="exp-header">
                  <h4>{item.title}</h4>
                  <span><strong>{item.company}</strong> | {item.date}</span>
                </div>
                <ul>
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
          <section className="secao-principal" id="tecnologias" data-aos="fade-up">
            <h3>{T.skills.title}</h3>
            <div className="container-skills">
              {T.skills.categories.map((cat, index) => (
                <div className="skill-categoria" key={index}>
                  <h4>{cat.title}</h4>
                  <div className="tags">{cat.tags}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="secao-principal" id="formacao-cursos" data-aos="fade-up">
            <div className="coluna-formacao">
              <h3>{T.education.title}</h3>
              {T.education.items.map((item, index) => (
                <div className="item-formacao" data-aos="fade-up" key={index}>
                  <strong>{item.degree}</strong>
                  <span>{item.institution}</span>
                  <span>{item.date}</span>
                </div>
              ))}
            </div>
            <div className="coluna-cursos">
              <h3>{T.courses.title}</h3>
              <ul data-aos="fade-up">
                {T.courses.items.map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          </section>
          <section className="secao-principal" id="projetos-idiomas" data-aos="fade-up">
            <div className="coluna-projetos">
              <h3>{T.projects.title}</h3>
              {T.projects.items.map((item, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </div>
            <div className="coluna-idiomas">
              <h3>{T.languages.title}</h3>
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
            ? 'Potencializado com uma ' 
            : 'Powered by a '
          }
          <strong>IA Generativa (Google Gemini)</strong>
          {lang === 'pt'
            ? ' equipada com memória de agente.'
            : ' equipped with agent memory.'
          }
        </p>
      </footer>
    </>
  );
}
export default App;