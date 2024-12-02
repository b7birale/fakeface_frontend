import { Injectable, NgZone } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilService } from '../services/util/util.service';
import { JwtDecodeModel } from '../models/token/jwt.model';
import { TOAST_STATE, ToastService } from '../toast/toast.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private ngZone: NgZone,
    private utilService: UtilService,
    private toastService: ToastService,
    private router: Router
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') as string;
    let options = {};
    if (token !== null && token!==undefined && token.length > 0) {
      let decodedToken = this.utilService.decodeToken(token) as JwtDecodeModel;
      let expDate =  this.utilService.decodeTokenExpired(decodedToken.exp);
      if (expDate > new Date()) {
        options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          })
        }
      } else {
        localStorage.clear();
        this.router.navigate(['/'])
      }
    }
    else {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: ''
        })
      }
    }

    const authReq = req.clone(options);
    console.log("itt vagyok");
    return next.handle(authReq).pipe(
      catchError((event: HttpErrorResponse) => {
        if (event instanceof HttpErrorResponse) {
          switch (event.status) {
            case 400:
              this.toastService.showToast(TOAST_STATE.warning, event.error);
              break;
            case 403:
              this.toastService.showToast(TOAST_STATE.warning, event.error.messageKey);
              break;
            case 412:
              this.toastService.showToast(TOAST_STATE.warning, event.error.messageKey);
              break;
            case 401:
              this.toastService.showToast(TOAST_STATE.warning, "Kérjük ellenőrizd, hogy be vagy-e jelentkezve.");
              localStorage.clear();
              this.ngZone.run(() => {
                this.router.navigate(['/']);
              });
              break;
            case 409:
              this.toastService.showToast(TOAST_STATE.warning, event.error.errorMessage);
              break;
            default:
              this.toastService.showToast(TOAST_STATE.warning, "Ismeretlen hiba lépett fel a művelet során.");
              break;
          }
          return throwError(event);
        }
        return throwError(event);
      },)
      
    );
  }
}