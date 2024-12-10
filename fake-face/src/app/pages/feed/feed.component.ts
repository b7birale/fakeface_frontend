import { Component, OnInit } from '@angular/core';
import { FeedObject } from '../../shared/constants/constants';
import { Comment } from '../../shared/models/Comment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../shared/services/post/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})

export class FeedComponent implements OnInit {

  feedObject: Array<any> = FeedObject;

  chosenImage: any;

  //commentObject: Comment = {};
  comments: Array<Comment> = []; //egyelőre ebben a tömbben tároljuk a kommenteket -> később erre adatbázis lesz ofc

  commentsForm = this.createForm({
    username: '',
    comment: '',
    date: new Date()
  })

  constructor(private fb: FormBuilder, private router: Router, private postService: PostService){
  }

  ngOnInit(): void {
    const userId = localStorage.getItem("id");
    if(userId){
      this.postService.getPostsByUserIds(userId).subscribe(data => console.log('Raw data:', data));
    }  
  }

  createForm(model: Comment){
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  /*
  constructor(){
    this.chosenImage = this.feedObject[0];
  }
  */


  reload(){
    
  }

  addComment() {
    if (this.commentsForm.valid){
      if(this.commentsForm.get('username') && this.commentsForm.get('comment')){
        this.commentsForm.get('date')?.setValue(new Date());
        //SPREAD OPERÁTOR: {... }
        //this.comments.push({...this.commentObject});
  
        this.comments.push({...this.commentsForm.value as Comment});
        ///this.router.navigateByUrl('/feed');
        //console.log("Sikeres komment :)");
  
        //másik megoldás:
        //this.comments.push(Object.assign({}, this.commentObject));
      }
    } /*else{
      console.log("Sikertelen komment!");
    }*/

  }

}
