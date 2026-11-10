// Conteúdo editorial do site. Textos originais, escritos a partir de fatos
// conferidos em fontes públicas (Wikipedia, IMDb, CBS News, TV Guide).

export const SITE = {
  name: "Dossiê Mentalist",
  // A CONFIRMAR: trocar pelo domínio final quando o site for publicado.
  url: "https://dossie-mentalist.vercel.app",
  description:
    "Um dossiê editorial sobre The Mentalist (CBS, 2008–2015): a série, Patrick Jane, a equipe do CBI, as sete temporadas, Red John e os bastidores.",
  // A CONFIRMAR: link do portfólio da Creative Romão quando estiver no ar.
  creditUrl: "https://www.instagram.com/creative.romao/",
};

export const NAV = [
  { href: "/", label: "Início" },
  { href: "/sobre/", label: "A série" },
  { href: "/personagens/", label: "Personagens" },
  { href: "/temporadas/", label: "Temporadas" },
  { href: "/curiosidades/", label: "Curiosidades" },
  { href: "/red-john/", label: "Red John" },
];

export const FACTS = {
  creator: "Bruno Heller",
  network: "CBS",
  firstAired: "23 de setembro de 2008",
  lastAired: "18 de fevereiro de 2015",
  seasons: 7,
  episodes: 151,
  runtime: "40 a 50 minutos",
  composer: "Blake Neely",
  companies: "Warner Bros. Television e Primrose Hill Productions",
  country: "Estados Unidos",
  genre: "Drama policial, mistério",
  brazil: "SBT e Warner Channel",
};

export type Character = {
  id: string;
  name: string;
  actor: string;
  role: string;
  seasons: string;
  short: string;
  bio: string;
  traits: string[];
  links: { to: string; label: string }[];
  // posição no quadro de investigação (desktop), em % do quadro
  board: { x: number; y: number; r: number };
};

