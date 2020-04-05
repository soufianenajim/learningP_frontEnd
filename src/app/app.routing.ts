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
        loadChildren: "./modules/chapter/chapter.module#ChapterModule"
      },
      {
        path: "course",
        loadChildren: "./modules/course/course.module#CourseModule"
      },
      {
        path: "module",
        loadChildren: "./modules/module/module.module#ModuleModule"
      },{
        path: "td",
        loadChildren: "./modules/td/td.module#TdModule"
      },{
        path: "paragraph",
        loadChildren: "./modules/paragraph/paragraph.module#ParagraphModule"
      },
      {
        path: "question",
        loadChildren: "./modules/question/question.module#QuestionModule"
      },
      {
        path: "quiz",
        loadChildren: "./modules/quiz/quiz.module#QuizModule"
      }
      ,{
        path: "note_quiz",
        loadChildren: "./modules/note-quiz/note-quiz.module#NoteQuizModule"
      }
      ,{
        path: "exam",
        loadChildren: "./modules/exam/exam.module#ExamModule"
      },{
        path: "note_exam",
        loadChildren: "./modules/note-exam/note-exam.module#NoteExamModule"
      },{
        path: "user",
        loadChildren: "./modules/user/user.module#UserModule"
      },{
        path: "organization",
        loadChildren: "./modules/organization/organization.module#OrganizationModule"
      },{
        path: "licence",
        loadChildren: "./modules/licence/licence.module#LicenceModule"
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
      }
    ]
  },
  {
    path: "**",
    redirectTo: "error/404"
  }
];
