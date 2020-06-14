import { Injectable, OnInit } from "@angular/core";
import { TokenStorageService } from "../../core/services/token_storage/token-storage.service";

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS_STUDENT = [
  {
    label: "Dashboard",
    main: [
      {
        state: "dashboard",
        name: "MENU_ITEM.HOME",
        type: "link",
        icon: "fa fa-tachometer",
      },
    ],
  },
  {
    label: "MENU_ITEM.STUDENT_SPACE",
    main: [
      {
        state: "studentSpace",
        name: "MENU_ITEM.STUDENT_SPACE",
        type: "link",
        icon: "icofont icofont-student-alt",
      },
     
    ],
  },

  {
    label: "MENU_ITEM.EXAM",
    main: [
      {
        state: "studentExam",
        name: "MENU_ITEM.EXAM",
        type: "link",
        icon: "fa fa-list-alt",
      },
    ],
  },

];
const MENUITEMS_TEACHER = [
  {
    label: "Dashboard",
    main: [
      {
        state: "dashboard",
        name: "MENU_ITEM.HOME",
        type: "link",
        icon: "fa fa-tachometer",
      },
    ],
  },
 
  {
    label: "Module",

    main: [
          {
            state: "moduleTeacher",
            name: "MENU_ITEM.AFFCTED_MODULE",
            icon: "fa fa-link",
            type: "link",
          },
          {
            state: "course",
            name: "MENU_ITEM.COURSE",
            icon: "fa fa-book",
            type: "link",
          },
         
          {
            state: "exercices",
            name: "Exercices",
            icon: "fa fa-pencil",
            type: "link",
          },
          {
            state: "exam",
            name: "Exam",
            icon: "fa fa-list-alt",
            type: "link",
          },
          {
            state: "studentExamProg",
            name: "Student prog",
            icon: "fa fa-list-alt",
            type: "link",
          },
        
      
    ],
  },
  
 

];
const MENUITEMS_ADMIN_CLIENT = [
  {
    label: "Dashboard",
    main: [
      {
        state: "dashboard",
        name: "MENU_ITEM.HOME",
        type: "link",
        icon: "fa fa-tachometer",
      },
    ],
  },
 
  {
    label: "Administration",
    main: [
  
          {
            state: "user",
            name: "Utilisateur",
            icon: "fa fa-users",
            type: "link",
          },
          {
            state: "group",
            name: "Group",
            icon: "fa fa-building-o",
            type: "link",
          },
          {
            state: "level",
            name: "Level",
            icon: "fa fa-signal",
            type: "link",
          },
          {
            state: "branch",
            name: "Branch",
            icon: "fa fa-institution",
            type: "link",
          },
          {
            state: "session",
            name: "Session",
            icon: "fa fa-clock-o",
            type: "link",
          },
          {
            state: "moduleAffected",
            name: "MENU_ITEM.AFFCTED_MODULE",
            icon: "fa fa-link",
            type: "link",
          },
          {
            state: "module",
            name: "MENU_ITEM.MODULE",
            icon: "fa fa-bookmark",
            type: "link",
          },          {
            state: "personalization",
            name: "MENU_ITEM.PERSONALIZATION",
            icon: "fa fa-gears",
            type: "link",
          },
         
        
    ],
  },
];
const MENUITEMS_ADMIN_TECHNIQUE = [
  {
    label: "Dashboard",
    main: [
      {
        state: "dashboard",
        name: "MENU_ITEM.HOME",
        type: "link",
        icon: "fa fa-tachometer",
      },
    ],
  },
 
  {
    label: "Administration",
    main: [
      {
        state: "administration_menu",
        name: "Administration",
        type: "sub",
        icon: "fa fa-users",
        children: [
          {
            state: "user",
            name: "Utilisateur",
            icon: "fa fa-users",
          },
          {
            state: "organization",
            name: "Organization",
            icon: "fa fa-building-o",
          },
          
          {
            state: "licence",
            name: "Licence",
            icon: "fa fa-shopping-bag",
          },
        ],
      },
    ],
  },
];
@Injectable()
export class MenuItems {
constructor(private tokenStorageService:TokenStorageService){

}  

  getAll(): Menu[] {
    const role =this.tokenStorageService.getRoleUser()!==null?this.tokenStorageService.getRoleUser().name:null;
  if(role){
    switch (role) {
     case "ROLE_STUDENT":
       return MENUITEMS_STUDENT;
    case "ROLE_TEACHER":
      return MENUITEMS_TEACHER;
      case "ROLE_ADMIN_CLIENT":
        return MENUITEMS_ADMIN_CLIENT;
        case "ROLE_ADMIN_TECHNIQUE":
          return MENUITEMS_ADMIN_TECHNIQUE;
     default:
       break;
   }
  }
  }

 
}
