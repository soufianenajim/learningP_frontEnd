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
        name: "Dashboard",
        type: "link",
        icon: "ti-home",
      },
    ],
  },
  {
    label: "Module",

    main: [
      {
        state: "module_menu",
        name: "Module",
        type: "sub",
        icon: "ti-home",
        children: [
          {
            state: "managedModule",
            name: "Gestion des Modules",
            icon: "ti-home",
          },
          {
            state: "studentSpace",
            name: "Espace étudiant",
            icon: "ti-home",
          },
          {
            state: "course",
            name: "Cour",
            icon: "ti-home",
          },
          {
            state: "chapter",
            name: "Chapitre",
            icon: "ti-home",
          },
          {
            state: "paragraph",
            name: "Paragraphe",
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
        icon: "ti-home",
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
        icon: "ti-home",
        children: [
          {
            state: "quiz",
            name: "Quiz",
            icon: "ti-home",
          },
          {
            state: "note_quiz",
            name: "NoteQuiz",
            icon: "ti-home",
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
        icon: "ti-home",
        children :[
          {
            state: "exam",
            name: "Exam",
            icon: "ti-home",
          },
          {
            state: "noteExam",
            name: "NoteExam",
            icon: "ti-home",
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
            icon: "ti-home",
          },
          {
            state: "organization",
            name: "Organization",
            icon: "ti-home",
          },
          {
            state: "level",
            name: "Level",
            icon: "ti-home",
          },
          {
            state: "branch",
            name: "Branch",
            icon: "ti-home",
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
