import {LOCALES} from '../locales'

export default {
    [LOCALES.PORTUGUESE]:{
       login:{
           signIn:'Entrar',
           signUp:'Registar',
           welcome: 'Bem-vindo ao',
           username: 'nome de utilizador',
           password: 'palavra-chave',
           remember: 'Lembrar',
           forgotPass: 'Esqueceu-se da palavra-chave?'
       },
       HomePage:{
                slogan: 'Tudo o que precisas de saber sobre o teu projeto',
                integrations: 'Integrações',
                images:{
                    title: 'Fácil e Simples',
                    image1: 'Todos os gráficos de que precisas',
                    image2: 'Vê todos os teus projectos num único sitio' 
                },
                footer:{
                    aboutUs: 'Sobre nós',
                    terms: 'termos',
                    privacyPolicy: 'política de privacidade',
                    contactUs: 'contactos'
                }
       },
       Projects:{
           projects: 'Meus Projetos',
           project: 'Projeto',
           state: 'Estado',
           manager: 'Gerente',
           completion: 'Conclusão',
           button: 'Adicionar novo ',
           dialogButton:{
               title: 'Adicionar Projecto',
               subTitle: 'Cria um novo projeto',
               name: 'Nome',
               description: 'Descrição',
               endDate: 'Data de fim',
               cancel: 'cancelar'
           }
       },
       NavBar: {
           home: 'Casa',
           notifications: 'Notificações',
           settings: 'Definições',
           account: 'Conta'
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
          tools: 'Ferramentas'
      },
     Profile: {
         numberOfProjects: 'Número de Projetos',
         changePassowrd: {
             button: 'Alterar palavra-chave',
             firstInput: 'Palavra-chave antiga',
             secondInput: 'Nova Palavra-chave',
             thirdInput: 'Confirmar Nova Palavra-chave',
             cancel: 'cancelar',
             confirm:'confirmar'
         }
     }  
    }
}