import {LOCALES} from '../locales'

export default {
    [LOCALES.PORTUGUESE]:{
       login:{
           signIn:'Entrar', //
           signUp:'Registar',//
           welcome: 'Bem-vindo ao',//
           username: 'nome de utilizador',//
           password: 'palavra-chave',//
           remember: 'Lembrar',//
           forgotPass: 'Esqueceu-se da palavra-chave?'//
       },
       HomePage:{
                slogan1: 'Tudo o que precisas de ',//
                slogan2:'saber sobre o teu projeto',//
                integrations: 'Integrações',//
                images:{
                    title: 'Fácil e Simples',//
                    image1: 'Todos os gráficos de que precisas',//
                    image2: 'Vê todos os teus projectos num único sitio' //
                },
                footer:{
                    aboutUs: 'Sobre nós',//
                    terms: 'termos',//
                    privacyPolicy: 'política de privacidade',//
                    contactUs: 'contactos'//
                }
       },
       Projects:{
           projects: 'Meus Projetos',//
           project: 'Projeto',//
           state: 'Estado',//
           manager: 'Gerente',//
           completion: 'Conclusão',//
           button: 'Adicionar novo ',//
           dialogButton:{
               title: 'Adicionar Projecto', //
               subTitle: 'Cria um novo projeto', //
               name: 'Nome',//
               description: 'Descrição',//
               endDate: 'Data de fim',//
               cancel: 'cancelar'//
           }
       },
       NavBar: {
           home: 'Início',//
           notifications: 'Notificações',//
           settings: 'Definições',//
           account: 'Conta',//
           profile: 'Perfil',//
           logOut: 'Sair'//
       }, 
       Dashboards:{
           dashboards: 'Painel de Controlo', 
           VerticalButton:{
               firstButton: 'Adicionar Painel de Controlo',
               secondButton: 'Definições de Projeto'
           },
           dialogButton:{
            title: 'Adicionar Painel de Controlo',
            subTitle: 'Cria um novo Painel de Controlo',
            name: 'Nome',
            description: 'Descrição',
            cancel: 'cancelar'
        }
       },
      Dashboard: {
          VerticalButton:{
            firstButton: 'Adicionar Widget',
            secondButton: 'Definições Painel de Controlo',
            thirdButton: 'Apagar Painel de Controlo',
            fourthButton: 'Definições de Widgets'
          }
      },
      ProjectSettings: {
          settings: 'Definições',
          submit: 'Submeter',
          addMembers: 'Adicionar Membros',
          addCredentials: 'Adicionar Credenciais',
          roles: 'Papéis',
          tools: 'Ferramentas',
          username:"nome do utilizador"
      },
     Profile: {
         profile:"Perfil",
         username:"Nome de utilizador",
         numberOfProjects: 'Número de Projetos',
         changePassowrd: {
             button: 'Alterar palavra-chave',
             firstInput: 'Palavra-chave antiga',
             secondInput: 'Nova Palavra-chave',
             thirdInput: 'Confirmar Nova Palavra-chave',
             cancel: 'cancelar',
             confirm:'confirmar'
         }
     },
     Widget:{
         button: "Adicionar Widget",
         source: "Fonte",
         config: "Configuração do Widget",
         subTitle: "Selecione as credenciais",
         subTitle1: "Selecione o tempo de atualização do Widget",
         time: "Tempo",
         interval:"Intervalo de tempo de atualização",
         checkbox: "Data Especifica",
         cancel:"Cancelar"
     } ,
     Settings: {
         settings: "Definições",
         language: "Idioma",
         createAccount: "Criar uma conta",
         title: "Como super utilizador ou gerente de projeto, pode criar uma conta para um colega. Nome de utilizador e palavra-chave podem ser alteradas pelo seu colega.",
         username:"Nome de utilizador",
         password: "Palavra-chave",
         cancel:"cancelar"
     } 
    }
}