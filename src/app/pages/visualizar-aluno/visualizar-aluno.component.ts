import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar-aluno',
  templateUrl: './visualizar-aluno.component.html',
  styleUrls: ['./visualizar-aluno.component.css'],
  imports: [MatProgressSpinnerModule, CommonModule, MatDialogModule]
})
export class VisualizarAlunoComponent implements OnInit {

  aluno: Aluno | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private alunoService: AlunoService,
    @Inject(MAT_DIALOG_DATA) public data: { alunoId: number },  
    private dialogRef: MatDialogRef<VisualizarAlunoComponent>  
  ) { }

  ngOnInit(): void {
    this.loadAluno();
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

  loadAluno(): void {
    this.alunoService.getAlunoById(this.data.alunoId).subscribe(
      (aluno: Aluno) => {
        this.aluno = aluno;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erro ao carregar os dados do aluno';
        this.isLoading = false;
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
