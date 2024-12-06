import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirAlunoComponent } from './incluir-aluno.component';

describe('IncluirAlunoComponent', () => {
  let component: IncluirAlunoComponent;
  let fixture: ComponentFixture<IncluirAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncluirAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncluirAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
