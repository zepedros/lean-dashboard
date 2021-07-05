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
                slogan: 'Tout ce que vous devez savoir sur votre projet',
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
           home: 'Domicile',
           notifications: 'Notifications',
           settings: 'Paramètres',
           account: 'Compte'
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
          addMembers: 'Ajouter des membres',
          addCredentials: "Ajouter des informations d'identification",
          roles: 'Rôles',
          tools: 'Outils'
      },
     Profile: {
         numberOfProjects: 'Nombre de projets',
         changePassowrd: {
             button: 'Changer le mot de passe',
             firstInput: 'Ancien mot de passe',
             secondInput: 'New Password',
             thirdInput: 'Nouveau mot de passe',
             cancel: 'Annuler',
             confirm:'Confirmer'
         }
     }  
    }
}