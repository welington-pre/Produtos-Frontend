import { http } from "./config";

export default{

    listar:() => {
        return http.get('produto')
    },

    salvar:(produto) => {
        return http.post('produto', produto)
    },

    atualizar:(produto) => {
        return http.put('produto/'.concat(produto.id), produto)
    },

    deletar:(produto) => {
        return http.delete('produto/'.concat(produto.id))
    }

}