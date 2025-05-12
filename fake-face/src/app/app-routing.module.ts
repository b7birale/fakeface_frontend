import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard.component';

const routes: Routes = [
  { 
    path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'friends', 
    loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'people', 
    loadChildren: () => import('./pages/people/people.module').then(m => m.PeopleModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'requests', 
    loadChildren: () => import('./pages/requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'feed', 
    loadChildren: () => import('./pages/feed/feed.module').then(m => m.FeedModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'chatrooms', 
    loadChildren: () => import('./pages/chatroom/chatroom.module').then(m => m.ChatroomModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { 
    path: '**', 
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
