import { Injectable } from "@angular/core";

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

const MENUITEMS = [
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
        icon: "fa fa-graduation-cap",
      },
    ],
  },
  {
    label: "Module",

    main: [
      {
        state: "module_menu",
        name: "MENU_ITEM.PROFESSOR_SPACE",
        type: "sub",
        icon: "fa fa-chalkboard-teacher",
        children: [
          {
            state: "module",
            name: "MENU_ITEM.MANAGED_MODULE",
            icon: "ti-home",
          },
          {
            state: "course",
            name: "MENU_ITEM.COURSE",
            icon: "ti-home",
          },        
          {
            state: "td",
            name: "Td",
            icon: "ti-home",
          },
        ],
      },
    ],
  },
  {
    label: "Question",
    main: [
      {
        state: "question",
        name: "Question",
        type: "link",
        icon: "fa fa-question",
      },
    ],
  },
  {
    label: "Quiz",
    main: [
      {
        state: "quiz_menu",
        name: "Quiz",
        type: "sub",
        icon: "fa fa-pencil",
        children: [
          {
            state: "quiz",
            name: "Quiz",
            icon: "fa fa-pencil",
          },
          {
            state: "note_quiz",
            name: "NoteQuiz",
            icon: "fa fa-list-alt",
          },
        ]
      }
    ]
  },
  {
    label: "Exam",
    main: [
      {
        state: "exam_menu",
        name: "Exam",
        type: "sub",
        icon: "fa fa-pencil",
        children :[
          {
            state: "exam",
            name: "Exam",
            icon: "fa fa-pencil",
          },
          {
            state: "noteExam",
            name: "NoteExam",
            icon: "fa fa-list-alt",
          },
        ]
      }
    ]
  },
  {
    label: "Administration",
    main: [
      {
        state: "administration_menu",
        name: "Administration",
        type: "sub",
        icon: "ti-home",
        children:[
          {
            state: "user",
            name: "Utilisateur",
            icon: "fa fa-user",
          },
          {
            state: "organization",
            name: "Organization",
            icon: "fa fa-sitemap",
          },
          {
            state: "level",
            name: "Level",
            icon: "fa fa-signal",
          },
          {
            state: "branch",
            name: "Branch",
            icon: "fa fa-institution",
          },
          {
            state: "licence",
            name: "Licence",
            icon: "ti-home",
          },
        ]
      },
     
      
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
      MENUITEMS.push(menu);
    }*/
}
