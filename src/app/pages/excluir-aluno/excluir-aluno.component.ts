import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoService } from '../../services/aluno.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-aluno',
  templateUrl: './excluir-aluno.component.html',
  styleUrls: ['./excluir-aluno.component.css'],
  imports: [MatDialogModule]  
})
export class ExcluirAlunoComponent {

  alunoId: number;

  constructor(
    public dialogRef: MatDialogRef<ExcluirAlunoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alunoId: number },
    private alunoService: AlunoService
  ) {
    this.alunoId = data.alunoId;
  }

  onDelete(): void {
    this.alunoService.deleteAluno(this.alunoId).subscribe(
      () => {
        this.dialogRef.close('deleted');
      },
      (error) => {
        console.error('Erro ao excluir aluno', error);
        this.dialogRef.close();
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
