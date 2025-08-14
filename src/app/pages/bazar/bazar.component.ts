
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight , faSearch } from '@fortawesome/free-solid-svg-icons';
import { CarrinhoServiceService } from '../../services/carrinho-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/autenticacao/auth.service';
import { Router } from '@angular/router';

export interface Produto {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  data_criacao: string;
}

export interface Categoria {
  nome: string;
}
@Component({
  selector: 'app-bazar',
  standalone: true,
  imports: [ NgFor, NgClass, NgIf, FontAwesomeModule, CommonModule],
  templateUrl: './bazar.component.html',
  styleUrl: './bazar.component.scss'
})
export class BazarComponent {
  @ViewChild('productList') productList: ElementRef | undefined;
  query: string = '';
  results: string[] = [];
  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  @ViewChild('search-input', { static: false }) searchInput!: ElementRef;
  searchText: string = '';

  categorias: any = [
    { id: 0, nome: 'Todos' , icone: '../../../assets/icones/icone-todos.png'},
    { id: 1, nome: 'Roupa', icone: '../../../assets/icones/icone-camiseta.png' },//  croche 
    { id: 2, nome: 'Brinquedo', icone: '../../../assets/icones/icone-brinquedo.png' },
    { id: 3, nome: 'Decoração', icone: '../../../assets/icones/icone-decoracao.png'},
    { id: 4, nome: 'Artesanato', icone: '../../../assets/icones/icone-artesanato.png' },
    { id: 5, nome:  'Quadro', icone: '../../../assets/icones/icone-quadro.png' },
    { id: 6, nome: 'Croche', icone: '../../../assets/icones/icone-croche.png'  },
   ];
  private apiUrl = 'http://localhost:8081/api'; // Defina sua URL da API

  produtos: any[] = [] /* [
    { nome: 'Caneca Personalizada', foto: 'https://http2.mlstatic.com/D_NQ_NP_743292-MLU70464443042_072023-O.webp', valor: 13.20, descricao: 'Uma caneca simples e personalizada', categoria: 0 },
    { nome: 'Camiseta Flor', foto: 'https://bonecanopano.com.br/wp-content/uploads/2020/06/babylook-pink-flor-margarida-no-boneca-no-pano-scaled.jpg', valor: 26.00, descricao: 'Uma camiseta moderna e confortável', categoria: 1 },
    { nome: 'Brinquedo Educativo', valor: 45.90, descricao: 'Um brinquedo que ensina e diverte', categoria: 2 },
    { nome: 'Almofada Decorada', valor: 18.50, descricao: 'Uma almofada decorativa para sua casa', categoria: 3 },
    { nome: 'Escultura Artesanal', valor: 80.00, descricao: 'Uma escultura feita à mão', categoria: 4 },
    { nome: 'Quadro Artístico', valor: 55.20, descricao: 'Um quadro para embelezar sua parede', categoria: 5 },
    { nome: 'Toalha de Croche', valor: 62.00, descricao: 'Uma toalha de croche feita à mão', categoria: 6 },
  ];*/

  selectedCategoryId: number | null = null;

  carrinho: any[] = [];

  products = Array.from({ length: 20 }, (_, index) => ({
    icon: 'path/to/icon.png', // Replace with the actual path to your icons
    description: `Product Category ${index + 1}`
  }));

  constructor(private carrinhoService: CarrinhoServiceService,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              
  ) {
  }
  ngOnInit(): void {
    this.carregarCarrinho();
    this.carregarProdutos();
    this.authService.getTokenLocalStorage()
    this.getCategoriasDosProdutos().subscribe(categorias => {
      this.categorias = categorias;
      console.log('Categorias carregadas:', this.categorias);
    }, error => {
      console.error('Erro ao carregar categorias:', error);
    });
  }

  getCategoriasDosProdutos(): Observable<Categoria[]> {
    const token = this.authService.getTokenLocalStorage();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`, { headers: headers });
    } else {
    
      return new Observable(observer => {
        observer.error('Nenhum token de autenticação encontrado.');
        observer.complete();
      });
    }
  }

  carregarProdutos(): void {
    const token = this.authService.getTokenLocalStorage();
    console.log('Token de autenticação:', token);

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<Produto[]>(`${this.apiUrl}/produtos`, { headers: headers })
        .subscribe({
          next: (data) => {
            this.produtos = data;
            console.log('Produtos carregados:', this.produtos);
          },
          error: (error) => {
            console.error('Erro ao carregar produtos:', error);
          }
        });
    } else {
      console.error('Nenhum token de autenticação encontrado. O usuário precisa fazer login.');
      this.router.navigate(['/login']);
    }
  }
  
  selectCategory(id: number) {
    this.selectedCategoryId = id;
    const inputElement = document.getElementById('search-input') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    this.searchText = ''; // Reseta a variável de busca
    if (this.searchInput) {
      this.searchInput.nativeElement.value = ''; // Limpa o texto escrito no input
    }
    return this.produtos.filter((product: { nome: string, categoria: number }) => {
      const matchesCategory = this.selectedCategoryId === 0 || this.selectedCategoryId === null || product.categoria === this.selectedCategoryId;
      const matchesSearchText = this.searchText === '' || product.nome.toLowerCase().includes(this.searchText);
      return matchesCategory && matchesSearchText;
    });
  }
  carregarCarrinho(): void {
    const carrinhoSalvo = sessionStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  }
  salvarCarrinho(): void {
    sessionStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }
  adicionarAoCarrinho(produto: any): void {
    this.carrinhoService.adicionarAoCarrinho(produto);
    this.carrinho = this.carrinhoService.obterCarrinho();
  }

  removerDoCarrinho(produtoId: number): void {
    this.carrinhoService.removerDoCarrinho(produtoId);
    this.carrinho = this.carrinhoService.obterCarrinho();
  }

  atualizarQuantidade(produtoId: number, quantidade: number): void {
    this.carrinhoService.atualizarQuantidade(produtoId, quantidade);
    this.carrinho = this.carrinhoService.obterCarrinho();
  }

  getFilteredProducts(): any[] {
    return this.produtos.filter(product => {
      const matchesCategory = this.selectedCategoryId === 0 || this.selectedCategoryId === null || product.categoria === this.selectedCategoryId;
      const matchesSearchText = this.searchText === '' || product.nome.toLowerCase().includes(this.searchText);
      return matchesCategory && matchesSearchText;
    });
  }
  onSearch(): void {
    const query = this.query.toLowerCase();
    if (query) {
      this.results = this.items.filter(item => item.toLowerCase().includes(query));
    } else {
      this.results = [];
    }
  }
  onSearchs(event: any) {
    this.searchText = event.target.value.toLowerCase();
  }
  scrollRight() {
    this.productList?.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  scrollLeft() {
    this.productList?.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }
}

