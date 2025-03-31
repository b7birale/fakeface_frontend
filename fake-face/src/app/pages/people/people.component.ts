import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../shared/services/util/util.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as PeopleAction from '../../shared/services/people/people-store/people.action';
import { Subject, takeUntil } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserPerson } from '../../shared/models/user/user-person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})

export class PeopleComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  safeImg!: SafeResourceUrl;
  userId: number = 0;
  people: UserPerson[] = []

  constructor(
    private router: Router,
    private utilService: UtilService,
    private store: Store,
    private action$?: Actions
  ){
    action$?.pipe(ofType(PeopleAction.GellAllUsersSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.people = response.data;
        this.createSafeUrls();
        console.log("response.data: ", response.data);
      }
    })
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("id"));
    if(this.userId){
      this.store.dispatch(PeopleAction.GellAllUsers({data: this.userId.toString()}));
    }
  }
  
  createSafeUrls(){
    this.people = JSON.parse(JSON.stringify(this.people));
    for (let index = 0; index < this.people.length; index++) {
      if(this.people[index].profilePicture && this.people[index].profilePicture !== ''){
        this.people[index].pictureSafeUrl = this.utilService.decodeBase64ImageFileToSecurityTrustResource(this.people[index].profilePicture!);
      }
    }
  }


}