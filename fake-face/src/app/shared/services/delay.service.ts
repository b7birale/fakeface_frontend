import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelayService {

  constructor() { }

  // Callback -> régi
  // Promise -> ezt fogjuk használni
  // Observable

  // 3 mp-et késleltet
  delayWithPromise(email: string, password: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      let i = 0;
      const interval = setInterval(() =>{
        i++;
        if(i === 3) {
          clearInterval(interval);
          if (email === 'test@gmail.com' && password === 'testpw'){
            resolve(true);
          } else {
            reject(false);
          }
        }
      }, 1000)
    });
    
  }


}








  // CRUD (Create, Read, Update, Delete)
