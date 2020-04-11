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
        icon: "ti-home"
      }
    ]
  },
  {
    label: "Module",
    main: [
      {
        state: "managedModule",
        name: "Gestion des Modules",
        type: "link",
        icon: "ti-home"
      },
      {
        state: "studentSpace",
        name: "Espace étudiant",
        type: "link",
        icon: "ti-home"
      },
      {
        state: "course",
        name: "Cour",
        type: "link",
        icon: "ti-home"
      },
      {
        state: "chapter",
        name: "Chapitre",
        type: "link",
        icon: "ti-home"
      },
      {
        state: "paragraph",
        name: "Paragraphe",
        type: "link",
        icon: "ti-home"
      },
      {
        state: "td",
        name: "Td",
        type: "link",
        icon: "ti-home"
      }
    ]
  },{
    label: "Question",
    main: [
      {
        state: "question",
        name: "Question",
        type: "link",
        icon: "ti-home"
      }

    ]
  },
  {
    label: "Quiz",
    main: [
      {
        state: "quiz",
        name: "Quiz",
        type: "link",
        icon: "ti-home"
      }, {
        state: "note_quiz",
        name: "NoteQuiz",
        type: "link",
        icon: "ti-home"
      }

    ]
  },{
    label: "Exam",
    main: [
      {
        state: "exam",
        name: "Exam",
        type: "link",
        icon: "ti-home"
      }, {
        state: "noteExam",
        name: "NoteExam",
        type: "link",
        icon: "ti-home"
      }
      
    ]
  },
  {
    label: "Administration",
    main: [
      {
        state: "user",
        name: "Utilisateur",
        type: "link",
        icon: "ti-home"
      }, {
        state: "organization",
        name: "Organization",
        type: "link",
        icon: "ti-home"
      }, {
        state: "level",
        name: "Level",
        type: "link",
        icon: "ti-home"
      },
       {
        state: "branch",
        name: "Branch",
        type: "link",
        icon: "ti-home"
      },
      {
        state: "licence",
        name: "Licence",
        type: "link",
        icon: "ti-home"
      }
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
