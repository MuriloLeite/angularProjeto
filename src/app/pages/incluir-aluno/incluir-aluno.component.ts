import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incluir-aluno',
  standalone: true,  
  templateUrl: './incluir-aluno.component.html',
  styleUrls: ['./incluir-aluno.component.css'],
  imports: [FormsModule, CommonModule]  
})
export class IncluirAlunoComponent implements OnInit {

  aluno: Aluno = { matricula: '', nome: '', nascimento: '', dataHoraCadastro: new Date() }; 
  message: string = ''; 

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit(): void { }

  
  onSubmit(): void {
    
    this.alunoService.saveAluno(this.aluno).subscribe(
      (response) => {
        this.router.navigate(['/listar']);
      },
      (error) => {
        this.message = 'Erro ao cadastrar aluno: ' + error.message;
      }
    );
  }

  navigateToList(): void {
    this.router.navigate(['/listar']);
  }
}
