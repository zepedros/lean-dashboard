import {LOCALES} from '../locales'

export default {
    [LOCALES.ENGLISH]:{
       login:{
           signIn:'Sign in',
           signUp:'Sign up',
           welcome: 'Welcome to Lean Dashboard',
           username: 'Username',
           password: 'Password',
           remember: 'Remember me',
           forgotPass: 'Forgot Password?'
       },
       HomePage:{
                slogan1: 'Everything you need to ',
                slogan2:'know about your project',
                integrations: 'Integrations',
                images:{
                    title: 'Easy and Simple',
                    image1: 'All the widgets you need',
                    image2: 'See all your projects in one place' 
                },
                footer:{
                    aboutUs: 'ABOUT US',
                    terms: 'TERMS',
                    privacyPolicy: 'PRIVACY POLICY',
                    contactUs: 'CONTACT US'
                }
       },
       Projects:{
           projects: 'My Projects',
           project: 'Project',
           state: 'State',
           manager: 'Manager',
           completion: 'Completion',
           button: 'ADD NEW ',
           dialogButton:{
               title: 'Add Project',
               subTitle: 'Create a new project',
               name: 'Name',
               description: 'Description',
               endDate: 'End Date',
               cancel: 'Cancel'
           }
       },
       NavBar: {
           home: 'Home',
           notifications: 'Notifications',
           settings: 'Settings',
           account: 'Account',
           profile: 'Profile',
           logOut: 'Log Out'
       }, 
       Dashboards:{
           dashboards: 'Dashboards',
           VerticalButton:{
               firstButton: 'Add Dashboard',
               secondButton: 'Project Settings'
           },
           dialogButton:{
            title: 'Add Dashboard',
            subTitle: 'Create a new dashboard',
            name: 'Name',
            description: 'Description',
            cancel: 'Cancel'
        }
       },
      Dashboard: {
          VerticalButton:{
            firstButton: 'Add Widget',
            secondButton: 'Dashboard Settings',
            thirdButton: 'Delete Dashboard',
            fourthButton: 'Widgets Settings'
          }
      },
      ProjectSettings: {
          settings: 'Settings',
          submit: 'Submit',
          addMembers: 'Add Members',
          addCredentials: 'Add Credentials',
          roles: 'Roles',
          tools: 'Tools'
      },
     Profile: {
         profile:"Profile",
         numberOfProjects: 'Number of Projects',
         username:"username",
         changePassowrd: {
             button: 'Change Password',
             firstInput: 'Old Password',
             secondInput: 'New Password',
             thirdInput: 'Confirm New Passord',
             cancel: 'cancel',
             confirm:'confirm'
         }
    },
     Widget:{
            button: "Add Widget",
             source: "Source",
             config: "Widget Configuration",
             subTitle: "Select credentials",
             subTitle1: "Select Widget Update Time",
             time: "time",
             interval:"update time interval",
             checkbox: "Specific date",
             cancel:"cancel"
         } ,
     Settings: {
             settings: "Settings",
             language: "Language",
             createAccount: "Create an account",
             title: "As a super user or project manager, you can create an account for a colleague. Username and password can be changed by your colleague.",
             username:"username",
             password: "password",
             cancel:"cancel"
         }   
     }  
}
