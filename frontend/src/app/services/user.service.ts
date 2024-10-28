import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewUser, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = `${environment.API_URL}`;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http
            .get<{ data: User[] }>(`${this.apiUrl}/users`)
            .pipe(map((response) => response.data));
    }

    getUser(id: string): Observable<User> {
        return this.http
            .get<{ data: User }>(`${this.apiUrl}/users/${id}`)
            .pipe(map((response) => response.data));
    }

    addUser(user: NewUser): Observable<User> {
        return this.http
            .post<{ data: User }>(`${this.apiUrl}/users`, user)
            .pipe(map((response) => response.data));
    }

    updateUser(user: User): Observable<User> {
        return this.http
            .put<{ data: User }>(`${this.apiUrl}/users/${user.id}`, user)
            .pipe(map((response) => response.data));
    }

    deleteUser(id: string): Observable<User> {
        return this.http
            .delete<{ data: User }>(`${this.apiUrl}/users/${id}`)
            .pipe(map((response) => response.data));
    }
}
