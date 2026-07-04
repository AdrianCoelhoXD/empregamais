/* ============================================================
   EmpregaMais - Mock Data (dados.js)
   Expanded dataset for the accessibility-focused job board
   ============================================================ */

// ── VAGAS (Job Listings) ──────────────────────────────────────
const vagas = [
  {
    id: 1,
    cargo: 'Assistente Administrativo',
    empresa: 'Grupo Horizonte',
    bairro: 'Centro',
    area: 'Administração',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 2.200,00',
    descricao: 'Responsável pelo controle de documentos, organização de arquivos e suporte à equipe administrativa. Ambiente totalmente acessível com foco em inclusão.',
    requisitos: ['Ensino Médio completo', 'Conhecimento em pacote Office', 'Boa comunicação oral e escrita'],
    beneficios: ['Vale-transporte', 'Vale-refeição (R$ 28/dia)', 'Plano de saúde'],
    publicada: 'Hoje',
    acessibilidade: ['Rampa de acesso', 'Banheiro adaptado', 'Elevador']
  },
  {
    id: 2,
    cargo: 'Desenvolvedor Front-End Júnior',
    empresa: 'TechVida Solutions',
    bairro: 'Jardim América',
    area: 'Tecnologia',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 3.500,00',
    descricao: 'Atuação no desenvolvimento de interfaces web acessíveis, utilizando HTML, CSS e JavaScript. Empresa referência em diversidade e inclusão.',
    requisitos: ['Conhecimento em HTML, CSS e JS', 'Noções de acessibilidade web (WCAG)', 'Desejável experiência com React'],
    beneficios: ['Vale-transporte', 'Home office 3x por semana', 'Plano de saúde e odontológico'],
    publicada: 'Hoje',
    acessibilidade: ['Software leitor de tela', 'Estação de trabalho adaptada', 'Banheiro adaptado']
  },
  {
    id: 3,
    cargo: 'Atendente de Farmácia',
    empresa: 'Farmácia Bem Estar',
    bairro: 'São José',
    area: 'Atendimento',
    tipo: 'CLT',
    pcd: false,
    salario: 'R$ 1.800,00',
    descricao: 'Atendimento ao público no balcão da farmácia, organização de prateleiras e controle de estoque de medicamentos.',
    requisitos: ['Ensino Médio completo', 'Experiência em atendimento ao público', 'Disponibilidade de horário'],
    beneficios: ['Vale-transporte', 'Desconto em medicamentos', 'Cesta básica'],
    publicada: 'Há 2 dias',
    acessibilidade: []
  },
  {
    id: 4,
    cargo: 'Técnico de Enfermagem',
    empresa: 'Hospital Santa Clara',
    bairro: 'Santa Maria',
    area: 'Saúde',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 2.800,00',
    descricao: 'Atuar no cuidado direto ao paciente, realizando procedimentos de enfermagem sob supervisão. Hospital com programa de inclusão consolidado.',
    requisitos: ['Curso Técnico em Enfermagem', 'COREN ativo', 'Experiência mínima de 6 meses'],
    beneficios: ['Vale-transporte', 'Plano de saúde', 'Adicional noturno'],
    publicada: 'Há 3 dias',
    acessibilidade: ['Rampa de acesso', 'Elevador', 'Piso tátil', 'Banheiro adaptado']
  },
  {
    id: 5,
    cargo: 'Professor de Libras',
    empresa: 'Instituto Educar+',
    bairro: 'Vila Nova',
    area: 'Educação',
    tipo: 'PJ',
    pcd: true,
    salario: 'R$ 4.000,00',
    descricao: 'Ministrar aulas de Libras para turmas de ensino fundamental e capacitação corporativa. Excelente oportunidade para profissionais surdos ou intérpretes.',
    requisitos: ['Graduação em Letras-Libras ou Pedagogia', 'Fluência em Libras', 'Certificação ProLibras (desejável)'],
    beneficios: ['Horário flexível', 'Material didático fornecido', 'Bônus por turma concluída'],
    publicada: 'Há 1 semana',
    acessibilidade: ['Intérprete de Libras disponível', 'Material em formatos acessíveis', 'Rampa de acesso']
  },
  {
    id: 6,
    cargo: 'Operador de Empilhadeira',
    empresa: 'LogiMax Transportes',
    bairro: 'Industrial',
    area: 'Logística',
    tipo: 'CLT',
    pcd: false,
    salario: 'R$ 2.400,00',
    descricao: 'Operar empilhadeira para movimentação de cargas no armazém, zelando pela segurança e organização do estoque.',
    requisitos: ['CNH categoria B', 'Curso de operador de empilhadeira', 'Experiência mínima de 1 ano'],
    beneficios: ['Vale-transporte', 'Vale-refeição', 'Seguro de vida'],
    publicada: 'Há 2 dias',
    acessibilidade: []
  },
  {
    id: 7,
    cargo: 'Vendedor(a) de Loja',
    empresa: 'Magazine Central',
    bairro: 'Centro',
    area: 'Comércio',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 1.600,00 + Comissão',
    descricao: 'Atendimento ao cliente na loja física, demonstração de produtos e fechamento de vendas. Loja com layout acessível e equipe inclusiva.',
    requisitos: ['Ensino Médio completo', 'Experiência em vendas', 'Boa comunicação'],
    beneficios: ['Comissão sobre vendas', 'Vale-transporte', 'Desconto em produtos'],
    publicada: 'Hoje',
    acessibilidade: ['Rampa de acesso', 'Banheiro adaptado', 'Piso tátil']
  },
  {
    id: 8,
    cargo: 'Auxiliar de Limpeza',
    empresa: 'CleanPro Serviços',
    bairro: 'Boa Vista',
    area: 'Serviços Gerais',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 1.500,00',
    descricao: 'Realizar a limpeza e conservação de ambientes comerciais. Empresa com programa de inclusão e capacitação profissional contínua.',
    requisitos: ['Ensino Fundamental completo', 'Disponibilidade de horário', 'Comprometimento'],
    beneficios: ['Vale-transporte', 'Vale-alimentação', 'Uniforme fornecido'],
    publicada: 'Há 4 dias',
    acessibilidade: ['Rampa de acesso', 'Banheiro adaptado']
  },
  {
    id: 9,
    cargo: 'Analista de Dados',
    empresa: 'DataSphere Analytics',
    bairro: 'Jardim América',
    area: 'Tecnologia',
    tipo: 'PJ',
    pcd: true,
    salario: 'R$ 6.500,00',
    descricao: 'Analisar grandes volumes de dados para gerar insights estratégicos. Trabalho 100% remoto com ferramentas acessíveis e equipe diversa.',
    requisitos: ['Graduação em TI, Estatística ou áreas correlatas', 'Experiência com Python e SQL', 'Conhecimento em Power BI ou Tableau'],
    beneficios: ['Trabalho remoto', 'Auxílio home office', 'Horário flexível'],
    publicada: 'Há 1 dia',
    acessibilidade: ['Software leitor de tela', 'Estação de trabalho adaptada', 'Reuniões com legendas automáticas']
  },
  {
    id: 10,
    cargo: 'Estagiário de Marketing',
    empresa: 'Agência Pulso',
    bairro: 'Centro',
    area: 'Administração',
    tipo: 'Estágio',
    pcd: false,
    salario: 'R$ 1.200,00',
    descricao: 'Auxiliar na criação de campanhas digitais, gestão de redes sociais e produção de conteúdo para clientes da agência.',
    requisitos: ['Cursando Marketing, Publicidade ou Comunicação', 'Conhecimento em redes sociais', 'Criatividade e proatividade'],
    beneficios: ['Bolsa-auxílio', 'Vale-transporte', 'Possibilidade de efetivação'],
    publicada: 'Há 3 dias',
    acessibilidade: []
  },
  {
    id: 11,
    cargo: 'Recepcionista Bilíngue',
    empresa: 'Hotel Estrela do Sul',
    bairro: 'Boa Vista',
    area: 'Atendimento',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 2.600,00',
    descricao: 'Recepcionar hóspedes nacionais e internacionais, realizar check-in/check-out e fornecer informações sobre o hotel e a região.',
    requisitos: ['Ensino Médio completo', 'Inglês intermediário/avançado', 'Experiência em recepção ou atendimento'],
    beneficios: ['Vale-transporte', 'Refeição no local', 'Plano de saúde'],
    publicada: 'Há 5 dias',
    acessibilidade: ['Rampa de acesso', 'Elevador', 'Banheiro adaptado', 'Software leitor de tela']
  },
  {
    id: 12,
    cargo: 'Motorista de Entregas',
    empresa: 'Expresso Rápido',
    bairro: 'Industrial',
    area: 'Logística',
    tipo: 'CLT',
    pcd: false,
    salario: 'R$ 2.100,00',
    descricao: 'Realizar entregas de encomendas na região metropolitana, garantindo pontualidade e bom atendimento ao cliente.',
    requisitos: ['CNH categoria D', 'Experiência com entregas', 'Conhecimento das rotas da região'],
    beneficios: ['Vale-refeição', 'Seguro de vida', 'Premiação por produtividade'],
    publicada: 'Há 1 semana',
    acessibilidade: []
  },
  {
    id: 13,
    cargo: 'Designer UX/UI',
    empresa: 'PixelCraft Studio',
    bairro: 'Jardim América',
    area: 'Tecnologia',
    tipo: 'PJ',
    pcd: true,
    salario: 'R$ 5.800,00',
    descricao: 'Criar interfaces intuitivas e acessíveis para aplicativos mobile e web. Foco em design inclusivo e experiência do usuário.',
    requisitos: ['Portfólio com projetos de UI/UX', 'Experiência com Figma', 'Conhecimento em acessibilidade digital'],
    beneficios: ['Trabalho remoto', 'Horário flexível', 'Participação em conferências'],
    publicada: 'Hoje',
    acessibilidade: ['Software leitor de tela', 'Reuniões com legendas automáticas', 'Estação de trabalho adaptada']
  },
  {
    id: 14,
    cargo: 'Auxiliar de Cozinha',
    empresa: 'Restaurante Sabor da Terra',
    bairro: 'São José',
    area: 'Serviços Gerais',
    tipo: 'CLT',
    pcd: false,
    salario: 'R$ 1.650,00',
    descricao: 'Auxiliar na preparação de alimentos, organização da cozinha e higienização de utensílios no restaurante.',
    requisitos: ['Ensino Fundamental completo', 'Disponibilidade para trabalhar aos finais de semana', 'Curso de manipulação de alimentos (desejável)'],
    beneficios: ['Refeição no local', 'Vale-transporte', 'Gorjeta compartilhada'],
    publicada: 'Há 6 dias',
    acessibilidade: []
  },
  {
    id: 15,
    cargo: 'Contador(a)',
    empresa: 'Escritório Figueiredo & Associados',
    bairro: 'Centro',
    area: 'Administração',
    tipo: 'CLT',
    pcd: true,
    salario: 'R$ 4.500,00',
    descricao: 'Responsável pela contabilidade de clientes PJ, elaboração de demonstrações financeiras e cumprimento de obrigações fiscais.',
    requisitos: ['Graduação em Ciências Contábeis', 'CRC ativo', 'Experiência com SPED e eSocial'],
    beneficios: ['Plano de saúde e odontológico', 'Vale-refeição', 'Participação nos lucros'],
    publicada: 'Há 2 dias',
    acessibilidade: ['Rampa de acesso', 'Elevador', 'Software leitor de tela', 'Banheiro adaptado']
  },
  {
    id: 16,
    cargo: 'Terapeuta Ocupacional',
    empresa: 'Clínica Viver Bem',
    bairro: 'Santa Maria',
    area: 'Saúde',
    tipo: 'PJ',
    pcd: true,
    salario: 'R$ 5.200,00',
    descricao: 'Atendimento terapêutico a pacientes com deficiência, realizando avaliações e planos de intervenção individualizados.',
    requisitos: ['Graduação em Terapia Ocupacional', 'CREFITO ativo', 'Experiência com reabilitação'],
    beneficios: ['Horário flexível', 'Sala equipada', 'Capacitação continuada'],
    publicada: 'Há 4 dias',
    acessibilidade: ['Rampa de acesso', 'Piso tátil', 'Banheiro adaptado', 'Estacionamento reservado']
  },
  {
    id: 17,
    cargo: 'Operador de Telemarketing',
    empresa: 'ConectaCall',
    bairro: 'Vila Nova',
    area: 'Atendimento',
    tipo: 'Temporário',
    pcd: true,
    salario: 'R$ 1.600,00',
    descricao: 'Realizar e receber ligações para atendimento ao cliente, vendas e suporte técnico. Contrato temporário de 6 meses com possibilidade de efetivação.',
    requisitos: ['Ensino Médio completo', 'Boa dicção e comunicação', 'Conhecimento básico em informática'],
    beneficios: ['Vale-transporte', 'Vale-refeição', 'Premiação por metas'],
    publicada: 'Há 1 dia',
    acessibilidade: ['Software leitor de tela', 'Banheiro adaptado', 'Estação de trabalho adaptada']
  },
  {
    id: 18,
    cargo: 'Coordenador Pedagógico',
    empresa: 'Colégio Futuro Brilhante',
    bairro: 'Boa Vista',
    area: 'Educação',
    tipo: 'CLT',
    pcd: false,
    salario: 'R$ 4.800,00',
    descricao: 'Coordenar as atividades pedagógicas do ensino fundamental, orientar professores e acompanhar o desempenho dos alunos.',
    requisitos: ['Graduação em Pedagogia', 'Pós-graduação em Gestão Escolar', 'Experiência mínima de 3 anos na área'],
    beneficios: ['Plano de saúde', 'Vale-alimentação', 'Recesso escolar remunerado'],
    publicada: 'Há 1 semana',
    acessibilidade: []
  }
];

