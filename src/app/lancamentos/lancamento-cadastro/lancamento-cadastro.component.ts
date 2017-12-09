import { ToastyService } from 'ng2-toasty';
import { LancamentosService } from './../lancamentos.service';
import { Lancamento } from './../../core/models';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { CategoriaModel } from './../../categorias/categoria.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router/";



@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [];



  pt_BR: any;

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private toasty: ToastyService,
    private service: LancamentosService,
    private router: Router
  ) { }
  ngOnInit() {
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    };
    this.buscarCategorias();
    this.buscarPessoas();
    const id = this.route.snapshot.params['id'];
    if (id) {
      console.log(id);
      this.carregarLancamento(id);
    }
  }

  buscarCategorias() {
    this.categoriaService
      .getAll()
      .then(categorias => {
        this.categorias = categorias.map(c => { return { label: c.nome, value: c.codigo } });
      })
      .catch(this.errorHandler.handleError);
  }

  buscarPessoas() {
    this.pessoasService
      .getAll()
      .then(pessoas => {
        console.log(pessoas);
        this.pessoas = pessoas.map(p => { return { label: p.nome, value: p.codigo } });
      })
      .catch(this.errorHandler.handleError);
  }

  carregarLancamento(id: number) {
    this.service.getLancamento(id)
      .then(lancamento => this.lancamento = lancamento)
      .catch(this.errorHandler.handleError);
  }

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.service.adicionar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(this.errorHandler.handleError);
  }

  atualizarLancamento(form: FormControl) {
    this.service.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.toasty.success('Lançamento alterado com sucesso!');
      })
      .catch(this.errorHandler.handleError);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }
}
