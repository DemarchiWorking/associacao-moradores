import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

interface UserProfile {
  name: string;
  lastName: string;
  status: 'Online agora' | 'Offline';
  profilePicture: string; // URL da imagem
  coverPhoto: string; // URL da imagem de capa (se fosse uma imagem)
  isAlumn: boolean;
}
interface Produtos {
  id: number;
  title: string;
  steps: number;
  status: 'Iniciar Trilha' | 'Concluído' | 'Em Andamento';
  completion: string;
  lastActivity: string;
}
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ NgClass, NgIf, NgFor ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
userProfile: UserProfile = {
    name: 'Tommy',
    lastName: 'Dmrch',
    status: 'Online agora',
    profilePicture: 'https://via.placeholder.com/150', // Substitua pela URL da sua foto de perfil
    coverPhoto: 'https://via.placeholder.com/1200x400', // URL do banner original, se necessário
    isAlumn: true
  };
  produtos: Produtos[] = [
      { id: 1, title: 'Inteligência Artificial: Clusterização', steps: 9, status: 'Iniciar Trilha', completion: '0% Completo', lastActivity: '19/07/2025 13:36' },
      { id: 2, title: 'Inteligência Artificial: Classificação', steps: 9, status: 'Iniciar Trilha', completion: '0% Completo', lastActivity: '20/07/2025 13:52' },
      { id: 3, title: 'Programação Distribuída com Red...', steps: 9, status: 'Concluído', completion: '100% Completo', lastActivity: '11/02/2025 09:46' },
      { id: 4, title: 'Estruturas de Dados e Algoritmos Avançados', steps: 9, status: 'Em Andamento', completion: '67% Completo', lastActivity: '31/03/2025 00:56' },
      { id: 5, title: 'Projeto de Bloco: Engenharia de...', steps: 10, status: 'Iniciar Trilha', completion: '0% Completo', lastActivity: '0/0 Etapas' },
      { id: 6, title: 'Domain-Driven Design (DDD) e Arquitetura...', steps: 9, status: 'Em Andamento', completion: '23% Completo', lastActivity: '11/08/2024 11:02' },
      { id: 7, title: 'Desenvolvimento de Serviços com Spring...', steps: 9, status: 'Iniciar Trilha', completion: '0% Completo', lastActivity: '01/05/2024 05:53' },
      { id: 8, title: 'Design Patterns e Domain-Driven Desi...', steps: 9, status: 'Em Andamento', completion: '44% Completo', lastActivity: '30/05/2024 12:00' }
    ];
  activeTab: 'perfil' | 'produtos' | 'vendas' = 'perfil';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: 'perfil' | 'produtos' | 'vendas'): void {
    this.activeTab = tab;
  }
}