<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <!-- {{produto.nome}}
      {{produto.quantidade}}
      {{produto.preco}} -->

      <ul>
        <li v-for="(erro, index) of erros" :key="index">
          campo <b>{{ erro }}</b>
        </li>
      </ul>

      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="produto.nome">
          <label>Quantidade</label>
          <input type="number" placeholder="QTD" v-model="produto.quantidade">
          <label>Valor</label>
          <input type="text" placeholder="Valor" v-model="produto.preco">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <br/>
      <br/>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto of produtos" :key="produto.id">

            <td>{{ produto.nome }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.preco }}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="deletar(produto)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

import Produto from './services/produtos'

export default {

  data(){
    return{
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

      produto:{
        id: '',
        nome: '',
        quantidade: '',
        preco: ''
      },
      produtos:[],

      erros: []
    }
  },

  mounted(){
    this.listar()
  },

  methods: {

    listar(){
      Produto.listar().then(resposta =>{
        // console.log(resposta)
        this.produtos = resposta.data
      })
    },
    
    salvar(){
      // console.log(this.produto)
      if (this.produto.id === "") {
        Produto.salvar(this.produto).then(resposta =>{
          //  console.log(resposta)
          this.produto = {}
          this.produto.id = ''
          this.listar()
          this.erros = {}
          alert('salvo com sucesso')
        }).catch(e => {
          // console.log(e.response.data.erros)
          this.erros = e.response.data.erros
        })  
      }else{
        Produto.atualizar(this.produto).then(resposta =>{
          //  console.log(resposta)
          this.produto = {}
          this.listar()
          this.erros = {}
          alert('Atualizado com sucesso')
        }).catch(e => {
          // console.log(e.response.data.erros)
          this.erros = e.response.data.erros
        })  
      }
      
    },

    editar(prod){
      this.produto = prod
    },

    deletar(prod){
      Produto.deletar(prod).then(resposta => {
        this.listar()
        this.erros = {}
      }).catch(e =>{
        this.erros = e.response.data.erros
      })
    }

  }
}
</script>

<style>

</style>