export const CHARACTERS: Character[] = [
  {
    id: "jane",
    name: "Patrick Jane",
    actor: "Simon Baker",
    role: "Consultor do CBI, depois do FBI",
    seasons: "Temporadas 1–7",
    short: "Ex-vidente de TV. Nunca leu mentes: lê pessoas.",
    bio: "Fez fama fingindo ter poderes paranormais. Depois da tragédia que destruiu sua família, passou a usar o que realmente sabe fazer, que é observar, induzir, hipnotizar e provocar, a serviço das investigações. Charmoso, irreverente e quase sempre fora do protocolo, prefere uma xícara de chá e um cochilo no sofá do escritório a qualquer relatório.",
    traits: ["Observação", "Leitura fria", "Hipnose", "Manipulação"],
    links: [
      { to: "lisbon", label: "Parceira e, com o tempo, o grande amor" },
      { to: "redjohn", label: "Inimigo e obsessão" },
      { to: "cho", label: "Respeito mútuo, em silêncio" },
      { to: "abbott", label: "Chefe no FBI" },
    ],
    board: { x: 36, y: 48, r: -2 },
  },
  {
    id: "lisbon",
    name: "Teresa Lisbon",
    actor: "Robin Tunney",
    role: "Agente sênior, líder da equipe",
    seasons: "Temporadas 1–7",
    short: "A regra, o freio e o porto seguro de Jane.",
    bio: "Comanda a equipe do CBI com disciplina e um senso de justiça que não se negocia. Passa boa parte da série limpando as confusões de Jane e protegendo-o de si mesmo. Do atrito constante nasce a relação mais importante da história.",
    traits: ["Liderança", "Integridade", "Paciência testada"],
    links: [
      { to: "jane", label: "Parceria que vira amor" },
      { to: "cho", label: "Braço direito na equipe" },
      { to: "abbott", label: "Reencontro no FBI" },
    ],
    board: { x: 22, y: 4, r: 3 },
  },
  {
    id: "cho",
    name: "Kimball Cho",
    actor: "Tim Kang",
    role: "Agente",
    seasons: "Temporadas 1–7",
    short: "Rosto impassível, humor seco, lealdade total.",
    bio: "Direto ao ponto e quase impossível de ler, o que o torna temível em uma sala de interrogatório. Fala pouco e diz exatamente o que pensa. Está com a equipe do começo ao fim, do CBI ao FBI.",
    traits: ["Interrogatório", "Disciplina", "Humor seco"],
    links: [
      { to: "rigsby", label: "Parceiro de campo" },
      { to: "vega", label: "Mentor da novata" },
    ],
    board: { x: 78, y: 4, r: -4 },
  },
  {
    id: "rigsby",
    name: "Wayne Rigsby",
    actor: "Owain Yeoman",
    role: "Agente",
    seasons: "Temporadas 1–6 e final",
    short: "Tamanho de armário, coração mole.",
    bio: "Agente grandalhão, entusiasmado e de bom coração, com fama de ter sempre um lanche à mão. Seu romance com Van Pelt, escondido das regras do CBI, atravessa várias temporadas.",
    traits: ["Força", "Lealdade", "Coração mole"],
    links: [{ to: "vanpelt", label: "Romance que vira casamento" }],
    board: { x: 78, y: 94, r: 2 },
  },
  {
    id: "vanpelt",
    name: "Grace Van Pelt",
    actor: "Amanda Righetti",
    role: "Agente",
    seasons: "Temporadas 1–6 e final",
    short: "Começa como novata. Termina como peça-chave.",
    bio: "Entra na equipe ainda inexperiente e cresce a cada temporada, tornando-se a especialista em tecnologia e pesquisa do grupo. Idealista, aprende da forma mais dura que nem todo mundo é o que parece.",
    traits: ["Tecnologia", "Pesquisa", "Idealismo"],
    links: [{ to: "rigsby", label: "Parceira de vida" }],
    board: { x: 50, y: 94, r: -3 },
  },
  {
    id: "abbott",
    name: "Dennis Abbott",
    actor: "Rockmond Dunbar",
    role: "Agente do FBI, chefe da equipe",
    seasons: "Temporadas 6–7",
    short: "O FBI de terno, tentando domar Jane.",
    bio: "Agente especial que comanda a equipe do FBI em Austin, no Texas, depois que o CBI é desfeito. Começa desconfiado do método de Jane e aprende, aos poucos, a tirar proveito dele.",
    traits: ["Pragmatismo", "Comando", "Desconfiança"],
    links: [
      { to: "fischer", label: "Colega de agência" },
      { to: "wylie", label: "Chefe do analista" },
    ],
    board: { x: 64, y: 48, r: 4 },
  },
  {
    id: "fischer",
    name: "Kim Fischer",
    actor: "Emily Swallow",
    role: "Agente do FBI",
    seasons: "Temporada 6",
    short: "A agente que vai buscar Jane de volta.",
    bio: "Agente do FBI que entra na história na 6ª temporada e é peça-chave na volta de Jane ao trabalho de investigação.",
    traits: ["Determinação", "Ambição"],
    links: [{ to: "abbott", label: "Colega de agência" }],
    board: { x: 22, y: 94, r: -2 },
  },
  {
    id: "wylie",
    name: "Jason Wylie",
    actor: "Joe Adler",
    role: "Analista de tecnologia do FBI",
    seasons: "Temporadas 6–7",
    short: "O cérebro digital da equipe de Austin.",
    bio: "Especialista em tecnologia do FBI, jovem e ansioso para sair de trás da tela e ir a campo. Vira peça fixa da equipe na reta final.",
    traits: ["Tecnologia", "Entusiasmo"],
    links: [{ to: "abbott", label: "Responde a ele" }],
    board: { x: 8, y: 48, r: 3 },
  },
  {
    id: "vega",
    name: "Michelle Vega",
    actor: "Josie Loren",
    role: "Agente do FBI",
    seasons: "Temporada 7",
    short: "Jovem, ambiciosa, recém-chegada.",
    bio: "Agente novata que entra na equipe na última temporada, ansiosa para provar seu valor ao lado de veteranos como Cho.",
    traits: ["Ambição", "Coragem"],
    links: [{ to: "cho", label: "Aprende com ele" }],
    board: { x: 92, y: 48, r: -3 },
  },
  {
    id: "redjohn",
    name: "Red John",
    actor: "Identidade sob sigilo",
    role: "Assassino em série",
    seasons: "Temporadas 1–6",
    short: "Nunca aparece. Está em todo lugar.",
    bio: "Assassino em série que deixa uma assinatura pintada com o sangue das vítimas. Cinco anos antes do primeiro episódio, matou a esposa e a filha de Jane depois que ele o provocou na televisão. Tem seguidores, informantes e uma paciência infinita.",
    traits: ["Paciência", "Rede de seguidores", "Teatralidade"],
    links: [{ to: "jane", label: "Sua obsessão" }],
    board: { x: 50, y: 0, r: 2 },
  },
];

export const RECURRING = [
  { name: "Madeleine Hightower", actor: "Aunjanue Ellis", note: "Chefe do CBI em uma fase de cobrança dura sobre a equipe." },
  { name: "Lorelei Martins", actor: "Emmanuelle Chriqui", note: "Seguidora de Red John que se aproxima perigosamente de Jane." },
  { name: "Bret Stiles", actor: "Malcolm McDowell", note: "Líder carismático de uma organização que vive cruzando o caminho de Jane." },
  { name: "Erica Flynn", actor: "Morena Baccarin", note: "Manipuladora à altura de Jane, que reaparece até a última temporada." },
  { name: "J.J. LaRoche", actor: "Pruitt Taylor Vince", note: "Investigador interno enigmático e de poucos amigos." },
  { name: "Gale Bertram", actor: "Michael Gaston", note: "Diretor do CBI, poderoso e sempre preocupado com a imagem da agência." },
];

