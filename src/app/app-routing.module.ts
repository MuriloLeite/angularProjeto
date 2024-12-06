import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListarAlunosComponent } from './pages/listar-alunos/listar-alunos.component';
import { IncluirAlunoComponent } from './pages/incluir-aluno/incluir-aluno.component';
import { EditarAlunoComponent } from './pages/editar-aluno/editar-aluno.component';
import { VisualizarAlunoComponent } from './pages/visualizar-aluno/visualizar-aluno.component';
import { ExcluirAlunoComponent } from './pages/excluir-aluno/excluir-aluno.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listar', component: ListarAlunosComponent },
  { path: 'incluir', component: IncluirAlunoComponent },
  { path: 'editar/:id', component: EditarAlunoComponent },
  { path: 'visualizar/:id', component: VisualizarAlunoComponent },
  { path: 'excluir/:id', component: ExcluirAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
