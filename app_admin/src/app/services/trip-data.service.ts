import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

    constructor(private http: HttpClient,
        @Inject(BROWSER_STORAGE) private storage: Storage) { }
    private apiBaseUrl = 'http://localhost:3000/api/'; 
    private tripUrl = `${this.apiBaseUrl}trips/`;
    
    getTrips() : Observable<Trip[]> {
        return this.http.get<Trip[]>(this.tripUrl);
    }

    addTrip(formData: Trip) : Observable<Trip> {
        return this.http.post<Trip>(this.tripUrl, formData);
    }

    getTrip(tripCode: string) : Observable<Trip[]> {
        // console.log('Inside TripDataService::getTrips');
        return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
    }

    updateTrip(formData: Trip) : Observable<Trip> {
        // console.log('Inside TripDataService::addTrips');
        return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

    public login(user: User): Promise<AuthResponse> {
        return this.makeAuthApiCall('login', user);
    }

    public register(user: User): Promise<AuthResponse> {
        return this.makeAuthApiCall('register', user);
    }

    public makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
        const url: string = `${this.apiBaseUrl}/${urlPath}`;
        return lastValueFrom(this.http
            .post(url, user))
            .then(response => response as AuthResponse)
            .catch(this.handleError);
    }
}
