export interface ProjectItem {
  title: string;
  description: string;
  details: string;
  techs: string[];
  repoUrl?: string; // Optional repo link
  deployUrl?: string; // Optional live demo link
}

export interface TranslationData {
  btnDownload: string;
  btnLang: string;
  btnTalk: string;
  btnViewMore: string;
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
      tccTitle?: string;
      tccDescription?: string;
      tccImage?: string; // 'vant' | 'expressale'
    }[];
  };
  courses: {
    title: string;
    items: string[];
  };
  projects: {
    title: string;
    items: ProjectItem[];
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
    btnTalk: 'Fale comigo!',
    btnViewMore: 'Ver Detalhes',
    header: {
      jobTitle: 'Desenvolvedor Full Stack • IA Generativa',
      location: 'Presidente Epitácio, SP',
    },
    summary: {
      title: 'Resumo Profissional',
      body: 'Cientista da Computação recém-formado com sólida base e experiência prática em IA Generativa, Desenvolvimento Full Stack e IoT. Com histórico comprovado no desenvolvimento de soluções integradas com LLMs (RAG, Agents) e sistemas web robustos. Busco aplicar minha paixão por tecnologia e minha capacidade de resolução de problemas complexos para entregar soluções de alto impacto.',
    },
    experience: {
      title: 'Experiência Profissional',
      items: [
        {
          title: 'Desenvolvedor de Aplicações com IA Generativa',
          company: 'OiKO.ai',
          date: 'Dez 2024 - Jul 2025',
          description: [
            'Atuei na criação de soluções inovadoras baseadas em LLMs e técnicas de RAG (Retrieval-Augmented Generation).',
            'Desenvolvi aplicações utilizando LangChain, LangGraph e FastAPI, integrando modelos da OpenAI com agentes inteligentes.',
            'Contribuí na construção de interfaces com React e JavaScript, e na integração com bancos de dados relacionais como PostgreSQL e MySQL.',
            'Techs: LangChain, LangGraph, FastAPI, React, Azure, OpenAI.',
          ],
        },
        {
          title: 'Estagiário Tech N1',
          company: 'Lojas Quero-Quero S.A.',
          date: 'Mar 2024 - Mai 2024',
          description: [
            'Atuei no desenvolvimento de software, aplicando e aprimorando habilidades técnicas em um ambiente corporativo.',
            'Participei da engenharia de requisitos e otimização de processos.',
            'Techs: JavaScript, PostgreSQL.',
          ],
        },
        {
          title: 'Monitor em linguagens de programação comerciais – Java/PHP',
          company: 'Instituto Federal de São Paulo - IFSP',
          date: 'Mar 2023 - Nov 2023',
          description: [
            'Auxiliei no aprendizado de Java e PHP, usando métodos didáticos diferenciados para engajar os alunos e prepará-los para o mercado.',
            'Contribuí diretamente para o aprendizado acadêmico e aprimorei habilidades de comunicação e ensino.',
            'Techs: Java, PHP, POO, Ensino.',
          ],
        },
        {
          title: 'Monitor em Lógica de Programação',
          company: 'Instituto Federal de São Paulo - IFSP',
          date: 'Mar 2022 - Nov 2022',
          description: [
            'Utilizei métodos inovadores de ensino para facilitar a compreensão da lógica de programação pelos alunos.',
            'Desenvolvi habilidades de comunicação e didática ao explicar conceitos fundamentais de algoritmos.',
            'Techs: Lógica de Programação, C, Metodologias de Ensino.',
          ],
        },
      ],
    },
    skills: {
      title: 'Habilidades Técnicas',
      categories: [
        {
          title: 'Linguagens & Core',
          tags: 'JavaScript (ES6+), TypeScript, Python, Java, C/C++, HTML5/CSS3, SQL.',
        },
        {
          title: 'Frameworks & Libs',
          tags: 'React.js, Node.js, FastAPI, Spring Boot, TailwindCSS, Next.js.',
        },
        {
          title: 'IA & Dados',
          tags: 'LangChain, OpenAI API, RAG (Retrieval-Augmented Generation), Pandas/NumPy, Vetores & Embeddings.',
        },
        {
          title: 'Ferramentas & DevOps',
          tags: 'Git/GitHub, Docker, Azure, Linux, VS Code, Postman.',
        },
      ],
    },
    education: {
      title: 'Formação Acadêmica',
      items: [
        {
          degree: 'Bacharelado em Ciência da Computação',
          institution: 'Instituto Federal de São Paulo',
          date: 'Conclusão: 07/2025',
          tccTitle: 'TCC - Protótipo de um VANT modular de baixo custo no contexto IoT',
          tccDescription: 'Neste trabalho, desenvolvi um protótipo funcional de um VANT de baixo custo, usando componentes acessíveis como o Arduino UNO e o ESP32. O VANT pode ser controlado remotamente por um celular, graças à integração com a plataforma Adafruit IO. O principal objetivo foi criar uma base simples, mas funcional, que possa ser melhorada no futuro com novas peças e funções.',
          tccImage: 'vant',
        },
        {
          degree: 'Técnico em Informática',
          institution: 'Instituto Federal de São Paulo',
          date: 'Conclusão: 12/2019',
          tccTitle: 'TCC Integrado - ExpresSale: sistema de gerenciamento de vendas',
          tccDescription: 'O projeto teve como objetivo o desenvolvimento de um software de gestão de vendas, onde foram identificados e solucionados problemas em uma empresa por meio de um sistema controlado. A prototipação e implementação do software resultaram em avanços significativos, incluindo a criação do modelo de dados e do modelo de classes.',
          tccImage: 'expressale',
        },
      ],
    },
    courses: {
      title: 'Certificações & Conquistas',
      items: [
        '<strong>Scientific Computing with Python</strong> - freeCodeCamp (2024)',
        '<strong>Ministrante: Minicurso API Rest com Spring Boot</strong> - IFSP (Mai 2023)',
        '<strong>Ministrante: Minicurso Mineração de Dados: Regras de Associação</strong> - IFSP (Mai 2023)',
        '<strong>Introdução ao Mercado Financeiro</strong> - IFSP (Out 2023)',
        '<strong>Mesa redonda: Projeto JouleWatch</strong> - IFSP (Out 2023)',
        '<strong>Minicurso: Introdução ao uso da Ferramenta Looker</strong> - IFSP (Out 2023)',
        '<strong>Minicurso: Introdução à modelagem 3d com Three.js</strong> - IFSP (Out 2023)',
        '<strong>Palestra: Fundamentos do Machine Learning</strong> - IFSP (Out 2023)',
        '<strong>Palestra: Startups - potencializando com IA</strong> - IFSP (Out 2023)',
        '<strong>Aprenda sobre S.O.L.I.D. com Java</strong> - DIO (Ago 2023)',
        '<strong>Ganhando Produtividade com Stream API</strong> - DIO (Ago 2023)',
        '<strong>Redes de Deep Learning</strong> - DIO (Ago 2023)',
        '<strong>Administrando Banco de Dados</strong> - Fundação Bradesco (Jul 2023)',
        '<strong>Maratona de Programação IFSP</strong> - IFSP (Mai 2023)',
        '<strong>Palestra: Acessibilidade na era digital</strong> - IFSP (Mai 2023)',
        '<strong>Desenvolvimento Avançado em PHP</strong> - DIO (Jan 2023)',
        '<strong>Ganhando Produtividade com Spring Framework</strong> - DIO (Jan 2023)',
        '<strong>Programação para internet com HTML5 e CSS3</strong> - DIO (Jan 2023)',
        '<strong>Palestra: Empreendedorismo na Internet</strong> - IFSP (Nov 2022)',
        '<strong>Palestra: Networking e carreira profissional</strong> - IFSP (Nov 2022)',
        '<strong>V Maratona de Programação InterIF</strong> - IFSP (Out 2022)',
        '<strong>Introdução ao Ionic</strong> - IFSP (Jun 2022)',
        '<strong>Palestra: Pesquisas em Engenharia de Software</strong> - IFSP (Jun 2022)',
        '<strong>Palestra: Segurança Cibernética</strong> - IFSP (Jun 2022)',
      ],
    },
    projects: {
      title: 'Projetos em Destaque',
      items: [
        {
          title: 'langgraph-multi-agent-system',
          description: 'Sistema multi-agente de atendimento bancário automatizado utilizando LangGraph, FastAPI e Gemini.',
          details: 'Orquestração inteligente para análise de crédito, entrevistas financeiras e cotações em tempo real. Utiliza modelos avançados de IA para interação natural.',
          techs: ['Python', 'LangGraph', 'AI'],
          repoUrl: 'https://github.com/feliipenevesnow/langgraph-multi-agent-system'
        },
        {
          title: 'frontend-fattocs',
          description: 'Interface moderna e interativa para gerenciamento de tarefas com Angular.',
          details: 'Desenvolvida com Angular e Angular Material, apresentando formulários reativos, diálogos modais e suporte a reordenação visual de itens.',
          techs: ['TypeScript', 'Angular'],
          repoUrl: 'https://github.com/feliipenevesnow/frontend-fattocs'
        },
        {
          title: 'backend-fattocs',
          description: 'API REST robusta para gestão de tarefas (To-Do List) desenvolvida com NestJS.',
          details: 'Implementa CRUD completo e lógica avançada de reordenação de itens, com persistência em SQLite e suporte a Docker.',
          techs: ['TypeScript', 'NestJS'],
          repoUrl: 'https://github.com/feliipenevesnow/backend-fattocs'
        },
        {
          title: 'inside',
          description: 'Inside CRM: MVP de um sistema de gestão de alunos para academia de Muay Thai.',
          details: 'Desenvolvido em PHP com arquitetura organizada, utilizando PDO e o padrão de projeto Singleton para conexões seguras.',
          techs: ['PHP', 'Singleton', 'PDO'],
          repoUrl: 'https://github.com/feliipenevesnow/inside'
        },
        {
          title: 'Estrutura-de-Dados-2-Ordenacao',
          description: 'Biblioteca de algoritmos de ordenação e busca em C.',
          details: 'Inclui implementações de Bubble, Quick, Heap e Shell Sort, além de busca binária e sequencial, com foco em análise de complexidade.',
          techs: ['C', 'Algorithms'],
          repoUrl: 'https://github.com/feliipenevesnow/Estrutura-de-Dados-2-Ordenacao'
        },
        {
          title: 'Estrutura-de-Dados-1',
          description: 'Implementações de estruturas de dados dinâmicas em C (Fila, Pilha e Lista Encadeada).',
          details: 'Projeto focado no domínio de ponteiros, gerenciamento manual de memória (malloc/free) e lógica de encadeamento.',
          techs: ['C', 'Data Structures'],
          repoUrl: 'https://github.com/feliipenevesnow/Estrutura-de-Dados-1'
        },
        {
          title: 'Stream-Interface-Funcional-Java',
          description: 'Guia prático e referencial sobre Programação Funcional em Java.',
          details: 'Explora o uso profundo da Streams API, Expressões Lambda e as principais interfaces funcionais: Predicate, Function, Consumer, Supplier.',
          techs: ['Java', 'Functional'],
          repoUrl: 'https://github.com/feliipenevesnow/Stream-Interface-Funcional-Java'
        },
        {
          title: 'Aula',
          description: 'Repositório didático utilizado durante monitoria de PHP no IFSP.',
          details: 'Contém módulos práticos de autenticação, sistema de carrinho de compras, gestão de arquivos (upload) e interface.',
          techs: ['PHP', 'Education'],
          repoUrl: 'https://github.com/feliipenevesnow/Aula'
        },
        {
          title: 'Ionic-Frontend',
          description: '(Não Finalizado) Aplicação mobile híbrida desenvolvida com Ionic Framework e Angular.',
          details: 'Exploração de navegação por abas, estruturação de serviços e integração com Capacitor para portabilidade multiplataforma.',
          techs: ['TypeScript', 'Ionic', 'Angular'],
          repoUrl: 'https://github.com/feliipenevesnow/Ionic-Frontend'
        },
        {
          title: 'authentication-nest-backend',
          description: 'API Backend robusta desenvolvida com NestJS para estudo e implementação de autenticação.',
          details: 'Inclui proteção de rotas via Guards, gerenciamento de usuários e arquitetura modular em TypeScript.',
          techs: ['TypeScript', 'NestJS'],
          repoUrl: 'https://github.com/feliipenevesnow/authentication-nest-backend'
        },
        {
          title: 'API-Spring-Rest',
          description: 'API REST para gestão de alunos desenvolvida com Spring Boot.',
          details: 'Inclui CRUD completo, validação de dados com Bean Validation e integração com API externa para busca automática de endereço.',
          techs: ['Java', 'Spring Boot'],
          repoUrl: 'https://github.com/feliipenevesnow/API-Spring-Rest'
        },
        {
          title: 'kiporcao',
          description: 'Cardápio digital interativo de alta performance para o estabelecimento Ki Porção.',
          details: 'Desenvolvido com React, TypeScript e Vite, com sistema de busca em tempo real e filtros por categoria.',
          techs: ['TypeScript', 'React', 'Vite'],
          repoUrl: 'https://github.com/feliipenevesnow/kiporcao'
        },
        {
          title: 'viatabua',
          description: 'Projeto de Landing Page para o Viatábua Bistrô em Presidente Epitácio/SP.',
          details: 'Desenvolvido sem frameworks para garantir leveza e velocidade, focado em HTML e CSS puro.',
          techs: ['CSS', 'HTML'],
          repoUrl: 'https://github.com/feliipenevesnow/viatabua'
        },
        {
          title: 'feliipenevesnow',
          description: 'Meu repositório especial (ReadMe) do GitHub.',
          details: 'Repositório de apresentação do perfil, contendo visão geral, stats e tecnologias.',
          techs: ['Markdown', 'Profile'],
          repoUrl: 'https://github.com/feliipenevesnow/feliipenevesnow'
        },
        {
          title: 'Betabit-Agenda-Frontend',
          description: 'Frontend da Agenda Telefônica (Case Técnico Betabit) com Vue.js 3.',
          details: 'Foco em UX Mobile First, autenticação segura com Route Guards e funcionalidades modernas do Vue 3 Composition API.',
          techs: ['Vue', 'JavaScript'],
          repoUrl: 'https://github.com/feliipenevesnow/Betabit-Agenda-Frontend'
        },
        {
          title: 'Betabit-Agenda-Backend',
          description: 'API RESTful para a Agenda Telefônica com Laravel e PHP.',
          details: 'Implementa autenticação robusta via Sanctum, validação de dados e arquitetura MVC para suporte ao ecossistema.',
          techs: ['PHP', 'Laravel'],
          repoUrl: 'https://github.com/feliipenevesnow/Betabit-Agenda-Backend'
        },
        {
          title: 'curriculo',
          description: 'Currículo online feito para recrutadores analisarem meu perfil.',
          details: 'Projeto atual! Desenvolvido com React, TypeScript, e Vite, integrando IA Generativa e animações.',
          techs: ['TypeScript', 'React'],
          repoUrl: 'https://github.com/feliipenevesnow/curriculo'
        },
        {
          title: 'SOAP',
          description: 'Implementação de um serviço web SOAP em Java.',
          details: 'Fornece operações básicas de calculadora. Projeto desenvolvido para a disciplina de Sistemas Distribuídos.',
          techs: ['Java', 'SOAP'],
          repoUrl: 'https://github.com/feliipenevesnow/SOAP'
        },
        {
          title: 'tinlink',
          description: 'Plataforma para conectar pessoas de Presidente Epitácio a empregos locais.',
          details: 'Permite que cidadãos e empresas se registrem, compartilhem informações e se candidatem a vagas na região.',
          techs: ['TypeScript', 'Platform'],
          repoUrl: 'https://github.com/feliipenevesnow/tinlink'
        },
        {
          title: 'ChatLLM',
          description: 'Aplicação de chat que integra o Bootstrap no frontend e Flask no backend.',
          details: 'Inclui banco de dados MySQL e interações dinâmicas através da API do ChatGPT (OpenAI).',
          techs: ['Python', 'Flask', 'MySQL'],
          repoUrl: 'https://github.com/feliipenevesnow/ChatLLM'
        },
        {
          title: 'Ponto-Flutuante',
          description: 'Simulador de Ponto Flutuante (IEEE 754 Didático) em Java.',
          details: 'Software para visualização e conversão de números decimais para binário em ponto flutuante, demonstrando a mantissa e expoente.',
          techs: ['Java', 'IEEE 754'],
          repoUrl: 'https://github.com/feliipenevesnow/Ponto-Flutuante'
        },
        {
          title: 'projeto-drone',
          description: 'Projeto de análise do impacto da tecnologia de drones (VANTs).',
          details: 'Desenvolvido como parte do curso de Ciência da Computação, focado em controle e automação.',
          techs: ['C++', 'IoT'],
          repoUrl: 'https://github.com/feliipenevesnow/projeto-drone'
        },
        {
          title: 'computacao-grafica-three.js',
          description: 'Aprendizado prático com a biblioteca Three.js.',
          details: 'Repositório focado em experimentos e estudos com computação gráfica 3D usando JavaScript.',
          techs: ['JavaScript', 'Three.js'],
          repoUrl: 'https://github.com/feliipenevesnow/computacao-grafica-three.js'
        },
        {
          title: 'ViewBox-ViewFrustum-Computacao-Grafica',
          description: 'Trabalho de computação gráfica sobre ViewBox e ViewFrustum.',
          details: 'Desenvolvido na matéria de computação gráfica do 6° termo de ciência da computação.',
          techs: ['Python', 'CG'],
          repoUrl: 'https://github.com/feliipenevesnow/ViewBox-ViewFrustum-Computacao-Grafica'
        },
        {
          title: 'Visao-Computacional',
          description: 'Trabalhos acadêmicos de visão computacional em MATLAB/Outros.',
          details: 'Coleção de algoritmos e scripts desenvolvidos durante a disciplina de Visão Computacional.',
          techs: ['MATLAB', 'CV'],
          repoUrl: 'https://github.com/feliipenevesnow/Visao-Computacional'
        },
        {
          title: 'PHP-Orientado-Objeto',
          description: 'Demonstração de proficiência em PHP Orientado a Objetos.',
          details: 'Conjunto de classes que abordam conceitos de herança, titularidade e diferentes tipos de contas bancárias.',
          techs: ['PHP', 'OOP'],
          repoUrl: 'https://github.com/feliipenevesnow/PHP-Orientado-Objeto'
        },
        {
          title: 'Pizzas-Truffle',
          description: 'Sistema em JAVA SWING desenvolvido para a matéria de Ferramentas I.',
          details: 'Aplicação desktop para pizzaria desenvolvida na matéria de Ferramentas de Desenvolvimento I.',
          techs: ['Java', 'Swing'],
          repoUrl: 'https://github.com/feliipenevesnow/Pizzas-Truffle'
        },
        {
          title: 'SOPOO-Game',
          description: 'Jogo Java resultante da interdisciplinaridade entre POO e Sistemas Operacionais.',
          details: 'Implementa concorrência e threads em um ambiente gamificado para demonstrar conceitos teóricos.',
          techs: ['Java', 'Threads', 'Game'],
          repoUrl: 'https://github.com/feliipenevesnow/SOPOO-Game'
        },
        {
          title: 'Estrutura-de-Dados-2-Hash',
          description: 'Estrutura de dados Tabela Hash em C.',
          details: 'Implementação desenvolvida para a matéria de ED2, focada em hashing e tratamento de colisões.',
          techs: ['C', 'Hash'],
          repoUrl: 'https://github.com/feliipenevesnow/Estrutura-de-Dados-2-Hash'
        },
        {
          title: 'Rede-Convolucional',
          description: 'Reconhecimento de dígitos escritos no ar via webcam.',
          details: 'Utiliza MediaPipe para rastreamento gestual e uma Rede Neural Convolucional (CNN) treinada no MNIST.',
          techs: ['Python', 'CNN', 'MediaPipe'],
          repoUrl: 'https://github.com/feliipenevesnow/Rede-Convolucional'
        },
        {
          title: 'SystemFP',
          description: 'Sistema desenvolvido com Java e PrimeFaces.',
          details: 'Interface web rica utilizando o framework PrimeFaces para componentes visuais avançados e backend Java EE.',
          techs: ['Java', 'PrimeFaces', 'Web'],
          repoUrl: 'https://github.com/feliipenevesnow/SystemFP'
        },
        {
          title: 'Multilayer-Perceptron',
          description: 'Rede Neural para classificação espectral de estrelas.',
          details: 'Implementação de MLP desenvolvida na disciplina de Redes Neurais Artificiais para análise de dados astronômicos.',
          techs: ['Python', 'Neural Networks', 'ML'],
          repoUrl: 'https://github.com/feliipenevesnow/Multilayer-Perceptron'
        },
        {
          title: 'Rede-Neural-Perceptron',
          description: 'Implementação básica de Perceptron para estudos.',
          details: 'Código fundamental para entendimento de neurônios artificiais e aprendizado de máquina supervisionado básico.',
          techs: ['Python', 'Neural Networks'],
          repoUrl: 'https://github.com/feliipenevesnow/Rede-Neural-Perceptron'
        },
        {
          title: 'PHP-Pizzas-Truffle',
          description: 'Módulo Web do sistema Pizzas-Truffle.',
          details: 'Interface para clientes realizarem pedidos online, integrando-se com o sistema de gestão desktop em Java.',
          techs: ['PHP', 'Web', 'MySQL'],
          repoUrl: 'https://github.com/feliipenevesnow/PHP-Pizzas-Truffle'
        },
        {
          title: 'Documentacao-FabricaDeSoftware',
          description: 'Site representativo de diagramas de atividades.',
          details: 'Desenvolvido para o Projeto Integrador I, demonstrando processos de manutenção e engenharia de software.',
          techs: ['HTML', 'CSS', 'Docs'],
          repoUrl: 'https://github.com/feliipenevesnow/Documentacao-FabricaDeSoftware'
        }
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        '<strong>Inglês (C1 - Advanced)</strong>: Certificado EF SET (63/100).',
        '<strong>Espanhol (A1 - Básico)</strong>',
      ],
    },
  },

  en: {
    btnDownload: 'Download PDF',
    btnLang: 'Switch to Portuguese',
    btnTalk: 'Talk to me!',
    btnViewMore: 'View Details',
    header: {
      jobTitle: 'Full Stack Developer • Generative AI',
      location: 'Presidente Epitácio, SP, Brazil',
    },
    summary: {
      title: 'Professional Summary',
      body: 'Recent Computer Science graduate with a solid foundation and practical experience in Generative AI, Full Stack Development, and IoT. Proven track record in developing solutions integrated with LLMs (RAG, Agents) and robust web systems. I seek to apply my passion for technology and complex problem-solving skills to deliver high-impact solutions.',
    },
    experience: {
      title: 'Professional Experience',
      items: [
        {
          title: 'Generative AI Applications Developer',
          company: 'OiKO.ai',
          date: 'Dec 2024 - Jul 2025',
          description: [
            'Worked on creating innovative solutions based on LLMs and RAG (Retrieval-Augmented Generation) techniques.',
            'Developed applications using LangChain, LangGraph, and FastAPI, integrating OpenAI models with intelligent agents.',
            'Contributed to building interfaces with React and JavaScript, and integrating with relational databases like PostgreSQL and MySQL.',
            'Techs: LangChain, LangGraph, FastAPI, React, Azure, OpenAI.',
          ],
        },
        {
          title: 'Tech Intern N1',
          company: 'Lojas Quero-Quero S.A.',
          date: 'Mar 2024 - May 2024',
          description: [
            'Worked in software development, applying and improving technical skills in a corporate environment.',
            'Participated in requirements engineering and process optimization.',
            'Techs: JavaScript, PostgreSQL.',
          ],
        },
        {
          title: 'Monitor in Commercial Programming Languages – Java/PHP',
          company: 'Federal Institute of São Paulo - IFSP',
          date: 'Mar 2023 - Nov 2023',
          description: [
            'Assisted in teaching Java and PHP, using differentiated didactic methods to engage students and prepare them for the market.',
            'Contributed directly to students\' academic learning and improved communication and teaching skills.',
            'Techs: Java, PHP, OOP, Teaching.',
          ],
        },
        {
          title: 'Monitor in Logic of Programming',
          company: 'Federal Institute of São Paulo - IFSP',
          date: 'Mar 2022 - Nov 2022',
          description: [
            'Used innovative teaching methods to facilitate students\' understanding of programming logic.',
            'Developed communication and didactic skills by explaining fundamental algorithm concepts.',
            'Techs: Programming Logic, C, Teaching Methodologies.',
          ],
        },
      ],
    },
    skills: {
      title: 'Technical Skills',
      categories: [
        {
          title: 'Languages & Core',
          tags: 'JavaScript (ES6+), TypeScript, Python, Java, C/C++, HTML5/CSS3, SQL.',
        },
        {
          title: 'Frameworks & Libs',
          tags: 'React.js, Node.js, FastAPI, Spring Boot, TailwindCSS, Next.js.',
        },
        {
          title: 'AI & Data',
          tags: 'LangChain, OpenAI API, RAG (Retrieval-Augmented Generation), Pandas/NumPy, Vectors & Embeddings.',
        },
        {
          title: 'Tools & DevOps',
          tags: 'Git/GitHub, Docker, Azure, Linux, VS Code, Postman.',
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        {
          degree: 'B.Sc. in Computer Science',
          institution: 'Federal Institute of São Paulo',
          date: 'Completion: 07/2025',
          tccTitle: 'Capstone - Low-cost Modular UAV Prototype in IoT Context',
          tccDescription: 'Developed a functional low-cost UAV prototype using Arduino UNO and ESP32. The UAV is remotely controlled via mobile phone through the Adafruit IO platform. The goal was to create a simple yet functional base allowing future upgrades. Stabilization is managed by an MPU6050 sensor and PID control system.',
          tccImage: 'vant',
        },
        {
          degree: 'Technical Degree in Informatics',
          institution: 'Federal Institute of São Paulo',
          date: 'Completion: 12/2019',
          tccTitle: 'Integrated Capstone - ExpresSale: Sales Management System',
          tccDescription: 'Objective was to develop a sales management software to solve identified business problems through a controlled system. Prototyping and implementation resulted in significant improvements, including data and class modeling, successfully meeting the company requirements.',
          tccImage: 'expressale',
        },
      ],
    },
    courses: {
      title: 'Certifications & Achievements',
      items: [
        '<strong>Scientific Computing with Python</strong> - freeCodeCamp (2024)',
        '<strong>Speaker: Rest API with Spring Boot Workshop</strong> - IFSP (May 2023)',
        '<strong>Speaker: Data Mining Workshop: Association Rules</strong> - IFSP (May 2023)',
        '<strong>Introduction to Financial Market</strong> - IFSP (Oct 2023)',
        '<strong>Roundtable: JouleWatch Project</strong> - IFSP (Oct 2023)',
        '<strong>Workshop: Introduction to Looker Tool</strong> - IFSP (Oct 2023)',
        '<strong>Workshop: Introduction to 3D Modeling with Three.js</strong> - IFSP (Oct 2023)',
        '<strong>Lecture: Fundamentals of Machine Learning</strong> - IFSP (Oct 2023)',
        '<strong>Lecture: Startups - Empowering with AI</strong> - IFSP (Oct 2023)',
        '<strong>Learn about S.O.L.I.D. with Java</strong> - DIO (Aug 2023)',
        '<strong>Gaining Productivity with Stream API</strong> - DIO (Aug 2023)',
        '<strong>Deep Learning Networks</strong> - DIO (Aug 2023)',
        '<strong>Database Administration</strong> - Fundação Bradesco (Jul 2023)',
        '<strong>IFSP Programming Marathon</strong> - IFSP (May 2023)',
        '<strong>Lecture: Accessibility in the Digital Era</strong> - IFSP (May 2023)',
        '<strong>Advanced PHP Development</strong> - DIO (Jan 2023)',
        '<strong>Gaining Productivity with Spring Framework</strong> - DIO (Jan 2023)',
        '<strong>Internet Programming with HTML5 and CSS3</strong> - DIO (Jan 2023)',
        '<strong>Lecture: Entrepreneurship on the Internet</strong> - IFSP (Nov 2022)',
        '<strong>Lecture: Networking and Professional Career</strong> - IFSP (Nov 2022)',
        '<strong>V InterIF Programming Marathon</strong> - IFSP (Oct 2022)',
        '<strong>Introduction to Ionic</strong> - IFSP (Jun 2022)',
        '<strong>Lecture: Research in Software Engineering</strong> - IFSP (Jun 2022)',
        '<strong>Lecture: Cyber Security</strong> - IFSP (Jun 2022)',
      ],
    },
    projects: {
      title: 'Featured Projects',
      items: [
        {
          title: 'langgraph-multi-agent-system',
          description: 'Automated banking customer service system using intelligent agent orchestration.',
          details: 'Development of a complex multi-agent system capable of customer triage and banking operations. Uses LangGraph for orchestration, FastAPI for backend, and Gemini Pro models.',
          techs: ['Python', 'LangGraph', 'AI'],
          repoUrl: 'https://github.com/feliipenevesnow/langgraph-multi-agent-system'
        },
        {
          title: 'frontend-fattocs',
          description: 'Modern and interactive task management interface with Angular.',
          details: 'Developed with Angular and Angular Material, featuring reactive forms, modal dialogs, and visual item reordering support.',
          techs: ['TypeScript', 'Angular'],
          repoUrl: 'https://github.com/feliipenevesnow/frontend-fattocs'
        },
        {
          title: 'backend-fattocs',
          description: 'Robust REST API for task management (To-Do List) developed with NestJS.',
          details: 'Implements full CRUD and advanced item reordering logic, with SQLite persistence and Docker support.',
          techs: ['TypeScript', 'NestJS'],
          repoUrl: 'https://github.com/feliipenevesnow/backend-fattocs'
        },
        {
          title: 'inside',
          description: 'Inside CRM: MVP of a student management system for Muay Thai gym.',
          details: 'Developed in PHP with organized architecture, using PDO and Singleton design pattern for secure connections.',
          techs: ['PHP', 'Singleton', 'PDO'],
          repoUrl: 'https://github.com/feliipenevesnow/inside'
        },
        {
          title: 'Estrutura-de-Dados-2-Ordenacao',
          description: 'C sorting and search algorithms library.',
          details: 'Includes implementations of Bubble, Quick, Heap, and Shell Sort, plus binary and sequential search, focused on complexity analysis.',
          techs: ['C', 'Algorithms'],
          repoUrl: 'https://github.com/feliipenevesnow/Estrutura-de-Dados-2-Ordenacao'
        },
        {
          title: 'Estrutura-de-Dados-1',
          description: 'Dynamic data structure implementations in C (Queue, Stack, Linked List).',
          details: 'Project focused on pointer mastery, manual memory management (malloc/free), and linking logic.',
          techs: ['C', 'Data Structures'],
          repoUrl: 'https://github.com/feliipenevesnow/Estrutura-de-Dados-1'
        },
        {
          title: 'Stream-Interface-Funcional-Java',
          description: 'Practical reference guide on Functional Programming in Java.',
          details: 'Explores deep use of Streams API, Lambda Expressions, and key functional interfaces: Predicate, Function, Consumer, Supplier.',
          techs: ['Java', 'Functional'],
          repoUrl: 'https://github.com/feliipenevesnow/Stream-Interface-Funcional-Java'
        },
        {
          title: 'Aula',
          description: 'Didactic repository used during PHP monitoring at IFSP.',
          details: 'Contains practical modules for authentication, shopping cart system, file management (upload), and interface.',
          techs: ['PHP', 'Education'],
          repoUrl: 'https://github.com/feliipenevesnow/Aula'
        },
        {
          title: 'Ionic-Frontend',
          description: '(Unfinished) Hybrid mobile application developed with Ionic Framework and Angular.',
          details: 'Exploration of tab navigation, service structuring, and Capacitor integration for cross-platform portability.',
          techs: ['TypeScript', 'Ionic', 'Angular'],
          repoUrl: 'https://github.com/feliipenevesnow/Ionic-Frontend'
        },
        {
          title: 'authentication-nest-backend',
          description: 'Robust Backend API developed with NestJS for authentication study and implementation.',
          details: 'Includes route protection via Guards, user management, and modular architecture in TypeScript.',
          techs: ['TypeScript', 'NestJS'],
          repoUrl: 'https://github.com/feliipenevesnow/authentication-nest-backend'
        },
        {
          title: 'API-Spring-Rest',
          description: 'REST API for student management developed with Spring Boot.',
          details: 'Includes full CRUD, data validation with Bean Validation, and external API integration for automatic address lookup.',
          techs: ['Java', 'Spring Boot'],
          repoUrl: 'https://github.com/feliipenevesnow/API-Spring-Rest'
        },
        {
          title: 'kiporcao',
          description: 'High-performance interactive digital menu for Ki Porção establishment.',
          details: 'Developed with React, TypeScript, and Vite, featuring real-time search system and category filters.',
          techs: ['TypeScript', 'React', 'Vite'],
          repoUrl: 'https://github.com/feliipenevesnow/kiporcao'
        },
        {
          title: 'viatabua',
          description: 'Landing Page project for Viatábua Bistrô in Presidente Epitácio/SP.',
          details: 'Developed without frameworks to ensure lightness and speed, focused on pure HTML and CSS.',
          techs: ['CSS', 'HTML'],
          repoUrl: 'https://github.com/feliipenevesnow/viatabua'
        },
        {
          title: 'feliipenevesnow',
          description: 'My special GitHub profile repository (ReadMe).',
          details: 'Profile presentation repository containing overview, stats, and technologies.',
          techs: ['Markdown', 'Profile'],
          repoUrl: 'https://github.com/feliipenevesnow/feliipenevesnow'
        },
        {
          title: 'Betabit-Agenda-Frontend',
          description: 'Phonebook Frontend (Betabit Tech Case) with Vue.js 3.',
          details: 'Focus on Mobile First UX, secure authentication with Route Guards, and modern Vue 3 Composition API features.',
          techs: ['Vue', 'JavaScript'],
          repoUrl: 'https://github.com/feliipenevesnow/Betabit-Agenda-Frontend'
        },
        {
          title: 'Betabit-Agenda-Backend',
          description: 'RESTful API for Phonebook (Betabit Tech Case) with Laravel and PHP.',
          details: 'Implements robust authentication via Sanctum, data validation, and MVC architecture for ecosystem support.',
          techs: ['PHP', 'Laravel'],
          repoUrl: 'https://github.com/feliipenevesnow/Betabit-Agenda-Backend'
        },
        {
          title: 'curriculo',
          description: 'Online resume made for recruiters to analyze my profile.',
          details: 'Current project! Developed with React, TypeScript, and Vite, integrating Generative AI and animations.',
          techs: ['TypeScript', 'React'],
          repoUrl: 'https://github.com/feliipenevesnow/curriculo'
        },
        {
          title: 'SOAP',
          description: 'Implementation of a SOAP web service in Java.',
          details: 'Provides basic calculator operations. Project developed for the Distributed Systems course.',
          techs: ['Java', 'SOAP'],
          repoUrl: 'https://github.com/feliipenevesnow/SOAP'
        },
        {
          title: 'tinlink',
          description: 'Platform to connect people from Presidente Epitácio to local jobs.',
          details: 'Allows citizens and companies to register, share information, and apply for jobs in the region.',
          techs: ['TypeScript', 'Platform'],
          repoUrl: 'https://github.com/feliipenevesnow/tinlink'
        },
        {
          title: 'ChatLLM',
          description: 'Chat application integrating Bootstrap frontend and Flask backend.',
          details: 'Includes MySQL database and dynamic interactions through the ChatGPT (OpenAI) API.',
          techs: ['Python', 'Flask', 'MySQL'],
          repoUrl: 'https://github.com/feliipenevesnow/ChatLLM'
        },
        {
          title: 'Ponto-Flutuante',
          description: 'Floating Point Simulator (Didactic IEEE 754) in Java.',
          details: 'Software for visualization and conversion of decimal numbers to binary floating point, demonstrating mantissa and exponent.',
          techs: ['Java', 'IEEE 754'],
          repoUrl: 'https://github.com/feliipenevesnow/Ponto-Flutuante'
        },
        {
          title: 'projeto-drone',
          description: 'Project simulating/analyzing drone technology impact.',
          details: 'Developed as part of the Computer Science course, focused on control and automation context.',
          techs: ['C++', 'IoT'],
          repoUrl: 'https://github.com/feliipenevesnow/projeto-drone'
        },
        {
          title: 'computacao-grafica-three.js',
          description: 'Practical learning with Three.js library.',
          details: 'Repository focused on experiments and studies with 3D computer graphics using JavaScript.',
          techs: ['JavaScript', 'Three.js'],
          repoUrl: 'https://github.com/feliipenevesnow/computacao-grafica-three.js'
        },
        {
          title: 'ViewBox-ViewFrustum-Computacao-Grafica',
          description: 'Computer graphics coursework on ViewBox and ViewFrustum.',
          details: 'Developed in the computer graphics subject of the 6th term of computer science.',
          techs: ['Python', 'CG'],
          repoUrl: 'https://github.com/feliipenevesnow/ViewBox-ViewFrustum-Computacao-Grafica'
        },
        {
          title: 'Visao-Computacional',
          description: 'Academic computer vision works in MATLAB/Others.',
          details: 'Collection of algorithms and scripts developed during the Computer Vision subject.',
          techs: ['MATLAB', 'CV'],
          repoUrl: 'https://github.com/feliipenevesnow/Visao-Computacional'
        },
        {
          title: 'PHP-Orientado-Objeto',
          description: 'Demonstration of Object-Oriented PHP proficiency.',
          details: 'Set of classes addressing inheritance, ownership, and different types of bank accounts.',
          techs: ['PHP', 'OOP'],
          repoUrl: 'https://github.com/feliipenevesnow/PHP-Orientado-Objeto'
        },
        {
          title: 'Pizzas-Truffle',
          description: 'JAVA SWING system developed in the 4th term.',
          details: 'Desktop application for a pizzeria developed in the Development Tools I subject.',
          techs: ['Java', 'Swing'],
          repoUrl: 'https://github.com/feliipenevesnow/Pizzas-Truffle'
        },
        {
          title: 'SOPOO-Game',
          description: 'Java game resulting from the interdisciplinarity between OOP and Operating Systems.',
          details: 'Implements concurrency and threads in a gamified environment to demonstrate theoretical concepts.',
          techs: ['Java', 'Threads', 'Game'],
          repoUrl: 'https://github.com/feliipenevesnow/SOPOO-Game'
        },
        {
          title: 'Estrutura-de-Dados-2-Hash',
          description: 'Hash Table data structure in C.',
          details: 'Implementation developed for the ED2 subject, focused on hashing and collision handling.',
          techs: ['C', 'Hash'],
          repoUrl: 'https://github.com/feliipenevesnow/Estrutura-de-Dados-2-Hash'
        },
        {
          title: 'Rede-Convolucional',
          description: 'Air-written digit recognition via webcam.',
          details: 'Uses MediaPipe for gesture tracking and a Convolutional Neural Network (CNN) trained on MNIST.',
          techs: ['Python', 'CNN', 'MediaPipe'],
          repoUrl: 'https://github.com/feliipenevesnow/Rede-Convolucional'
        },
        {
          title: 'SystemFP',
          description: 'System developed using Java and PrimeFaces.',
          details: 'Rich web interface utilizing the PrimeFaces framework for advanced visual components and Java EE backend.',
          techs: ['Java', 'PrimeFaces', 'Web'],
          repoUrl: 'https://github.com/feliipenevesnow/SystemFP'
        },
        {
          title: 'Multilayer-Perceptron',
          description: 'Neural Network for star spectral classification.',
          details: 'MLP implementation developed in the Artificial Neural Networks subject to analyze astronomical data.',
          techs: ['Python', 'Neural Networks', 'ML'],
          repoUrl: 'https://github.com/feliipenevesnow/Multilayer-Perceptron'
        },
        {
          title: 'Rede-Neural-Perceptron',
          description: 'Basic Perceptron implementation for studies.',
          details: 'Fundamental code for understanding artificial neurons and basic supervised machine learning.',
          techs: ['Python', 'Neural Networks'],
          repoUrl: 'https://github.com/feliipenevesnow/Rede-Neural-Perceptron'
        },
        {
          title: 'PHP-Pizzas-Truffle',
          description: 'Web Module of the Pizzas-Truffle system.',
          details: 'Interface for customers to place online orders, integrating with the desktop management system in Java.',
          techs: ['PHP', 'Web', 'MySQL'],
          repoUrl: 'https://github.com/feliipenevesnow/PHP-Pizzas-Truffle'
        },
        {
          title: 'Documentacao-FabricaDeSoftware',
          description: 'Representative site of activity diagrams.',
          details: 'Developed for the Integrator Project I, demonstrating maintenance processes and software engineering.',
          techs: ['HTML', 'CSS', 'Docs'],
          repoUrl: 'https://github.com/feliipenevesnow/Documentacao-FabricaDeSoftware'
        }
      ],
    },
    languages: {
      title: 'Languages',
      items: [
        '<strong>English (C1 - Advanced)</strong>: EF SET Certificate (63/100).',
        '<strong>Spanish (A1 - Basic)</strong>',
      ],
    },
  },
};