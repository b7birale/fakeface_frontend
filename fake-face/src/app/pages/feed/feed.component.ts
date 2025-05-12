import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedObject } from '../../shared/constants/constants';
import { Comment } from '../../shared/models/Comment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../shared/services/post/post.service';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { TOAST_STATE, ToastService } from '../../shared/toast/toast.service';
import * as PostAction from '../../shared/services/post/post-store/post.action';
import * as FriendAction from '../../shared/services/friend/friend-store/friend.action';
import * as CommentAction from '../../shared/services/comment/comment-store/comment.action';
import { Store } from '@ngrx/store';
import { Post } from '../../shared/models/post/post.model';
import { PostFeed } from '../../shared/models/post/post-feed.model';
import { UtilService } from '../../shared/services/util/util.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';
import { FeedComment } from '../../shared/models/comment/comment.feed.model';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})

export class FeedComponent implements OnInit, OnDestroy {

  feedObject: Array<any> = FeedObject;
  chosenImage: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup = new FormGroup({});
  posts: Array<PostFeed> = [];
  selectedFile!: File | undefined;
  selectedFileEncoded: string = '';
  selectedFileName?: string = undefined;
  userId: number = 0;
  safeImg!: SafeResourceUrl;
  compressedImage: string = "";

  post: Post = {
    title: '',
    post_id: 0,
    user_id: 0,
    content: '',
    date: new Date()
  }

  //commentObject: Comment = {};
  comments: Array<Comment> = []; //egyelőre ebben a tömbben tároljuk a kommenteket -> később erre adatbázis lesz ofc

  commentsForm = this.createForm({
    username: '',
    comment: '',
    date: new Date()
  })

  commentsMap: Map<number, FeedComment[]> = new Map<number, FeedComment[]>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private imgCompress: NgxImageCompressService,
    private utilService: UtilService,
    private toastService: ToastService,
    private store: Store,
    private action$?: Actions
  ){

    action$?.pipe(ofType(PostAction.GetPostsByUserIdsSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.posts = JSON.parse(JSON.stringify(response.data));
        this.createCommentsMap(this.posts);
        this.createSafeUrls();
      }
      this.clearForm();
    })

    action$?.pipe(ofType(FriendAction.GetFriendsIdsByUserIdSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        let userids_str = this.createStringFromUserIds(response.data);
        this.store.dispatch(PostAction.GetPostsByUserIds({data: userids_str}));
      }
    })

    action$?.pipe(ofType(PostAction.CreatePostSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        this.toastService.showToast(TOAST_STATE.success, "Sucessful!");
        const userId = localStorage.getItem("id");
        if(userId){
          this.store.dispatch(FriendAction.GetFriendsByUserId({data: userId}));
        }
      }
    })

    action$?.pipe(ofType(CommentAction.GetCommentsByPostIdSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        console.log(response.data);
        this.commentsMap.set(JSON.parse(JSON.stringify(response.data[0].postId)), JSON.parse(JSON.stringify(response.data)));
      }
    })

  } 

  ngOnInit(): void {
    this.initForm();
    this.userId = Number(localStorage.getItem("id"));
    if(this.userId){
      this.store.dispatch(FriendAction.GetFriendsIdsByUserId({data: this.userId.toString()}));
    }
  }

  createForm(model: Comment){
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  getFormValues(){
    this.post = JSON.parse(JSON.stringify(this.post));

    this.post.title = this.form.controls['title'].value;
    this.post.content = this.form.controls['content'].value;
    this.post.user_id = Number(localStorage.getItem("id"));
    
    this.post.date = new Date();

    if(this.selectedFileEncoded){
      this.post.picture = this.compressedImage;
    }
    if(!this.post.title){
      this.toastService.showToast(TOAST_STATE.warning, "Please write a title!");
    } else if(!this.post.content){
      this.toastService.showToast(TOAST_STATE.warning, "Please write content!");
    } else if (this.post.title && this.post.content && this.post.user_id){
      this.store.dispatch(PostAction.CreatePost({data: this.post}));
    } else{
      this.toastService.showToast(TOAST_STATE.warning, "Error!");
    }

  }


  createStringFromUserIds(userIds: number[]){
    let userid = "";
    userid = userid + this.userId.toString();
    for (let index = 0; index < userIds.length; index++) {
      const element = userIds[index];
      userid = userid + "," + element;
    }
    return userid;
  }

  reload(){}

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

  
  initForm(){
    this.form.addControl('title', new FormControl<string|null>(''));
    this.form.addControl('content', new FormControl<string|null>(''));
  }

  postClick(){
    this.getFormValues();
  }

  showCommentsClick(postId: number){
    if(postId){
      this.createCommentsMap(this.posts);
      this.store.dispatch(CommentAction.GetCommentsByPostId({data: postId}));
    }
  }

  createCommentsMap(posts: PostFeed[]){
    posts.forEach(x => {
      this.commentsMap.set(x.postId, []);
    })
  }

  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0]; 
    
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
        if (this.selectedFile.type === "image/png" || this.selectedFile.type === "image/jpg" || this.selectedFile.type === "image/jpeg") {
            this.utilService.convertFileToBase64(this.selectedFile).subscribe(res => {
                this.selectedFileEncoded = res;

                const reader = new FileReader();
                reader.readAsDataURL(this.selectedFile as Blob);
                reader.onload = () => {
                const base64String = reader.result as string;
                this.imgCompress.compressFile(base64String, -1, 50, 50).then(
                    (result: DataUrl) => {
                        this.compressedImage = result;
                    }
                  ).catch(error => {
                      console.error('Compression Error:', error);
                  });
                };

            });
        }
        
    } 

    /*

    this.imgCompress.uploadAndGetImageWithMaxSize(0.05)
    .then((result: string) => {
      this.selectedFileEncoded = result;
      console.log(atob(result));
    },
      (bestresult) => {
        this.selectedFileEncoded = bestresult;
        console.log(atob(bestresult));
      }
    ) */

  }

  fileChanged(event: any){
    this.selectedFileName = event.target.files[0].name;
    console.log(event);
  }


  createSafeUrls(){
    this.posts = JSON.parse(JSON.stringify(this.posts));
    for (let index = 0; index < this.posts.length; index++) {
      if(this.posts[index].picture && this.posts[index].picture !== ''){
        this.posts[index].pictureSafeUrl = this.utilService.decodeBase64ImageFileToSecurityTrustResource(this.posts[index].picture!);
      }
    }
  }

  clearForm(){
    this.form.reset();
    this.selectedFileName = "";
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
