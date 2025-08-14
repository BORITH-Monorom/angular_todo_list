import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';

import { map, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = '5a04494ebd76dd6';
  const apiSecret = '40f072808b3eb57';
  req.headers.set('Content-Type', 'application/json');
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `token ${apiKey}:${apiSecret}`),
  });
  return next(authReq);
};

export interface Todo {
  data:string;
  name: string;
  title: string;
  description: string;
  status: string;
  is_completed: boolean;
  priority: string;
  order_by: number;
}

export interface TodoResponse{
  data: Todo[]
}

@Component({
  selector: 'app-root',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private http: HttpClient) { }
  todoResource = rxResource({
    stream: () => 
      this.http.get<TodoResponse>(`http://172.21.83.66:8000/api/resource/task/?fields=["*"]`).pipe(
      tap(res => console.log(res.data,"res")),
      map(item => item.data)
    )
  })
}