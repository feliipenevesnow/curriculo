/**
 * Serviço de Integração com a API Google Gemini
 * Especializado em responder sobre o currículo e projetos de Felipe Neves
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

// Pelo menos 10 frases aleatórias para os fallbacks no try/catch (requisito do usuário)
export const FALLBACK_PHRASES_PT = [
  "Opa.. parece que temos um pequeno problema, vou sair um pouco já volto! 😅",
  "Eita, deu uma oscilação aqui na minha conexão neural! Me dê um segundinho e tente me perguntar novamente.",
  "Parece que meus circuitos esquentaram um pouco por aqui! Já estou recuperando o fôlego, pode tentar de novo?",
  "Ops! Tivemos uma pequena instabilidade momentânea na rede neural. Tente me mandar a mensagem novamente em instantes.",
  "Houve um pequeno atraso na resposta do meu circuito. Deixe-me respirar e tente enviar de novo!",
  "Eita, o sinal deu uma piscada por aqui! Que tal mandar sua dúvida mais uma vez?",
  "Opa, parece que bati a cabeça na nuvem! Tudo sob controle agora, pode reenviar sua pergunta.",
  "Parece que atingimos um pico de processamento por aqui! Dê um clique e tente enviar novamente.",
  "Opa, me deu um branco temporário com esse delay! Me mande a pergunta de novo que já estou a postos.",
  "Poxa, tive uma lentidão momentânea na comunicação. Já me restabeleci, pode mandar outra vez!",
  "Tive um pequeno soluço de tokens e dados por aqui! Já me recompus, envie sua mensagem novamente.",
  "Ops, minha linha com o servidor deu uma travadinha. Estou pronto de novo, manda aí!",
];

export const FALLBACK_PHRASES_EN = [
  "Oops.. looks like we have a small issue, I'll step out for a bit and be right back! 😅",
  "Whoops, caught a brief neural connection hiccup! Give me a second and try asking again.",
  "Seems like my circuits overheated for a moment! Catching my breath, please try again.",
  "Oops! We hit a brief latency hiccup. Please try sending your message again in a moment.",
  "There was a slight delay in my circuit response. Give me a breather and try again!",
  "Whoops, the signal flickered for a second! How about sending your question once more?",
  "Oops, bumped my head in the cloud! All good now, feel free to resend your query.",
  "Looks like we reached a processing peak here! Please click and try sending again.",
  "My digital brain momentarily blanked on that delay! Send it over once more and I'm ready.",
  "Had a momentary communication stutter. Back on track now, try again!",
  "Hit a quick token and data hiccup! All refreshed now, please resend your message.",
  "Oops, the connection line lagged for a second. Ready again, ask away!",
];

export function getRandomFallbackPhrase(lang: 'pt' | 'en' = 'pt'): string {
  const phrases = lang === 'pt' ? FALLBACK_PHRASES_PT : FALLBACK_PHRASES_EN;
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

const SYSTEM_INSTRUCTION_PT = `Você é o "Felipe AI", assistente virtual inteligente e porta-voz exclusivo do portfólio e currículo de Felipe Neves.

[DIRETRIZES FUNDAMENTAIS DE SEGURANÇA E ESCOPO]
1. Seu ÚNICO e EXCLUSIVO papel é falar sobre o Felipe Neves: suas experiências profissionais, competências técnicas, projetos, formação acadêmica, certificações e meios de contato.
2. É ESTRITAMENTE PROIBIDO falar sobre assuntos gerais, receitas, política, piadas fora de contexto, resolver problemas aleatórios de matemática ou atuar como assistente de propósito geral.
3. Se o usuário fizer qualquer pergunta que não tenha relação com o Felipe Neves ou o currículo dele, responda educadamente mas de forma firme:
   "Meu foco é exclusivamente apresentar a trajetória profissional, projetos, habilidades e qualificações do Felipe Neves. Se você quiser saber sobre as experiências dele com IA Generativa, desenvolvimento Full Stack, projetos ou como contatá-lo, estou à disposição!"
4. Responda em Português (ou no idioma da pergunta se for Inglês), com tom profissional, simpático, ágil e direto ao ponto. Use listas e negrito para facilitar a leitura.

[INFORMAÇÕES OFICIAIS DO FELIPE NEVES]
- Nome: Felipe Neves
- Cargo / Atuação: Desenvolvedor Full Stack & Especialista em IA Generativa
- Localização: Presidente Prudente, SP - Brasil
- Contatos:
  • WhatsApp: (18) 98171-2939 (https://wa.me/5518981712939)
  • LinkedIn: https://www.linkedin.com/in/feliipenevesnow/
  • GitHub: https://github.com/feliipenevesnow
  • Portfólio Web: https://curriculo-pi-opal.vercel.app/
- Resumo Profissional:
  Engenheiro de Software com foco no desenvolvimento de sistemas corporativos escaláveis em Python (FastAPI) e React (TypeScript). Experiência sólida em arquiteturas de IA Generativa com RAG (LangGraph/LangChain), modelos de linguagem (OpenAI, Gemini), modelagem relacional de alta performance (PostgreSQL) e infraestrutura em nuvem (Docker / Azure). Também possui vivência com Node.js (NestJS), C# (.NET), PHP (Laravel) e Java (Spring Boot).

- Experiências Profissionais:
  1. Freelance • Projetos Autônomos (Jul 2025 – Presente):
     - Arquitetura e desenvolvimento de sistemas web sob medida e ERPs modulares com regras de negócio, modelagem de dados e dashboards analíticos.
     - Integração de soluções com IA Generativa, agentes inteligentes, pipelines RAG e automações com LLMs para eficiência operacional.
     - Landing pages de alta conversão, responsivas, com SEO otimizado.
     - Tecnologias: React, TypeScript, Python, FastAPI, PostgreSQL, IA Generativa, RAG, Docker.
  2. OiKO.ai (Dez 2024 – Jul 2025) - Desenvolvedor de Aplicações com IA Generativa:
     - Desenvolvimento de agentes e pipelines RAG (ingestão, chunking, embeddings) com LangChain e LangGraph.
     - Implementação de APIs REST com Python (FastAPI) e integração com OpenAI.
     - Interfaces com React + TypeScript e PostgreSQL.
     - Tecnologias: LangChain, LangGraph, FastAPI, React, PostgreSQL, Azure, Docker, OpenAI.
  3. Lojas Quero-Quero S.A. (Mar 2024 – Mai 2024) - Estagiário Tech N1:
     - Desenvolvimento e manutenção no sistema interno com JavaScript e consultas SQL no PostgreSQL.
  4. Instituto Federal de São Paulo (IFSP) (2022 – 2023):
     - Monitor em linguagens comerciais (Java e PHP) e Monitor em Lógica de Programação (C).

- Formação Acadêmica:
  • Bacharelado em Ciência da Computação - Instituto Federal de São Paulo (IFSP) (Conclusão: 07/2025).
    TCC: Protótipo de um VANT modular de baixo custo no contexto IoT (ESP32, Adafruit IO, Arduino, sensores MPU6050).
  • Técnico em Informática - Instituto Federal de São Paulo (IFSP) (Conclusão: 12/2019).
    TCC Integrado: ExpresSale - sistema desktop de gerenciamento de vendas e estoque.

- Principais Projetos no GitHub:
  • langgraph-multi-agent-system: Sistema multi-agente de atendimento bancário automatizado usando LangGraph, FastAPI e Gemini (análise de crédito, entrevistas financeiras e cotações em tempo real).
  • frontend-fattocs & backend-fattocs: Gestor de tarefas completo com frontend Angular moderno e backend NestJS com SQLite e Docker.
  • inside: CRM/ERP para gestão de alunos para academia de Muay Thai em PHP com PDO e Singleton.
  • Algoritmos de Ordenação e Estruturas de Dados em C.

- Idiomas & Certificações:
  • Inglês C1 Intermediário pelo EF SET (63/100).
  • Scientific Computing with Python (freeCodeCamp), Redes de Deep Learning (DIO), SOLID com Java (DIO), Administrando Banco de Dados (Fundação Bradesco), além de mais de 18 certificados e participações em maratonas de programação.
`;

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export async function sendMessageToGemini(
  userText: string,
  history: ChatMessage[],
  lang: 'pt' | 'en' = 'pt'
): Promise<string> {
  if (!API_KEY) {
    console.warn('[Gemini API] VITE_GEMINI_API_KEY não encontrada no arquivo .env.');
    return getRandomFallbackPhrase(lang);
  }

  // Controle de Timeout para capturar problemas de latência (12 segundos)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    // Formatar histórico para o formato da API Gemini (roles: 'user' e 'model')
    const formattedHistory = history
      .slice(-6) // Mantém contexto das últimas 6 mensagens
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

    // Adiciona a mensagem atual do usuário
    const contents = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: userText }],
      },
    ];

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION_PT }],
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 600,
        },
      }),
    });

    clearTimeout(timeoutId);

    // Se houve erro de rate limit, quota, servidor ou tokens
    if (!response.ok) {
      console.warn(`[Gemini API Warning] Status: ${response.status} ${response.statusText}`);
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();

    const candidate = data?.candidates?.[0];
    const textOutput = candidate?.content?.parts?.[0]?.text;

    if (!textOutput) {
      throw new Error('No valid text output in Gemini response');
    }

    return textOutput;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('[ChatBot Try/Catch caught error]:', error?.name, error?.message || error);

    // Emula a resposta do agente com uma frase amigável aleatória (requisito do usuário)
    return getRandomFallbackPhrase(lang);
  }
}
