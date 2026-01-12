import { useState, useRef, useEffect, useCallback } from 'react';
import { SiOpenai } from 'react-icons/si';
import { FaTrash } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { systemPrompt } from '../data/systemPrompt';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

type ChatbotProps = {
  isOpen: boolean;
  onClose: () => void;
  lang: 'pt' | 'en';
};

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API_KEY carregada:", API_KEY ? "✅ OK" : "❌ FALTA DEFINIR");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export function Chatbot({ isOpen, onClose, lang }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('chatHistory');
      if (stored) setMessages(JSON.parse(stored));
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } else if (isOpen && messages.length === 0) {
      localStorage.removeItem('chatHistory');
    }
  }, [messages, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    setQuery('');
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  }, []);

  const prevLangRef = useRef(lang);
  useEffect(() => {
    if (prevLangRef.current && prevLangRef.current !== lang) {
      console.log(`Idioma trocado de ${prevLangRef.current} para ${lang}. Limpando histórico.`);
      handleClearChat();
    }
    prevLangRef.current = lang;
  }, [lang, handleClearChat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setQuery('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const langInstruction = lang === 'pt'
        ? "INSTRUÇÃO IMPORTANTE: Responda a esta nova mensagem (e todas as futuras) estritamente em Português (Brasil)."
        : "IMPORTANT INSTRUCTION: You must reply to this new message (and all future messages) strictly in English.";

      const historyLabel = lang === 'pt' ? "Histórico da conversa:" : "Conversation history:";
      const newUserLabel = lang === 'pt' ? "Nova mensagem do usuário:" : "New user message:";
      const userLabel = lang === 'pt' ? "Usuário" : "User";
      const assistantLabel = lang === 'pt' ? "Assistente" : "Assistant";

      const fullPrompt = `${systemPrompt}\n
${langInstruction}\n\n
${historyLabel}\n${updatedMessages
          .map(m => (m.sender === 'user' ? `${userLabel}: ${m.text}` : `${assistantLabel}: ${m.text}`))
          .join('\n')}
${newUserLabel}
${query}`;

      console.group("🤖 Gemini Interaction Debug");
      console.log("📝 Full Prompt sent to API:", fullPrompt);
      console.log("💬 Current Messages State:", updatedMessages);
      console.log("🔑 API Key Present:", !!API_KEY);
      console.groupEnd();

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        generationConfig,
        safetySettings,
      });

      const responseText = result.response.text();
      const botMessage: Message = { sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("❌ Erro Gemini Detalhado:", error);
      console.group("❌ Error Debug Info");
      // @ts-ignore
      if (error?.message) console.error("Message:", error.message);
      // @ts-ignore
      if (error?.stack) console.error("Stack:", error.stack);
      // @ts-ignore
      if (error?.response) console.error("Response data:", error.response);
      console.groupEnd();

      // Mensagens de erro em Português
      const errorMessagesPt = [
        "Oi! Então, agora não consigo responder. Podemos conversar mais tarde 😅?",
        "Opa! No momento não consigo falar, mas tenta me chamar daqui a pouco 👋?",
        "Ei! Tô meio enrolado agora. Vamos bater papo em outro horário 🕐?",
        "Desculpa, agora não vai dar pra responder. Me chama mais tarde 📲?",
        "Fala! Agora tá meio corrido, mas volta depois que a gente conversa 🏃‍♂️!",
        "Oiê! Não tô conseguindo processar mensagens agora. Tenta de novo depois 🔄?",
        "Eita, agora não consigo te dar atenção. Vamos tentar mais tarde 🤝?",
        "Ops! Tô indisponível no momento. Me manda mensagem depois 📩?",
        "Olá! Agora não consigo responder, mas em breve estarei de volta ⏳!",
        "Poxa, agora não consigo falar. A gente pode retomar esse papo depois 💬?"
      ];

      // Error messages in English
      const errorMessagesEn = [
        "Hey! So, I can't reply right now. Can we talk later 😅?",
        "Oops! I can't talk at the moment, but try calling me in a bit 👋?",
        "Hey! I'm a bit tied up right now. Let's chat another time 🕐?",
        "Sorry, can't answer right now. Hit me up later 📲?",
        "Yo! Things are a bit crazy right now, come back later and we'll talk 🏃‍♂️!",
        "Hi there! I can't process messages right now. Try again later 🔄?",
        "Whoops, can't give you my attention right now. Let's try later 🤝?",
        "Oops! I'm unavailable at the moment. Message me later 📩?",
        "Hello! I can't reply right now, but I'll be back soon ⏳!",
        "Aw, I can't talk right now. Can we pick this up later 💬?"
      ];

      // Escolhe a lista baseada no idioma
      const messagesList = lang === 'pt' ? errorMessagesPt : errorMessagesEn;

      // Escolhe uma mensagem aleatória
      let msg = messagesList[Math.floor(Math.random() * messagesList.length)];



      setMessages(prev => [...prev, { sender: 'bot', text: msg }]);

    } finally {
      setIsLoading(false);
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.target as HTMLTextAreaElement).form?.requestSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-window" data-aos="fade-up" data-aos-duration="300">
      {/* Cabeçalho */}
      <div className="chatbot-header">
        <SiOpenai />
        <span>Felipe Neves</span>
        <button onClick={handleClearChat} className="chatbot-clear-btn" aria-label="Limpar">
          <FaTrash />
        </button>
        <button onClick={onClose} className="chatbot-close-btn" aria-label="Fechar">
          ×
        </button>
      </div>

      {/* Aviso do Plano Gratuito */}
      <div className="chatbot-warning" style={{
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 165, 0, 0.3)',
        padding: '8px 12px',
        fontSize: '0.75rem',
        color: '#ffb74d',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        lineHeight: '1.4'
      }}>
        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
        <span>
          {lang === 'pt'
            ? "⚠️ Modo Gratuito: Sujeito a instabilidade e limites. Se parar, tente mais tarde!"
            : "⚠️ Free Mode: Subject to instability and limits. If it stops, try again later!"}
        </span>
      </div>

      {/* Corpo */}
      <div className="chatbot-messages">
        {/* ⬇️ CORREÇÃO: Mensagem inicial dinâmica baseada em 'lang' */}
        {messages.length === 0 && !isLoading && (
          <div className="message message-bot">
            {lang === 'pt'
              ? "Olá! Tudo bem com você? Espero que sim 😄! Como posso te ajudar? Gostaria de saber o que sobre mim?"
              : "Hello! How are you? I hope you're doing well 😄! How can I help you? What would you like to know about me?"
            }
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender === 'bot' ? 'message-bot' : 'message-user'}`}>
            <div className="markdown-message">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message message-bot">
            <span className="typing-indicator"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Entrada */}
      <form className="chatbot-input-form" onSubmit={handleSend}>
        <textarea
          ref={textareaRef}
          className="chatbot-textarea"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={isLoading ? "Pensando..." : "Digite sua pergunta..."}
          disabled={isLoading}
          aria-label="Digite sua pergunta"
        />
        <button type="submit" disabled={isLoading || !query.trim()} aria-label="Enviar">
          <IoSend />
        </button>
      </form>
    </div>
  );
}
