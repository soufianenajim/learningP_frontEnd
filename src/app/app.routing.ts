import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule' },
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
        path: "course",
        loadChildren: "./modules/course/course.module#CourseModule"
      },
    
      {
        path: "moduleAffected",
        loadChildren: "./modules/module/module.module#ModuleModule"
      },
      {
        path: "studentSpace",
        loadChildren: "./modules/student-space/student-space.module#StudentSpaceModule"
      },
      {
        path: "exercices",
        loadChildren: "./modules/exercices/exercices.module#ExercicesModule"
      },
      {
        path: "exam",
        loadChildren: "./modules/exam/exam.module#ExamModule"
      },{
        path: "studentExam",
        loadChildren: "./modules/note-exam/note-exam.module#NoteExamModule"
      },
      {
        path: "studentExamProg",
        loadChildren: "./modules/student-space-prog/student-space-prog.module#StudentSpaceProgModule"
      },
      {
        path: "moduleTeacher",
        loadChildren: "./modules/module-teacher/module-teacher.module#ModuleTeacherModule"
      },
      {
        path: "user",
        loadChildren: "./modules/user/user.module#UserModule"
      },{
        path: "organization",
        loadChildren: "./modules/organization/organization.module#OrganizationModule"
      },{
        path: "licence",
        loadChildren: "./modules/licence/licence.module#LicenceModule"
      },{
        path: "level",
        loadChildren: "./modules/level/level.module#LevelModule"
      },
      {
        path: "group",
        loadChildren: "./modules/group/group.module#GroupModule"
      },
      {
        path: "branch",
        loadChildren: "./modules/branch/branch.module#BranchModule"
      },{
        path:"module",
        loadChildren:"./modules/module-name/module-name.module#ModuleNameModule"
      },  {
        path: "session",
        loadChildren: "./modules/session/session.module#SessionModule"
      },
      {
        path: "personalization",
        loadChildren: "./modules/personalization/personalization.module#PersonalizationModule"
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
