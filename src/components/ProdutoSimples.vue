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
          <input type="text" id="edt-nome" placeholder="Nome" v-model="produto.nome">
          <label>Quantidade</label>
          <input type="number" id="edt-qtd" placeholder="QTD" v-model="produto.quantidade">
          <label>Valor</label>
          <input type="text" id="edt-valor" placeholder="Valor" v-model="produto.preco">

          <button id="btn-salvar" class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <button id="btn-novo" @click="novo()" class="waves-effect waves-light btn-small">Novo<i class="material-icons left">add</i></button>
      <button id="btn-cancelar" @click="cancelar()" class="waves-effect waves-light btn-small">Cancelar<i class="material-icons left">cancel</i></button>

      <br/>
      <br/>

      <!-- <div>
        <input type="text" id="edt-pesquisar" placeholder="Pesquisar:" v-model="pesquisar.nome" >
        <button id="btn-pesquisar"  class="waves-effect waves-light btn-small"><i class="material-icons">search</i></button>
      </div> -->

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

import Produto from '@/services/produtos'

export default {

  data(){
    return{
      produto:{
        id: '',
        nome: '',
        quantidade: '',
        preco: ''
      },
      produtos:[],

      pesquisar:{
        nome: '',
        tipo: ''
      },

      erros: []
    }
  },

  mounted(){
    this.btnInicial()
    this.listar()
  },

  methods: {

    btnInicial(){
      document.getElementById("edt-nome").disabled = true;
      document.getElementById("edt-qtd").disabled = true;
      document.getElementById("edt-valor").disabled = true;

      document.getElementById("btn-novo").disabled = false;
      document.getElementById("btn-salvar").disabled = true;
      document.getElementById("btn-cancelar").disabled = true;
    },

    btnAction(){
      document.getElementById("edt-nome").disabled = false;
      document.getElementById("edt-qtd").disabled = false;
      document.getElementById("edt-valor").disabled = false;

      document.getElementById("btn-novo").disabled = true;
      document.getElementById("btn-salvar").disabled = false;
      document.getElementById("btn-cancelar").disabled = false;
    },

    listar(){
      Produto.listar().then(resposta =>{
        // console.log(resposta)
        this.produtos = resposta.data
      })
    },

    cancelar(){
      this.produto = {}
      this.btnInicial()
      this.erros = {}
    },

    novo(){
      this.btnAction()
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
      
      this.btnInicial()

    },

    editar(prod){
      this.produto = prod
      this.btnAction()
    },

    deletar(prod){
      Produto.deletar(prod).then(resposta => {
        this.listar()
        this.produto = {}
        this.btnInicial()
        this.erros = {}
      }).catch(e =>{
        this.erros = e.response.data.erros
      })
    }

  }
}
</script>

<style>
#btn-novo{
  margin: 0px;
  position: relative;
  display: inline-block;
}
#btn-salvar{
  margin: 10px;
  /* position: relative; */
  display: inline-block;
  top: 52px;
  left: 120px;
}
#btn-cancelar{
  margin: 10px;
  /* position: relative; */
  display: inline-block;
  /* top: 4px; */
  left: 155px;
}
#edt-pesquisar{
  width: 420px;
}
</style>