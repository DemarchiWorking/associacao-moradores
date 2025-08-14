import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa o serviço Router

@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.scss'
})
export class EntrarComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Injeta o serviço Router no construtor
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      const { email, senha } = this.loginForm.value;
      const loginPayload = { email, senha };

      this.http.post('http://localhost:8081/api/autenticacao/login', loginPayload)
        .subscribe({
          next: (response) => {
            console.log('Login bem-sucedido!', response);
            // Redireciona o usuário para a rota 'home'
            this.router.navigate(['/bazar']);
          },
          error: (error) => {
            console.error('Erro no login:', error);
            this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
          }
        });
    } else {
      this.errorMessage = 'Por favor, preencha o formulário corretamente.';
    }
  }

}