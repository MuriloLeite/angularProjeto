import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  
import { MatButtonModule } from '@angular/material/button';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { ExcluirAlunoComponent } from '../excluir-aluno/excluir-aluno.component'; 
import { EditarAlunoComponent } from '../editar-aluno/editar-aluno.component'; 
import {VisualizarAlunoComponent} from '../visualizar-aluno/visualizar-aluno.component';
@Component({
  selector: 'app-listar-alunos',
  standalone: true,
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule]  
})
export class ListarAlunosComponent implements OnInit {

  alunos: Aluno[] = []; 
  displayedColumns: string[] = ['id', 'matricula', 'nome', 'nascimento', 'idade', 'dataHoraCadastro', 'actions'];
  isLoading: boolean = true;  
  errorMessage: string = '';

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    public dialog: MatDialog  
  ) { }

  ngOnInit(): void {
    this.loadAlunos();  
  }

  calculateIdade(nascimento: string): number {
    const today = new Date();
    const birthDate = new Date(nascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  loadAlunos(): void {
    this.alunoService.getAllAlunos().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;  
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar a lista de alunos';
        this.isLoading = false;
      }
    );
  }

  navigateToAddAluno(): void {
    this.router.navigate(['/incluir']); 
  }

  editAluno(id: number): void {
    const dialogRef = this.dialog.open(EditarAlunoComponent, {
      width: '400px',  
      data: { alunoId: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadAlunos(); 
      }
    });
  }

  deleteAluno(id: number): void {
    const dialogRef = this.dialog.open(ExcluirAlunoComponent, {
      width: '300px',
      data: { alunoId: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        this.loadAlunos();  
      }
    });
  }
  openVisualizarAlunoModal(id: number): void {
    const dialogRef = this.dialog.open(VisualizarAlunoComponent, {
      width: '400px',
      data: { alunoId: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
