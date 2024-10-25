import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = `${environment.API_URL}`;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user/${id}`);
    }

    addUser(user: NewUser): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/user`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/user`, user);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.apiUrl}/user/${id}`);
    }
}
