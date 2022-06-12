import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Application } from "../models/application.model";

@Injectable({providedIn: 'root'})
export class ApiService {

    constructor(private _client: HttpClient) {
        
    }

    login(username: string, password: string) {
        return this._client.post('api/token/', {username, password});
    }

    logout(refreshToken: string) {
        return this._client.post('api/logout/', {'refresh': refreshToken});
    }

    register(request: any) {
        return this._client.post('api/register/', request);
    }

    getApps(): Observable<Application[]> {
        return this._client.get('/api/applications/').pipe(
            map((response) => (response as any[]).map((data) => new Application(data)))
        )
    }

    getAppById(id: number): Observable<Application> {
        return this._client.get(`api/applications/${id}/`).pipe(
            map((response) => new Application(response))
        );
    }

    createApp(request: any): Observable<Application> {
        return this._client.post('/api/applications/', {
            name: request.name,
            description: request.description,
            image_src: request.imgSource,
            is_game: request.isGame,
            author_id: request.authorId,
        }).pipe(map((result) => new Application(result)));
    }

    deleteApp(id: number): Observable<any> {
        return this._client.delete(`/api/applications/${id}/`);

    }
}