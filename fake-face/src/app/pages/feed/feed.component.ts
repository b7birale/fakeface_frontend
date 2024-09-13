import { Component, OnChanges, OnInit } from '@angular/core';
//import { FeedObject } from '../../shared/constants/constants';
import { Comment } from '../../shared/models/Comment';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedimagesService } from '../../shared/services/feedimages.service';
import { Image } from '../../shared/models/Image';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})

export class FeedComponent implements OnInit, OnChanges {
  //feedObject: Array<any> = FeedObject;
  feedObject?: Array<Image>;
  chosenImage?: Image;
  loadedImage?: string;

  //commentObject: Comment = {};
  comments: Array<Comment> = []; //egyelőre ebben a tömbben tároljuk a kommenteket -> később erre adatbázis lesz ofc

  commentsForm = this.createForm({
    username: '',
    comment: '',
    date: new Date()
  })

  
  constructor(private fb: FormBuilder, private router: Router, private feedimagesService: FeedimagesService){
    //console.log("Ez a konstruktor");
  }

  ngOnChanges(): void{
    if(this.chosenImage?.id){
      this.feedimagesService.loadImage(this.chosenImage?.id + '.jpg').subscribe(data => {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        }
      })
    }
  }

  ngOnInit(): void{
    this.feedimagesService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
      this.feedObject = data;
    })
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
    //ide kéne valami!
    return this.chosenImage;
  }

  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
    this.reload();
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
