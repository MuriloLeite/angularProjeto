import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl = 'http://localhost:8080/api/aluno';

  constructor(private http: HttpClient) { }

  getAllAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAlunoById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  saveAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  editAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(this.apiUrl, aluno);
  }

  deleteAluno(id: number): Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.apiUrl}/${id}`);
  }

  getAlunoCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
}
