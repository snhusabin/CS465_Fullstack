import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BROWSER_STORAGE } from "../storage";
import { AuthResponse } from '../models/authresponse';
import { Trip } from '../models/trip';
import { User } from '../models/user';

@Injectable()
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.httpClient
      .get<Trip[]>(`${this.apiBaseUrl}/trips`)
      .pipe(catchError(this.handleError));
  }

  public getTrip(tripCode: string): Observable<Trip> {
    console.log(`Inside TripDataService#getTrip('${tripCode}')`);
    return this.httpClient
      .get<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`)
      .pipe(catchError(this.handleError));
  }

  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.httpClient
      .post<Trip>(`${this.apiBaseUrl}/trips`, formData)
      .pipe(catchError(this.handleError));
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    console.log(`Inside TripDataService#updateTrip('${formData.code}')`);
    return this.httpClient
      .put<Trip>(`${this.apiBaseUrl}/trips/${formData.code}`, formData)
      .pipe(catchError(this.handleError));
  }

  public deleteTrip(tripCode: string): Observable<any> {
    console.log(`Inside TripDataService#deleteTrip('${tripCode}')`);
    return this.httpClient
      .delete(`${this.apiBaseUrl}/trips/${tripCode}`)
      .pipe(catchError(this.handleError));
  }

  public login(user: User): Observable<AuthResponse> {
    console.log('Inside TripDataService#login');
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    console.log('Inside TripDataService#register');
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    console.log(`Inside TripDataService#makeAuthApiCall('${urlPath}')`);
    return this.httpClient
      .post<AuthResponse>(`${this.apiBaseUrl}/${urlPath}`, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Something has gone wrong', error);
    return throwError(() => error.message || error);
  }
}
