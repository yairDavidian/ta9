import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  private dataUrl = '/api/todos';

  async getTodos() {
    return this.http.get<Todo[]>(this.dataUrl);
  }
}
