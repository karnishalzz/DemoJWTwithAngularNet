import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Cookie } from 'ng2-cookies';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {
    // this.currentUserDetails = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    if (Cookie.check('.JWT.Cookie')) //if(sessionStorage.getItem('.BA.ETraining.Public'))
      this.currentUserDetails = new BehaviorSubject<any>(JSON.parse(Cookie.get('.Brac.LMS.Trainee.Cookie')));
    // this.currentUserDetails = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('.BA.ETraining.Public')));

    this.userLoggedIn.next(false);
  }

  public get currentUserValue(): any {
    return Cookie.check('.JWT.Cookie') ? this.currentUserDetails.value : null;
    // return sessionStorage.getItem('.BA.ETraining.Public') ? this.currentUserDetails.value : null;
  }

  public isAuthenticated(): boolean {
    return Cookie.check('.JWT.Cookie');
    // return sessionStorage.getItem('.BA.ETraining.Public') !== null;
  }

  login(param) {

    // var data = "username=" + param.UserName + "&password=" + param.Password;
    // var body = "grant_type=password&username=" + param.UserName +
    //   "&password=" + param.Password;
    // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    var data = "username=" + param.UserName + "&password=" + encodeURIComponent(param.Password)  + "&usertype=Trainee&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post<any>(environment.baseUrl + '/LoginUser', data, { headers: reqHeader })
      .pipe(map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        let expireDate = new Date(data[".expires"]);
        const user = {
          //Id: data.Id,
          Email: data.Email,
          // FirstName: data.FirstName,
          // LastName: data.LastName,
          // Position: data.Position,
          UserName: data.UserName,
          FullName: data.FullName,
          Token: data.Token,
          //ImagePath: data.ImagePath,
          //UserType: data.UserType,
          //Gender: data.Gender,
          //access_token: data.access_token,
          //FullName: data.FirstName + (data.LastName ? ' ' + data.LastName : ''),
          //ExpiredDate: expireDate
        }
        // sessionStorage.setItem('.BA.ETraining.Public', JSON.stringify(user));
        Cookie.set('.JWT.Cookie', JSON.stringify(user), expireDate, '/', window.location.hostname, false);
        // localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserDetails.next(user);
        this.userLoggedIn.next(true);
        return true;
      }),
        catchError(err => {
          console.log(err);
          return of(null);
        }));
  }

  logout(hostname) {
    Cookie.delete('.JWT.Cookie', '/', hostname);
    // sessionStorage.removeItem('.BA.ETraining.Public');
    this.currentUserDetails.next(null);
    this.userLoggedIn.next(false);
  }

  sessionout(hostname) {
    Cookie.delete('.JWT.Cookie', '/', hostname);
    // sessionStorage.removeItem('.BA.ETraining.Public');
    this.currentUserDetails.next(null);
    this.userLoggedIn.next(false);
  }

  registerSystemAdmin(url, params) {
    return this.http.post<any>(environment.apiUrl + url, params).pipe(
      map(res => {
        return res;
      })
    );
  }
  

  updateImage(imagePath) {
    let currentUser = this.currentUserDetails.value;
    currentUser.ImagePath = imagePath;
    Cookie.set('.JWT.Cookie', JSON.stringify(currentUser), new Date(currentUser.ExpiredDate), '/', window.location.hostname, false);
    // sessionStorage.setItem('.Brac.LMS.Trainee.Cookie', JSON.stringify(currentUser));
    this.currentUserDetails.next(currentUser);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

}