// ── CURSOS (Courses) ──────────────────────────────────────────
const cursos = [
  {
    id: 1,
    titulo: 'Informática Básica Acessível',
    descricao: 'Curso de introdução à informática com foco em acessibilidade digital. Aprenda a usar computadores, internet e ferramentas do dia a dia com recursos adaptativos.',
    duracao: '40 horas',
    modalidade: 'Presencial',
    acessivel: true,
    vagas_disponiveis: 25,
    inicio: '15/07/2026'
  },
  {
    id: 2,
    titulo: 'Desenvolvimento Web com Acessibilidade',
    descricao: 'Aprenda a criar sites e aplicações web seguindo as diretrizes WCAG 2.1. Ideal para quem deseja entrar na área de tecnologia com foco em inclusão.',
    duracao: '80 horas',
    modalidade: 'Online',
    acessivel: true,
    vagas_disponiveis: 40,
    inicio: '22/07/2026'
  },
  {
    id: 3,
    titulo: 'Atendimento ao Cliente Inclusivo',
    descricao: 'Capacitação em técnicas de atendimento ao público com abordagem inclusiva, comunicação não-violenta e Libras básico.',
    duracao: '20 horas',
    modalidade: 'Presencial',
    acessivel: true,
    vagas_disponiveis: 30,
    inicio: '01/08/2026'
  },
  {
    id: 4,
    titulo: 'Excel Avançado para o Mercado de Trabalho',
    descricao: 'Domine fórmulas avançadas, tabelas dinâmicas, gráficos e automação de planilhas para se destacar em processos seletivos.',
    duracao: '30 horas',
    modalidade: 'Online',
    acessivel: true,
    vagas_disponiveis: 50,
    inicio: '10/08/2026'
  },
  {
    id: 5,
    titulo: 'Libras - Língua Brasileira de Sinais (Básico)',
    descricao: 'Aprenda os fundamentos da Libras, incluindo alfabeto manual, vocabulário cotidiano e estrutura gramatical básica.',
    duracao: '60 horas',
    modalidade: 'Híbrido',
    acessivel: true,
    vagas_disponiveis: 20,
    inicio: '05/08/2026'
  },
  {
    id: 6,
    titulo: 'Marketing Digital e Redes Sociais',
    descricao: 'Estratégias de marketing digital, gestão de redes sociais, criação de conteúdo e análise de métricas para pequenos empreendedores.',
    duracao: '45 horas',
    modalidade: 'Online',
    acessivel: false,
    vagas_disponiveis: 35,
    inicio: '20/07/2026'
  },
  {
    id: 7,
    titulo: 'Empreendedorismo e Gestão de Negócios',
    descricao: 'Curso prático sobre como abrir e gerenciar um negócio próprio, incluindo plano de negócios, finanças e legalização.',
    duracao: '50 horas',
    modalidade: 'Presencial',
    acessivel: true,
    vagas_disponiveis: 15,
    inicio: '12/08/2026'
  },
  {
    id: 8,
    titulo: 'Preparação para Entrevistas de Emprego',
    descricao: 'Workshop intensivo com simulações de entrevistas, técnicas de comunicação, elaboração de currículo e postura profissional.',
    duracao: '12 horas',
    modalidade: 'Presencial',
    acessivel: true,
    vagas_disponiveis: 20,
    inicio: '18/07/2026'
  },
  {
    id: 9,
    titulo: 'Assistente Administrativo com Certificação',
    descricao: 'Formação completa para atuar como assistente administrativo, cobrindo rotinas de escritório, documentação e atendimento telefônico.',
    duracao: '100 horas',
    modalidade: 'Híbrido',
    acessivel: true,
    vagas_disponiveis: 28,
    inicio: '25/07/2026'
  },
  {
    id: 10,
    titulo: 'Primeiros Socorros e Segurança no Trabalho',
    descricao: 'Capacitação em procedimentos de primeiros socorros, prevenção de acidentes e normas de segurança no ambiente de trabalho.',
    duracao: '16 horas',
    modalidade: 'Presencial',
    acessivel: false,
    vagas_disponiveis: 30,
    inicio: '08/08/2026'
  }
];

