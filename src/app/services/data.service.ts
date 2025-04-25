import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  private dataUrl = '/api/todos';

  getTodos() {
    return this.http.get<Todo[]>(this.dataUrl).pipe(
      catchError((error) => {
        console.error('Error fetching todos:', error);
        // Handle the error, e.g., return an empty array or rethrow
        return of([]);
      })
    );
  }
}
