import React, { useState, useRef, useEffect } from 'react';
import {
  FaRobot,
  FaPaperPlane,
  FaTrashAlt,
  FaRegCommentDots,
  FaBrain,
  FaChevronDown,
} from 'react-icons/fa';
import { sendMessageToGemini, type ChatMessage } from '../services/gemini';
import './ChatBot.css';

interface ChatBotProps {
  lang: 'pt' | 'en';
}

export const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getInitialMessage = (): ChatMessage => ({
    id: 'msg-welcome',
    sender: 'bot',
    text:
      lang === 'pt'
        ? 'Olá! 👋 Sou o **Felipe AI**, assistente virtual exclusivo do portfólio de Felipe Neves.\n\nEstou aqui para tirar qualquer dúvida sobre a trajetória dele, habilidades técnicas em **Full Stack & IA Generativa**, projetos desenvolvidos e formas de contato.\n\nComo posso ajudar você hoje?'
        : 'Hello! 👋 I am **Felipe AI**, the exclusive virtual assistant for Felipe Neves’s portfolio.\n\nI am here to answer any questions about his background, core technical skills in **Full Stack & Generative AI**, featured projects, and contact channels.\n\nHow can I help you today?',
    timestamp: new Date(),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);

  // Atualiza mensagem inicial se idioma mudar e usuário ainda não tiver mandado mensagens
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'msg-welcome') {
      setMessages([getInitialMessage()]);
    }
  }, [lang]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Foco no input ao abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const quickPrompts =
    lang === 'pt'
      ? [
          'Qual é a sua stack principal?',
          'Me conte sobre seus projetos com IA',
          'Qual é a sua experiência profissional?',
          'Como posso entrar em contato?',
        ]
      : [
          'What is your core tech stack?',
          'Tell me about your AI projects',
          'What is your professional experience?',
          'How can I get in touch?',
        ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    setHasInteracted(true);
    setInputText('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Chama o serviço do Gemini com try/catch interno que já retorna uma das 10+ frases de fallback
      const responseText = await sendMessageToGemini(messageContent, updatedMessages, lang);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Fallback de segurança adicional caso ocorra qualquer exceção na renderização
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text:
          lang === 'pt'
            ? 'Opa.. parece que temos um pequeno problema, vou sair um pouco já volto! 😅'
            : "Oops.. looks like we have a small issue, I'll step out for a bit and be right back! 😅",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([getInitialMessage()]);
  };

  // Renderizador simples de markdown (negrito, links, quebra de linha)
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Converte links e negritos simples
      let formatted = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      formatted = formatted.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      return (
        <span key={lineIdx} className="chat-text-line">
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
          {lineIdx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="chatbot-executive-wrapper">
      {/* Botão Flutuante (FAB) */}
      {!isOpen && (
        <div className="chatbot-fab-container">
          {!hasInteracted && (
            <div className="chatbot-pill-preview" onClick={() => setIsOpen(true)}>
              <span className="sparkle-icon">✨</span>
              <span>{lang === 'pt' ? 'Pergunte à IA do Felipe' : 'Ask Felipe’s AI'}</span>
            </div>
          )}
          <button
            type="button"
            className="chatbot-fab-btn"
            onClick={() => setIsOpen(true)}
            aria-label={lang === 'pt' ? 'Abrir Chatbot com IA' : 'Open AI Chatbot'}
            title={lang === 'pt' ? 'Falar com Felipe AI' : 'Talk with Felipe AI'}
          >
            <div className="fab-icon-glow" />
            <FaBrain className="fab-icon-main" />
            <span className="fab-online-dot" />
          </button>
        </div>
      )}

      {/* Janela do Chatbot */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-identity">
              <div className="chatbot-avatar-frame">
                <FaRobot className="chatbot-avatar-icon" />
                <span className="status-online-beacon" />
              </div>
              <div className="chatbot-header-titles">
                <div className="chatbot-title-row">
                  <h3 className="chatbot-title">Felipe AI</h3>
                  <span className="chatbot-badge">Gemini 2.5</span>
                </div>
                <p className="chatbot-subtitle">
                  {lang === 'pt'
                    ? 'Especialista no meu currículo & projetos'
                    : 'Specialist in my resume & projects'}
                </p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                className="chatbot-action-btn"
                onClick={handleClearChat}
                title={lang === 'pt' ? 'Limpar conversa' : 'Clear conversation'}
              >
                <FaTrashAlt />
              </button>
              <button
                type="button"
                className="chatbot-action-btn"
                onClick={() => setIsOpen(false)}
                title={lang === 'pt' ? 'Minimizar chat' : 'Minimize chat'}
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          {/* Histórico de Mensagens */}
          <div className="chatbot-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row ${msg.sender === 'user' ? 'user-side' : 'bot-side'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="msg-bot-avatar">
                    <FaRobot />
                  </div>
                )}
                <div className={`chat-bubble ${msg.sender}`}>
                  <div className="chat-bubble-content">
                    {renderFormattedText(msg.text)}
                  </div>
                  <div className="chat-bubble-time">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-row bot-side">
                <div className="msg-bot-avatar">
                  <FaRobot />
                </div>
                <div className="chat-bubble bot typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sugestões Rápidas */}
          {messages.length <= 3 && !isLoading && (
            <div className="chatbot-suggestions-bar">
              <span className="suggestions-label">
                <FaRegCommentDots /> {lang === 'pt' ? 'Sugestões rápidas:' : 'Quick questions:'}
              </span>
              <div className="suggestions-chips-row">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="suggestion-chip-btn"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulário de Envio */}
          <form
            className="chatbot-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              className="chatbot-text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                lang === 'pt'
                  ? 'Pergunte sobre minha experiência, projetos, stack...'
                  : 'Ask about my experience, projects, stack...'
              }
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!inputText.trim() || isLoading}
              aria-label={lang === 'pt' ? 'Enviar mensagem' : 'Send message'}
            >
              <FaPaperPlane />
            </button>
          </form>

          {/* Nota de rodapé / Scope notice */}
          <div className="chatbot-footer-notice">
            <span>
              {lang === 'pt'
                ? '🔒 Assistente focado estritamente no perfil profissional de Felipe Neves.'
                : '🔒 Assistant strictly scoped to Felipe Neves’s professional profile.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
