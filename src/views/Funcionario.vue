<template>
  <div class="costumer">
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Cadastro de Funcionário" active>
            <b-card-text>
              <b-form class="formTab">
                <div class="content">
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Nome"
                    v-model="Funcionario.nome"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Cpf/Cnpj"
                    v-model="Funcionario.cpf"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="R.G"
                    v-model="Funcionario.rg"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Email"
                    v-model="Funcionario.email"
                  ></b-input>
                </div>
                <div class="content">
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Logradouro"
                    v-model="Funcionario.logradouro"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Número"
                    v-model="Funcionario.numero"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Bairro"
                    v-model="Funcionario.bairro"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Cidade"
                    v-model="Funcionario.cidade"
                  ></b-input>
                </div>
                <div class="content">
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="UF"
                    v-model="Funcionario.uf"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="CEP"
                    v-model="Funcionario.cep"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="telefone"
                    v-model="Funcionario.telefone"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Celular"
                    v-model="Funcionario.celular"
                  ></b-input>
                </div>
                <div class="content">
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Salario"
                    v-model="Funcionario.salario"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="date"
                    placeholder="Data Adimissao"
                    v-model="Funcionario.dataAdmissao"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Comissão"
                    v-model="Funcionario.comissao"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="number"
                    placeholder="dia Pagamento"
                    v-model="Funcionario.diaPagamento"
                  ></b-input>
                </div>
                <div class="content">
                  <b-textarea
                    class="form-control"
                    type="text"
                    placeholder="Observção"
                    v-model="Funcionario.observacao"
                  ></b-textarea>
                </div>
                <div class="content">
                  <b-button
                    class="btn btn-success"
                    type="submit"
                    style="margin-top: 10px"
                    id="btnSalvar"
                    @click="saveCustomer"
                    >Salvar</b-button
                  >
                  <b-button
                    class="btn btn-secondary"
                    style="margin-top: 10px"
                    id="btnNovo"
                    @click="limpar"
                    >Novo</b-button
                  >
                </div>
              </b-form>
            </b-card-text>
          </b-tab>
          <b-tab title="Pesquisa">
            <b-card-text>
              <div class="tb-costumer col-md-6">
                <div class="pesquisa">
                  <b-input
                    class="form-control"
                    type="text"
                    v-model="pesquisa.text"
                    @keydown.enter.prevent="pesFilter"
                  ></b-input>
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    placeholder="Tipo pesquisa"
                    v-model="pesquisa.coluna"
                  >
                    <option value="nome">Nome</option>
                    <option value="cpfCnpj">Cpf/Cnpj</option>
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
                    <tr v-for="cliente in data" :key="cliente.uuid">
                      <td>{{ cliente.nome }}</td>
                      <td>{{ cliente.cpfCnpj }}</td>
                      <td>{{ cliente.cidade }}</td>
                      <td>
                        <b-button
                          variant="primary"
                          @click="filterUuid(cliente.uuid)"
                          >Editar</b-button
                        >
                      </td>
                      <td>
                        <b-button
                          class="btn btn-danger"
                          @click="deleteCostumer(cliente.uuid)"
                          >Excluir</b-button
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
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
      Funcionario: {
        uuid: "",
        nome: "",
        cpf: "",
        rg: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        telefone: "",
        celular: "",
        email: "",
        observacao: "",
        salario: "",
        dataAdmissao: "",
        comissao: "",
        diaPagamento: "",
        dataDemissao: "",
      },
      pesquisa: {
        coluna: "",
        text: "",
      },
    };
  },
  methods: {
    async saveCustomer() {
      try {
        this.data = this.Funcionario;
        console.log("dataaaaa", this.data);
        if (this.data.uuid === "" || this.data.uuid === null) {
          await axios.post("/funcionario", this.data);
          console.log("resultado", this.data);
          alert("funcionario cadastrado com sucesso!");
          return this.data;
        } else if (this.data.uuid !== "" || this.data.uuid !== null) {
          console.log("chegou aquiiiiii", this.data.uuid);
          const result = await axios.put(
            `/funcionario/${this.data.uuid}`,
            this.data
          );
          console.log("resultado", result);
          alert("Cliente atualizado com sucesso!");
          this.limpar();
        }
      } catch (error) {
        return error;
      }
    },
    async pesFilter() {
      try {
        console.log("pesquisa", this.pesquisa);
        const result = await axios.get(
          `/funcionario/Search/${this.pesquisa.coluna}/${this.pesquisa.text}`
        );
        this.data = result.data.data;
        console.log("funcionario", this.data);
        this.Funcionario = result;
        this.pesquisa = { coluna: "", text: "" };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async filterUuid(uuid) {
      try {
        console.log("uuid", uuid);
        const result = await axios.get(`/funcionario/${uuid}`);
        console.log(result.data.cliente);
        this.Funcionario = result.data.cliente;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteCostumer(uuid) {
      try {
        console.log("UUUIDDDDDD", uuid);
        const result = await axios.delete(`/funcionario/${uuid}`);
        console.log("delete", result);
      } catch (error) {
        return error;
      }
    },
    limpar() {
      this.Funcionario = {
        uuid: "",
        nome: "",
        cpf: "",
        rg: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        telefone: "",
        celular: "",
        email: "",
        observacao: "",
        salario: "",
        dataAdmissao: "",
        comissao: "",
        diaPagamento: "",
        dataDemissao: "",
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
