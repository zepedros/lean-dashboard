import {LOCALES} from '../locales'

export default {
    [LOCALES.FRENCH]:{
       login:{
           signIn:'Entrer',
           signUp:"S'inscrire",
           welcome: 'Bienvenue à',
           username: "Nom d'utilisateur",
           password: 'Mot de passe',
           remember: 'Souviens-toi de moi',
           forgotPass: 'Mot de passe oublié?'
       },
       HomePage:{
                slogan1: 'Tout ce que vous devez ',
                slogan2: 'savoir sur votre projet',
                integrations: 'Intégrations',
                images:{
                    title: 'Facile et simple',
                    image1: 'Tous les widgets dont vous avez besoin',
                    image2: 'Voir tous vos projets en un seul endroit' 
                },
                footer:{
                    aboutUs: 'À PROPOS DE NOUS',
                    terms: 'TERMES',
                    privacyPolicy: 'POLITIQUE DE CONFIDENTIALITÉ',
                    contactUs: 'NOUS CONTACTER'
                }
       },
       Projects:{
           projects: 'Mes projets',
           project: 'Projets',
           state: 'État',
           manager: 'Directeur',
           completion: 'Achèvement',
           button: 'AJOUTER NOUVEAU',
           dialogButton:{
               title: 'Ajouter un projet',
               subTitle: 'Créer un nouveau projet',
               name: 'Nom',
               description: 'Description',
               endDate: 'Date de fin',
               cancel: 'Annuler'
           }
       },
       NavBar: {
           home: 'Accueil',
           notifications: 'Notifications',
           settings: 'Paramètres',
           account: 'Compte',
           profile: 'Profil',
           logOut: 'Se déconnecter'
       }, 
       Dashboards:{
           dashboards: 'Tableaux de bord',
           VerticalButton:{
               firstButton: 'Ajouter un tableau de bord',
               secondButton: 'Paramètres du projet'
           },
           dialogButton:{
            title: 'Ajouter un tableau de bord',
            subTitle: 'Créer un nouveau tableau de bord',
            name: 'Nom',
            description: 'Description',
            cancel: 'Annuler'
        }
       },
      Dashboard: {
          VerticalButton:{
            firstButton: 'Ajouter un widget',
            secondButton: 'Paramètres du tableau de bord',
            thirdButton: 'Supprimer le tableau de bord',
            fourthButton: 'Paramètres des widgets'
          }
      },
      ProjectSettings: {
          settings: 'Paramètres',
          submit: 'Soumettre',
          credentials: 'TODO',
          addMembers: 'Ajouter des membres',
          addCredentials: "Ajouter des informations d'identification",
          roles: 'Rôles',
          tools: 'Outils',
          username:"Nom d'utilisateur"
      },
     Profile: {
         profile:"Profil",
         username:"Nom d'utilisateur",
         numberOfProjects: 'Nombre de projets',
         changePassowrd: {
             button: 'Changer le mot de passe',
             firstInput: 'Ancien mot de passe',
             secondInput: 'New Password',
             thirdInput: 'Nouveau mot de passe',
             cancel: 'Annuler',
             confirm:'Confirmer'
         }
     },
     Widget:{
        button: "Ajouter un widget",
        source: "Source",
        config: "Configuration des widgets",
        subTitle: "Sélectionnez les informations d'identification",
        subTitle1: "Sélectionnez l'heure de mise à jour du widget",
        time: "Temps",
        interval:"intervalle de temps de mise à jour",
        checkbox: "Date spécifique",
        cancel:"Annuler"
    } ,
    Settings: {
        settings: "Définitions",
        language: "Langue",
        createAccount: "Créer un compte",
        title: "En tant que super utilisateur ou chef de projet, vous pouvez créer un compte pour un collègue. Le nom d'utilisateur et le mot de passe peuvent être modifiés par votre collègue.",
        username:"Nom d'utilisateur",
        password: "mot de passe",
        cancel:"Annuler",
        userManagement: "gestion des utilisateurs"
    }   
    }
}