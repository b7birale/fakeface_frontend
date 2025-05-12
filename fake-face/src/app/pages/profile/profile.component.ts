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
import { UpdateUser } from '../../shared/models/user/user-update.model';

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
  old_user: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    userId: 0,
    birthDate: new Date(),
  }
  new_user: UpdateUser = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    userId: 0,
    birthDate: undefined
  }

  update_user: UpdateUser = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    userId: 0,
    birthDate: undefined
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
        this.old_user = structuredClone(response.data);
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

    if(user.profilePicture){
      this.safeImg = this.utilService.decodeBase64ImageFileToSecurityTrustResource(user.profilePicture);
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

  updateClick(){
    let update = this.compareUsers();
    console.log(update)
    if(update === true){
      this.store.dispatch(UserAction.ModifyUserData({
        data: this.update_user
      }))
    }
  }

  compareUsers(){
    this.update_user = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      userId: 0,
      birthDate: undefined
    };

    let change: boolean = false;

    this.new_user.firstname = this.form.controls["firstname"].value;
    this.new_user.lastname = this.form.controls["lastname"].value;
    this.new_user.password = this.form.controls["password"].value;
    this.new_user.birthDate = this.form.controls["birthdate"].value;

    if(this.compressedImage && this.compressedImage.length > 0){
      this.update_user.profilePicture = this.compressedImage;
      change = true;
    }
    console.log(this.compressedImage)

    if(this.new_user.firstname !== this.old_user.firstname){
      this.update_user.firstname = this.new_user.firstname;
      change = true;
    }

    if(this.new_user.lastname !== this.old_user.lastname){
      this.update_user.lastname = this.new_user.lastname;
      change = true;
    }

    if(this.new_user.password && this.new_user.password.length > 0){
      this.update_user.password = this.new_user.password;
      change = true;
    }

    if(this.new_user.birthDate && this.new_user.birthDate !== undefined && this.new_user.birthDate !== this.old_user.birthDate){
      this.update_user.birthDate = this.new_user.birthDate;
      change = true;
    }

    this.update_user.userId = this.old_user.userId;

    console.log(this.update_user);

    return change;

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
