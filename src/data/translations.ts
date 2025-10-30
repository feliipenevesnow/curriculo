export interface TranslationData {
  btnDownload: string;
  btnLang: string;
  header: {
    jobTitle: string;
    location: string;
  };
  summary: {
    title: string;
    body: string;
  };
  experience: {
    title: string;
    items: {
      title: string;
      company: string;
      date: string;
      description: string[];
    }[];
  };
  skills: {
    title: string;
    categories: {
      title: string;
      tags: string;
    }[];
  };
  education: {
    title: string;
    items: {
      degree: string;
      institution: string;
      date: string;
    }[];
  };
  courses: {
    title: string;
    items: string[];
  };
  projects: {
    title: string;
    items: string[];
  };
  languages: {
    title: string;
    items: string[];
  };
}

type Translations = {
  pt: TranslationData;
  en: TranslationData;
};

export const translations: Translations = {
  pt: {
    btnDownload: 'Baixar como PDF',
    btnLang: 'Mudar para Inglês',
    header: {
      jobTitle: 'Desenvolvedor de Aplicações com IA & Software Full-Stack',
      location: 'Presidente Epitácio, SP',
    },
    summary: {
      title: 'Resumo Profissional',
      body: 'Recém-formado em Ciência da Computação (IFSP) com trajetória iniciada em 2016 no curso técnico. Possuo experiência prática e recente como Desenvolvedor de Aplicações com IA Generativa, dominando o ecossistema de LLMs (RAG, LangChain, Agentes). Tenho perfil full-stack, com projetos em NodeJS, Angular, React e Python (FastAPI), e busco uma oportunidade para aplicar meu conhecimento em IA e desenvolvimento de software para criar soluções de alto impacto.',
    },
    experience: {
      title: 'Experiência Profissional',
      items: [
        {
          title: 'Desenvolvedor de Aplicações com IA Generativa',
          company: 'Oiko IA (Uni1500)',
          date: '12/2024 – 07/2025',
          description: [
            'Desenvolvimento de soluções com LLMs (OpenAI) e arquiteturas RAG.',
            'Implementação de pipelines de dados e orquestração de agentes com LangChain e LangGraph.',
            'Criação de APIs em FastAPI e integração com front-end React.',
            'Utilização de Microsoft Azure, PostgreSQL e MySQL para infraestrutura de IA.',
          ],
        },
        {
          title: 'Desenvolvimento de Software',
          company: 'Lojas Quero-Quero',
          date: '02/2024 – 05/2024',
          description: [
            'Atuação no desenvolvimento de software com Python e JavaScript.',
            'Colaboração em engenharia de requisitos.',
            'Prática com banco de dados PostgreSQL em ambiente corporativo.',
          ],
        },
        {
          title: 'Desenvolvedor Full-Stack (Website NAPNE)',
          company: 'Instituto Federal de São Paulo (Cliente)',
          date: '09/2023 – 12/2023',
          description: [
            'Desenvolvimento em equipe (Scrum) do website do NAPNE.',
            'Stack: NodeJS (Back-end) com PrismaOrm e Angular (Front-end) com Angular Material.',
            'Infraestrutura com Docker, Nginx, MySQL e Git.',
          ],
        },
        {
          title: 'Desenvolvedor Full-Stack (Portal Fábrica de Software)',
          company: 'Instituto Federal de São Paulo (Cliente)',
          date: '03/2023 – 07/2023',
          description: [
            'Manutenção e evolução do portal da fábrica de software do campus.',
            'Stack: NodeJS (TypeOrm), Angular, Ionic e MySQL.',
            'Documentação com UML e práticas de CI/CD com Git e Docker.',
          ],
        },
        {
          title: 'Monitor de Programação (Java/PHP & Lógica)',
          company: 'Instituto Federal de São Paulo',
          date: '2022 – 2023 (Dois períodos)',
          description: [
            'Monitoria em Lógica de Programação (Linguagem C) e Linguagens Comerciais (Java, PHP).',
            'Desenvolvimento de habilidades de didática, oratória e comunicação.',
          ],
        },
      ],
    },
    skills: {
      title: 'Principais Tecnologias',
      categories: [
        { title: 'IA & Dados', tags: 'IA Generativa, LLMs, RAG, LangChain, LangGraph, Python (Pandas, Numpy), FastAPI' },
        { title: 'Back-end', tags: 'NodeJS, Java (Spring Boot), PHP, Python, C' },
        { title: 'Front-end', tags: 'React, Angular, Ionic, JavaScript, TypeScript, HTML/CSS' },
        { title: 'Banco de Dados', tags: 'PostgreSQL, MySQL, PrismaOrm, TypeOrm' },
        { title: 'DevOps & Infra', tags: 'Docker, Git, Nginx, Linux, Scrum' },
      ],
    },
    education: {
      title: 'Formação Acadêmica',
      items: [
        {
          degree: 'Bacharelado em Ciência da Computação',
          institution: 'Instituto Federal de São Paulo (IFSP)',
          date: '02/2020 – 07/2025',
        },
        {
          degree: 'Técnico em Informática',
          institution: 'Instituto Federal de São Paulo (IFSP)',
          date: '02/2016 – 12/2019',
        },
      ],
    },
    courses: {
      title: 'Formação Complementar (+21)',
      items: [
        '<strong>Scientific Computing with Python</strong> (FreeCodeCamp - 300h)',
        '<strong>Inteligência Artificial - Consultoria de Dados</strong> (Uni1500 - 140h)',
        '<strong>Orange Tech + | BackEnd</strong> (Inter - Bootcamp - 87h)',
        '<strong>Administrando Banco de Dados</strong> (Fundação Bradesco - 15h)',
        '<strong>Ministrante:</strong> Mineração de dados e API Rest com Spring Boot (III SEC)',
      ],
    },
    projects: {
      title: 'Projetos Acadêmicos (TCCs)',
      items: [
        '<strong>Protótipo de um VANT modular de baixo custo no contexto IoT</strong> (TCC Bacharelado, 2025)',
        '<strong>ExpresSale (ES) - sistema de gerenciamento de vendas em Java</strong> (TCC Técnico, 2019)',
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        '<strong>Inglês:</strong> Nível B1 (Intermediário)',
        '<strong>Espanhol:</strong> Nível A1 (Básico)',
      ],
    },
  },

  en: {
    btnDownload: 'Download as PDF',
    btnLang: 'Switch to Portuguese',
    header: {
      jobTitle: 'AI Applications & Full-Stack Software Developer',
      location: 'Presidente Epitácio, SP, Brazil',
    },
    summary: {
      title: 'Professional Summary',
      body: "Recent Computer Science graduate (IFSP) with a trajectory started in 2016 in the technical program. I have practical, recent experience as a Generative AI Application Developer, mastering the LLM ecosystem (RAG, LangChain, Agents). I am a full-stack developer with projects in NodeJS, Angular, React, and Python (FastAPI), seeking an opportunity to apply my knowledge in AI and software development to create high-impact solutions.",
    },
    experience: {
      title: 'Professional Experience',
      items: [
        {
          title: 'Generative AI Application Developer',
          company: 'Oiko IA (Uni1500)',
          date: '12/2024 – 07/2025',
          description: [
            'Developed solutions using LLMs (OpenAI) and RAG architectures.',
            'Implemented data pipelines and agent orchestration with LangChain and LangGraph.',
            'Created APIs in FastAPI and integrated with React front-end.',
            'Utilized Microsoft Azure, PostgreSQL, and MySQL for AI infrastructure.',
          ],
        },
        {
          title: 'Software Developer',
          company: 'Lojas Quero-Quero',
          date: '02/2024 – 05/2024',
          description: [
            'Acted in software development using Python and JavaScript.',
            'Collaborated on requirements engineering.',
            'Practiced with PostgreSQL databases in a corporate environment.',
          ],
        },
        {
          title: 'Full-Stack Developer (NAPNE Website)',
          company: 'Federal Institute of São Paulo (Client)',
          date: '09/2023 – 12/2023',
          description: [
            'Team-based development (Scrum) of the NAPNE website.',
            'Stack: NodeJS (Back-end) with PrismaOrm and Angular (Front-end) with Angular Material.',
            'Infrastructure with Docker, Nginx, MySQL, and Git.',
          ],
        },
        {
          title: 'Full-Stack Developer (Software Factory Portal)',
          company: 'Federal Institute of São Paulo (Client)',
          date: '03/2023 – 07/2023',
          description: [
            'Maintained and evolved the campus software factory portal.',
            'Stack: NodeJS (TypeOrm), Angular, Ionic, and MySQL.',
            'Documentation with UML and CI/CD practices using Git and Docker.',
          ],
        },
        {
          title: 'Programming Tutor (Java/PHP & Logic)',
          company: 'Federal Institute of São Paulo',
          date: '2022 – 2023 (Two terms)',
          description: [
            'Tutored in Programming Logic (C Language) and Commercial Languages (Java, PHP).',
            'Developed skills in teaching, public speaking, and communication.',
          ],
        },
      ],
    },
    skills: {
      title: 'Core Technologies',
      categories: [
        { title: 'AI & Data', tags: 'Generative AI, LLMs, RAG, LangChain, LangGraph, Python (Pandas, Numpy), FastAPI' },
        { title: 'Back-end', tags: 'NodeJS, Java (Spring Boot), PHP, Python, C' },
        { title: 'Front-end', tags: 'React, Angular, Ionic, JavaScript, TypeScript, HTML/CSS' },
        { title: 'Databases', tags: 'PostgreSQL, MySQL, PrismaOrm, TypeOrm' },
        { title: 'DevOps & Infra', tags: 'Docker, Git, Nginx, Linux, Scrum' },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          degree: 'B.Sc. in Computer Science',
          institution: 'Federal Institute of São Paulo (IFSP)',
          date: '02/2020 – 07/2025',
        },
        {
          degree: 'Technical Degree in Informatics',
          institution: 'Federal Institute of São Paulo (IFSP)',
          date: '02/2016 – 12/2019',
        },
      ],
    },
    courses: {
      title: 'Complementary Education (+21)',
      items: [
        '<strong>Scientific Computing with Python</strong> (FreeCodeCamp - 300h)',
        '<strong>Artificial Intelligence - Data Consulting</strong> (Uni1500 - 140h)',
        '<strong>Orange Tech + | BackEnd</strong> (Inter - Bootcamp - 87h)',
        '<strong>Database Administration</strong> (Fundação Bradesco - 15h)',
        '<strong>Speaker:</strong> Data Mining and API Rest with Spring Boot (III SEC)',
      ],
    },
    projects: {
      title: 'Academic Projects (Theses)',
      items: [
        '<strong>Prototype of a low-cost modular UAV in an IoT context</strong> (B.Sc. Thesis, 2025)',
        '<strong>ExpresSale (ES) - sales management system in Java</strong> (Technical Thesis, 2019)',
      ],
    },
    languages: {
      title: 'Languages',
      items: [
        '<strong>English:</strong> B1 Level (Intermediate)',
        '<strong>Spanish:</strong> A1 Level (Basic)',
      ],
    },
  },
};