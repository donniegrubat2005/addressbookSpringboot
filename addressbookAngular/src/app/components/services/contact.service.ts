import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHelperService } from './http-helper.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private httpHelperService: HttpHelperService
  ) {}

  public getContacts(): Observable<any[]> {
    let url = this.httpHelperService.getApiUrl() + '/api/contacts';
    return this.http.get<any[]>(url);
  }

  getContact(id: number): Observable<any[]> {
    let url = this.httpHelperService.getApiUrl() + '/api/contacts';
    return this.http.get<any[]>(url + '/' + id);
  }

  public save(contact: any) {
    let url = this.httpHelperService.getApiUrl() + '/api/contacts';
    return this.http.post<any>(url, contact);
  }

  update(contact: any): Observable<any> {
    let url = this.httpHelperService.getApiUrl() + '/api/contacts';
    return this.http.put<any>(url + '/' + contact.id, contact);
  }

  delete(id: number): Observable<any> {
    let url = this.httpHelperService.getApiUrl() + '/api/contacts';
    return this.http.delete<any>(url + '/' + id);
  }
}
