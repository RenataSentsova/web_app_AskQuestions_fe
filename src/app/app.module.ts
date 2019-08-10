import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule, Routes} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { AskComponent } from './ask/ask.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { QuestionsComponent } from './questions/questions.component';
import {DataTableModule} from "angular-6-datatable";
import { QuestionAndAnswersComponent } from './question-and-answers/question-and-answers.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { StatisticsComponent } from './statistics/statistics.component';

const appRoutes :Routes = [
  {
    path:"statistics",
    component: StatisticsComponent
  },
  {
    path: "addSubcategory",
    component: AddSubcategoryComponent
  },
  {
    path: "addCategory",
    component: AddCategoryComponent
  },
  {
    path: "profile/:userId",
    component: ProfileComponent
  },
  {
    path: "profile/:userId/:questionId/addAnswer",
    component: AddAnswerComponent
  },
  {
    path: ":subcategoryId/questions/:questionId/addAnswer",
    component: AddAnswerComponent
  },
  {
    path: "categories/:subcategoryId/questions/:questionId/addAnswer",
    component: AddAnswerComponent
  },
  {
    path: "profile/:userId/:questionId",
    component: QuestionAndAnswersComponent
  },
  {
    path: "home/:questionId",
    component: QuestionAndAnswersComponent
  },

  {
    path: ":subcategoryId/questions/:questionId",
    component: QuestionAndAnswersComponent
  },
  {
    path: "categories/:subcategoryId/questions/:questionId",
    component: QuestionAndAnswersComponent
  },
  {
    path: ':subcategoryId/questions',
    component: QuestionsComponent
  },
  {
    path: 'categories/:subcategoryId/questions',
    component: QuestionsComponent
  },
  {
    path:'categories',
    component: CategoriesComponent
  },
  {
    path:'ask',
    component: AskComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CategoriesComponent,
    NotFoundComponent,
    AskComponent,
    QuestionsComponent,
    QuestionAndAnswersComponent,

    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddAnswerComponent,
    ProfileComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    StatisticsComponent
  ],
  imports: [
    DataTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]

})
export class AppModule { }
