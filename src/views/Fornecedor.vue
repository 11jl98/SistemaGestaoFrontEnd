<template>
  <div class="costumer">
    <h2>Cadastro</h2>
    <b-form class="formTab">
      <div class="content">
        <b-input
          class="form-control"
          type="text"
          placeholder="Razão Social"
          v-model="Fornecedor.razaoSocial"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Nome Fantasia"
          v-model="Fornecedor.nomeFantasia"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Endereço"
          v-model="Fornecedor.logradouro"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Número"
          v-model="Fornecedor.numero"
        ></b-input>
      </div>
      <div class="content">
        <b-input
          class="form-control"
          type="text"
          placeholder="Complemento"
          v-model="Fornecedor.complemento"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Bairro"
          v-model="Fornecedor.bairro"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="CEP"
          v-model="Fornecedor.cep"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Cidade"
          v-model="Fornecedor.cidade"
        ></b-input>
      </div>
      <div class="content">
        <b-input
          class="form-control"
          type="text"
          placeholder="UF"
          v-model="Fornecedor.uf"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Celular"
          v-model="Fornecedor.celular"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="Telefone"
          v-model="Fornecedor.telefone"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="E-mail"
          v-model="Fornecedor.email"
        ></b-input>
      </div>
      <div class="content">
        <b-input
          class="form-control"
          type="text"
          placeholder="CNPJ"
          v-model="Fornecedor.cnpjCpf"
        ></b-input>
        <b-input
          class="form-control"
          type="text"
          placeholder="IE"
          v-model="Fornecedor.ie"
        ></b-input>
        <b-button
          class="btn btn-success"
          type="submit"
          style="margin-top: 10px"
          id="btnSalvar"
          @click="saveFornecedor"
          >Salvar</b-button
        >
        <b-button
          class="btn btn-secondary"
          style="margin-top: 10px"
          id="btnNovo"
          @click="limpar()"
          >Novo</b-button
        >
      </div>
    </b-form>
    <div class="linha"></div>
    <h2>Pesquisa</h2>
    <div class="tb-costumer col-md-6">
      <div class="pesquisa">
        <b-input
          class="form-control"
          type="text"
          v-model="pesquisa.text"
          @keyup.enter.prevent="pesFilter"
        ></b-input>
        <b-select
          class="form-control"
          id="selectColuna"
          placeholder="Tipo pesquisa"
          v-model="pesquisa.coluna"
        >
          <option value="razaoSocial">Razão Social</option>
          <option value="cnpjCpf">Cpf/Cnpj</option>
          <option value="cidade">Cidade</option>
          <option value="email">E-mail</option>
          <option value="telefone">Telefone</option>
        </b-select>
      </div>
      <table class="table table-dark" id="TableCliente">
        <thead>
          <tr>
            <th scope="col-md">Nome</th>
            <th scope="col-md">Cpf/Cnpj</th>
            <th scope="col-md">Cidade</th>
            <th scope="col-md">Editar</th>
            <th scope="col-md">Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fornecedor in data" :key="fornecedor.uuid">
            <td>{{ fornecedor.razaoSocial }}</td>
            <td>{{ fornecedor.cnpjCpf }}</td>
            <td>{{ fornecedor.cidade }}</td>
            <td>
              <b-button @click="filterUuid(fornecedor.uuid)" variant="primary"
                >Editar</b-button
              >
            </td>
            <td>
              <b-button
                @click="deleteFornecedor(fornecedor.uuid)"
                class="btn btn-danger"
                >Excluir</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../utils/axios";

export default {
  name: "Cliente",
  data() {
    return {
      data: [],
      Fornecedor: {
        razaoSocial: "",
        nomeFantasia: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cep: "",
        cidade: "",
        uf: "",
        telefone: "",
        celular: "",
        cnpjCpf: "",
        ie: "",
        email: "",
        uuid: "",
      },
      pesquisa: {
        coluna: "",
        text: "",
      },
    };
  },
  methods: {
    async saveFornecedor() {
      try {
        console.log("Fornecedorrrr", this.Fornecedor);
        const result = await axios.post("/Fornecedor", this.Fornecedor);
        console.log("result", result);
      } catch (error) {
        console.log("erro", error);
      }
    },
    async pesFilter() {
      try {
        console.log("pesquisa", this.pesquisa);
        const result = await axios.get(
          `/Fornecedor/Search/${this.pesquisa.coluna}/${this.pesquisa.text}`
        );
        this.data = result.data.data;
        console.log("Fornecedor", this.data);
        this.Fornecedor = result;
        this.pesquisa = { coluna: "", text: "" };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async filterUuid(uuid) {
      try {
        console.log("uuid", uuid);
        const result = await axios.get(`/Fornecedor/${uuid}`);
        console.log(result.data);
        this.Fornecedor = result.data.fornecedor;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteFornecedor(uuid) {
      try {
        console.log("UUUIDDDDDD", uuid);
        const result = await axios.delete(`/Fornecedor/${uuid}`);
        console.log("delete", result);
      } catch (error) {
        return error;
      }
    },
    limpar() {
      this.Fornecedor = {
        razaoSocial: "",
        nomeFantasia: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cep: "",
        cidade: "",
        uf: "",
        telefone: "",
        celular: "",
        cnpjCpf: "",
        ie: "",
        email: "",
        uuid: "",
      };
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 10px;
  width: 300px;
}
.formTab {
  display: inline-block;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
}
.btn {
  margin-left: 10px;
}
.pesquisa {
  display: flex;
  justify-content: center;
}
.costumer {
  justify-content: center;
  text-align: center;
}
.tb-costumer {
  width: 100% !important;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.linha {
  width: 100%;
  height: 3px;
  background-color: rgb(129, 129, 129);
  margin: 20px 0 20px 0;
}
</style>