export type Season = {
  n: number;
  years: string;
  episodes: number;
  title: string;
  focus: string;
  synopsis: string;
  spoiler?: string;
  moments: string[];
};

export const SEASONS: Season[] = [
  {
    n: 1,
    years: "2008–2009",
    episodes: 23,
    title: "O consultor",
    focus: "Casos da semana, com Red John à espreita",
    synopsis:
      "Patrick Jane já trabalha como consultor do CBI (California Bureau of Investigation), em Sacramento, ao lado da equipe da agente Teresa Lisbon. A temporada apresenta o método dele, observar onde os outros apenas olham, em crimes resolvidos a cada episódio. O nome de Red John, porém, nunca sai do ar.",
    moments: [
      "Estreia em 23 de setembro de 2008",
      "Apresentação da equipe: Lisbon, Cho, Rigsby e Van Pelt",
      "Vira a série nova mais vista da temporada nos EUA",
    ],
  },
  {
    n: 2,
    years: "2009–2010",
    episodes: 23,
    title: "Atrito",
    focus: "Pressão interna e segredos na equipe",
    synopsis:
      "O CBI ganha uma nova chefia, mais rígida, e a liberdade de Jane passa a custar caro. Dentro da equipe, o romance entre Rigsby e Van Pelt esbarra nas regras da agência. Em paralelo, cada pista sobre Red John mostra que o assassino conhece Jane melhor do que deveria.",
    moments: [
      "Madeleine Hightower assume o comando no CBI",
      "O romance proibido de Rigsby e Van Pelt",
      "Episódio 21, cujo título em números esconde a palavra RED",
    ],
  },
  {
    n: 3,
    years: "2010–2011",
    episodes: 24,
    title: "Obsessão",
    focus: "A caçada vira assunto pessoal",
    synopsis:
      "Infiltrações, traições e a suspeita de que há um informante perto demais da equipe. A busca por Red John deixa de ser investigação e vira obsessão.",
    spoiler:
      "No final, Jane atira em um homem que diz ser Red John, em plena praça de alimentação de um shopping.",
    moments: [
      "Um informante de Red John perto demais",
      "Final em duas partes: “Strawberries and Cream”",
      "Simon Baker também dirige episódios",
    ],
  },
  {
    n: 4,
    years: "2011–2012",
    episodes: 24,
    title: "Consequências",
    focus: "Julgamento e jogo psicológico",
    synopsis:
      "Jane encara as consequências do que fez no fim da temporada anterior. Depois, monta o golpe mais arriscado da carreira para atrair o assassino até ele.",
    spoiler:
      "Ele finge desmoronar, chega ao fundo do poço e termina frente a frente com Lorelei Martins, uma seguidora de Red John.",
    moments: [
      "Jane no banco dos réus",
      "Um plano de meses escondido até da equipe",
      "A chegada de Lorelei Martins",
    ],
  },
  {
    n: 5,
    years: "2012–2013",
    episodes: 22,
    title: "A rede",
    focus: "Red John tem aliados por toda parte",
    synopsis:
      "As pistas de Lorelei levam a uma rede de agentes da lei infiltrados que trabalham para Red John, a Associação Blake. Ninguém dentro das agências parece confiável.",
    spoiler:
      "Jane descobre que já apertou a mão de Red John e fecha a temporada com uma lista de sete suspeitos.",
    moments: [
      "A Associação Blake vem à tona",
      "As pistas de Lorelei Martins",
      "A lista dos sete suspeitos",
    ],
  },
  {
    n: 6,
    years: "2013–2014",
    episodes: 22,
    title: "A revelação",
    focus: "O fim de Red John e um recomeço",
    synopsis:
      "A lista diminui, os suspeitos caem um a um e o mistério de seis temporadas chega ao fim no oitavo episódio. Depois disso, a série muda de cenário, de agência e de tom.",
    spoiler:
      "Com o caso encerrado, o CBI é desfeito. Jane passa dois anos escondido na América do Sul e volta como consultor do FBI em Austin, no Texas, exigindo Lisbon ao seu lado. No último episódio, declara seu amor por ela.",
    moments: [
      "Episódio 8, “Red John”, exibido em 24 de novembro de 2013",
      "Salto de dois anos no tempo",
      "Rigsby e Van Pelt deixam a equipe no episódio 15",
    ],
  },
  {
    n: 7,
    years: "2014–2015",
    episodes: 13,
    title: "Depois da tempestade",
    focus: "Uma temporada curta e mais leve",
    synopsis:
      "Livre do passado, Jane tenta construir um futuro. A agente Michelle Vega chega à equipe do FBI, e os casos dividem espaço com a relação de Jane e Lisbon, finalmente assumida.",
    spoiler:
      "A série termina com dois episódios exibidos na mesma noite, 18 de fevereiro de 2015, e um casamento, com o retorno de Rigsby e Van Pelt.",
    moments: [
      "Temporada mais curta da série, com 13 episódios",
      "A chegada de Michelle Vega",
      "Final duplo: “Brown Shag Carpet” e “White Orchids”",
    ],
  },
];

