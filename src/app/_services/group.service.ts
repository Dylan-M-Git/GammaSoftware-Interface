import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.httpClient.get("http://localhost:8000/groups");
  }

  getGroupById(id: number): Observable<any> {
    return this.httpClient.get("http://localhost:8000/group/" + id);    
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete("http://localhost:8000/group/" + id);    
  }
}
