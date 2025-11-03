import { useState, useRef, useEffect, useCallback } from 'react';
import { SiOpenai } from 'react-icons/si';
import { FaTrash } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type Content } from '@google/generative-ai';
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
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
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
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
        generationConfig,
        safetySettings,
      });
      const responseText = result.response.text();
      const botMessage: Message = { sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro Gemini:", error);
      let msg = "⚠️ Ocorreu um erro ao processar sua mensagem.";
      if (error instanceof Error && error.message.includes('API key not valid')) {
        msg = "❌ Chave da API inválida. Verifique o arquivo .env.local.";
      } else if (error instanceof Error && error.message.includes('quota')) {
        msg = "⚠️ Limite de uso atingido. Tente novamente mais tarde.";
      } else if (error instanceof Error && error.message.includes('404')) {
        msg = "❌ Modelo não encontrado. Avise o Felipe para corrigir.";
      }
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
