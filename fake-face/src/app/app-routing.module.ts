import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) 
  },
  { 
    path: 'friends', 
    loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsModule) 
  },
  { 
    path: 'feed', 
    loadChildren: () => import('./pages/feed/feed.module').then(m => m.FeedModule) 
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { 
    path: '', 
    redirectTo: '/feed',
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
