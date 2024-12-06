import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css'],
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule]
})
export class EditarAlunoComponent {

  aluno: Aluno = { id: 0, matricula: '', nome: '', nascimento: '', dataHoraCadastro: new Date() };
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditarAlunoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private alunoService: AlunoService
  ) { 
    this.loadAluno(data.alunoId);  
  }

  loadAluno(id: number): void {
    this.alunoService.getAllAlunos().subscribe(
      (alunos: Aluno[]) => {
        this.aluno = alunos.find(a => a.id === id) || this.aluno;
      },
      (error) => {
        console.error('Erro ao carregar o aluno');
      }
    );
  }

  onSubmit(): void {
    this.isLoading = true;
    this.alunoService.editAluno(this.aluno).subscribe(
      () => {
        this.dialogRef.close('saved');  
      },
      (error) => {
        console.error('Erro ao editar aluno');
        this.isLoading = false;
      }
    );
  }
}
