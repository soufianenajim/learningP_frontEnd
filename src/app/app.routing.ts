import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        loadChildren: "./dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "chapter",
        loadChildren: "./components/chapter/chapter.module#ChapterModule"
      },
      {
        path: "course",
        loadChildren: "./components/course/course.module#CourseModule"
      },
      {
        path: "module",
        loadChildren: "./components/module/module.module#ModuleModule"
      },{
        path: "td",
        loadChildren: "./components/td/td.module#TdModule"
      },{
        path: "paragraph",
        loadChildren: "./components/paragraph/paragraph.module#ParagraphModule"
      },{
        path: "quiz",
        loadChildren: "./components/quiz/quiz.module#QuizModule"
      }
      ,{
        path: "note_quiz",
        loadChildren: "./components/note-quiz/note-quiz.module#NoteQuizModule"
      }

    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "authentication",
        loadChildren:
          "./authentication/authentication.module#AuthenticationModule"
      },
      {
        path: "landing",
        loadChildren: "./landing/landing.module#LandingModule"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "error/404"
  }
];