// ── NOTIFICAÇÕES (Notifications) ──────────────────────────────
const notificacoes = [
  {
    id: 1,
    titulo: 'Nova vaga compatível com seu perfil!',
    mensagem: 'A vaga de Assistente Administrativo no Grupo Horizonte foi publicada e combina com suas qualificações.',
    tipo: 'vaga',
    data: 'Hoje',
    lida: false
  },
  {
    id: 2,
    titulo: 'Inscrição confirmada no curso',
    mensagem: 'Sua inscrição no curso "Informática Básica Acessível" foi confirmada. Início em 15/07/2026.',
    tipo: 'curso',
    data: 'Hoje',
    lida: false
  },
  {
    id: 3,
    titulo: 'Atualização de acessibilidade',
    mensagem: 'O EmpregaMais agora conta com suporte a alto contraste e tema para daltonismo. Acesse as configurações de acessibilidade.',
    tipo: 'sistema',
    data: 'Ontem',
    lida: true
  },
  {
    id: 4,
    titulo: 'Vaga de Desenvolvedor Front-End disponível',
    mensagem: 'A TechVida Solutions publicou uma vaga de Desenvolvedor Front-End Júnior com suporte a PCD.',
    tipo: 'vaga',
    data: 'Ontem',
    lida: false
  },
  {
    id: 5,
    titulo: 'Curso de Libras com vagas abertas',
    mensagem: 'O curso de Libras Básico no Instituto Educar+ ainda tem 20 vagas disponíveis. Inscreva-se!',
    tipo: 'curso',
    data: 'Há 2 dias',
    lida: true
  },
  {
    id: 6,
    titulo: 'Seu currículo foi visualizado',
    mensagem: 'A empresa Hospital Santa Clara visualizou seu currículo para a vaga de Técnico de Enfermagem.',
    tipo: 'vaga',
    data: 'Há 2 dias',
    lida: false
  },
  {
    id: 7,
    titulo: 'Manutenção programada',
    mensagem: 'O sistema passará por manutenção no dia 10/07/2026 das 02h às 06h. Pedimos desculpas pelo inconveniente.',
    tipo: 'sistema',
    data: 'Há 3 dias',
    lida: true
  },
  {
    id: 8,
    titulo: 'Nova vaga PCD em Logística',
    mensagem: 'A LogiMax Transportes publicou vagas adaptadas para PCD na área de logística e armazenamento.',
    tipo: 'vaga',
    data: 'Há 3 dias',
    lida: true
  },
  {
    id: 9,
    titulo: 'Workshop de entrevistas amanhã',
    mensagem: 'Lembrete: o workshop "Preparação para Entrevistas de Emprego" começa amanhã às 9h. Não se esqueça!',
    tipo: 'curso',
    data: 'Há 4 dias',
    lida: true
  },
  {
    id: 10,
    titulo: 'Parabéns pelo perfil completo!',
    mensagem: 'Seu perfil está 100% preenchido. Isso aumenta em 3x suas chances de ser encontrado por recrutadores.',
    tipo: 'sistema',
    data: 'Há 5 dias',
    lida: true
  },
  {
    id: 11,
    titulo: 'Vaga de Designer UX/UI publicada',
    mensagem: 'A PixelCraft Studio está procurando um Designer UX/UI com foco em acessibilidade. Confira!',
    tipo: 'vaga',
    data: 'Há 5 dias',
    lida: true
  },
  {
    id: 12,
    titulo: 'Novo recurso: filtro por acessibilidade',
    mensagem: 'Agora você pode filtrar vagas por tipo de recurso de acessibilidade disponível. Experimente!',
    tipo: 'sistema',
    data: 'Há 1 semana',
    lida: true
  }
];