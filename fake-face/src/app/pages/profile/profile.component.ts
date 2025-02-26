import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as UserAction from '../../shared/services/user/user-store/user.action';
import { User } from '../../shared/models/user/user.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UtilService } from '../../shared/services/util/util.service';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup = new FormGroup({});
  userId: number = 0;
  safeImg!: SafeResourceUrl;
  chosenImage: any;
  selectedFile!: File | undefined;
  selectedFileEncoded: string = '';
  selectedFileName?: string = undefined;
  compressedImage: string = "";
  user: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    user_id: 0,
    birthDate: new Date()
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private imgCompress: NgxImageCompressService,
    private utilService: UtilService,
    private action$?: Actions
  ){
    action$?.pipe(ofType(UserAction.GetUserToProfileSuccess), takeUntil(this.destroy$)).subscribe((response) => {
      if (response.data !== null && response.data !== undefined) {
        console.log(response.data);
        this.user = response.data;
        this.patchUserData(response.data);
      }

    })
  }

  ngOnInit(): void {
    this.initForm();
    this.userId = Number(localStorage.getItem("id"));
    if(this.userId){
      this.store.dispatch(UserAction.GetUserToProfile({data: this.userId}));
    }
  }

  patchUserData(user: User){
    this.form.controls["email"].patchValue(user.email);
    this.form.controls["firstname"].patchValue(user.firstname);
    this.form.controls["lastname"].patchValue(user.lastname);
    this.form.controls["birthdate"].patchValue(user.birthDate.toString());

    if(user.profile_picture){
      this.safeImg = this.utilService.decodeBase64ImageFileToSecurityTrustResource(user.profile_picture);
    }
  }

  initForm(){
    this.form.addControl('email', new FormControl<string|null>(''));
    this.form.addControl('password', new FormControl<string|null>(''));
    this.form.addControl('repeat_password', new FormControl<string|null>(''));
    this.form.addControl('firstname', new FormControl<string|null>(''));
    this.form.addControl('lastname', new FormControl<string|null>(''));
    this.form.addControl('profilepicture', new FormControl<string|null>(''));
    this.form.addControl('birthdate', new FormControl<Date|null>(new Date()));
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
                        this.safeImg = this.utilService.decodeBase64ImageFileToSecurityTrustResource(result);
                    }
                  ).catch(error => {
                      console.error('Compression Error:', error);
                  });
                };

            });
        }
        
    } 
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