export type Trivia = { tag: string; title: string; text: string; ref: string };

export const TRIVIA: Trivia[] = [
  {
    tag: "Títulos",
    title: "Tudo era vermelho",
    text: "Do segundo episódio até “Red John”, o oitavo da 6ª temporada, os títulos fazem referência direta ou indireta ao vermelho. Uma exceção famosa é “18-5-4”, da 2ª temporada: as posições das letras R, E e D no alfabeto. Depois da revelação, os títulos passaram a citar outras cores.",
    ref: "Arquivo 01",
  },
  {
    tag: "Bastidores",
    title: "O vilão tinha a voz do herói",
    text: "Nas aparições de Red John antes da revelação, quem dava voz ao assassino era o próprio Simon Baker. Ele também vestiu o figurino do vilão em um episódio da 2ª temporada.",
    ref: "Arquivo 02",
  },
  {
    tag: "Roteiro",
    title: "Nem o ator sabia",
    text: "Bruno Heller contou que só definiu a identidade de Red John nos últimos anos antes da revelação. Xander Berkeley, o intérprete, só foi avisado durante a 6ª temporada.",
    ref: "Arquivo 03",
  },
  {
    tag: "Trilha",
    title: "Sem metais, sem clarinete",
    text: "Blake Neely compôs a música da série inteira, do piloto ao final. Uma das marcas da trilha é o que ele deixou de fora: instrumentos de metal e clarinete. No 100º episódio, a música usou 100 instrumentos diferentes.",
    ref: "Arquivo 04",
  },
  {
    tag: "Audiência",
    title: "Estreia campeã",
    text: "The Mentalist foi a série nova mais vista da temporada 2008–2009 nos Estados Unidos, com mais de 17 milhões de espectadores por semana.",
    ref: "Arquivo 05",
  },
  {
    tag: "Prêmios",
    title: "Reconhecimento",
    text: "A série ganhou o People’s Choice Award de drama novo favorito em 2009. Simon Baker foi indicado ao Emmy de melhor ator em série dramática em 2009 e, em 2010, ao Globo de Ouro e ao prêmio do Sindicato dos Atores (SAG).",
    ref: "Arquivo 06",
  },
  {
    tag: "Direção",
    title: "Baker atrás da câmera",
    text: "Além de protagonista e produtor, Simon Baker dirigiu episódios, entre eles o que abre a nova fase da série, logo depois do salto de dois anos na 6ª temporada.",
    ref: "Arquivo 07",
  },
  {
    tag: "Produção",
    title: "Beirute em Los Angeles",
    text: "As cenas passadas em Beirute no episódio “Orange Blossom Ice Cream”, da 7ª temporada, foram gravadas em Los Angeles e completadas com imagens reais da cidade feitas por um cinegrafista independente.",
    ref: "Arquivo 08",
  },
  {
    tag: "No Brasil",
    title: "Na TV aberta e na fechada",
    text: "Por aqui, a série foi exibida no SBT, na TV aberta, e no Warner Channel, na TV por assinatura.",
    ref: "Arquivo 09",
  },
  {
    tag: "Elenco",
    title: "A volta para o final",
    text: "Owain Yeoman e Amanda Righetti deixaram a série no 15º episódio da 6ª temporada e voltaram para o último episódio, em 2015.",
    ref: "Arquivo 10",
  },
  {
    tag: "Origem",
    title: "Australiano em Sacramento",
    text: "O protagonista que encarna o charme americano da Califórnia é australiano: Simon Baker nasceu na Austrália e construiu carreira em Hollywood antes da série.",
    ref: "Arquivo 11",
  },
  {
    tag: "Final",
    title: "Duas horas de despedida",
    text: "A série terminou em 18 de fevereiro de 2015 com dois episódios exibidos em sequência na mesma noite, somando 151 episódios em sete temporadas.",
    ref: "Arquivo 12",
  },
];

export const SOURCES = [
  { label: "Wikipedia — The Mentalist", url: "https://en.wikipedia.org/wiki/The_Mentalist" },
  { label: "Wikipedia — Lista de episódios", url: "https://en.wikipedia.org/wiki/List_of_The_Mentalist_episodes" },
  { label: "IMDb — Prêmios", url: "https://www.imdb.com/title/tt1196946/awards" },
  { label: "CBS News — Simon Baker", url: "https://www.cbsnews.com/news/simon-baker-on-mentalist-fame" },
];
