<template>
  <div class="costumer">
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Pedido" active>
            <b-card-text>
              <b-form class="formTab">
                <div class="content">
                  <b-input
                    class="form-control"
                    type="date"
                    placeholder="Nome"
                    v-model="pedido.dataPedido"
                  ></b-input>
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    v-model="pedido.idCliente"
                  >
                    <option
                      v-for="cliente in clientes"
                      :key="cliente.uuid"
                      :value="cliente.uuid"
                    >
                      {{ cliente.nome }}
                    </option>
                  </b-select>
                </div>
                <div class="content">
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    v-model="pedido.idFuncionario"
                  >
                    <option
                      v-for="funcionario in funcionarios"
                      :key="funcionario.uuid"
                      :value="funcionario.uuid"
                    >
                      {{ funcionario.nome }}
                    </option>
                  </b-select>
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    placeholder="Tipo pesquisa"
                    v-model="pedido.idStatusPedido"
                  >
                    <option
                      v-for="sts in status"
                      :key="sts.uuid"
                      :value="sts.uuid"
                    >
                      {{ sts.nomeStatus }}
                    </option>
                  </b-select>
                </div>
                <div class="content">
                  <b-textarea
                    class="form-control"
                    type="text"
                    placeholder="Observção"
                    v-model="pedido.observacao"
                  ></b-textarea>
                </div>
                <div class="content">
                  <b-button
                    class="btn btn-success"
                    type="submit"
                    style="margin-top: 10px"
                    id="btnSalvar"
                    @click.prevent="saveCustomer"
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
          <b-tab title="Produto" active>
            <b-card-text>
              <div class="tb-costumer col-md-6">
                <div class="content">
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    placeholder="Tipo pesquisa"
                    v-model="produtosPedido.idProduto"
                  >
                    <option
                      v-for="produto in produtosComboBox"
                      :key="produto.uuid"
                      :value="produto.uuid"
                    >
                      {{ produto.nomeProduto }}
                    </option>
                  </b-select>
                  <b-input
                    class="form-control"
                    type="number"
                    v-model="produtosPedido.quantidade"
                    placeholder="Quantidade"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="number"
                    v-model="produtosPedido.valor"
                    placeholder="Valor"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="number"
                    v-model="produtosPedido.desconto"
                    placeholder="Desconto"
                  ></b-input>
                </div>
                <div class="content">
                  <b-textarea
                    placeholder="Observação"
                    v-model="produtosPedido.observacao"
                  />
                  <b-button
                    @click.prevent="adicionarProd"
                    variant="primary"
                    style="height: 50px; margin: 10px"
                    >Adicionar</b-button
                  >
                </div>
                <table class="table table-dark" id="TableCliente">
                  <thead>
                    <tr>
                      <th scope="col-md">Nome</th>
                      <th scope="col-md">Quantidade</th>
                      <th scope="col-md">Valor Total</th>
                      <th scope="col-md">Editar</th>
                      <th scope="col-md">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="produtosPed in prodPed" :key="produtosPed.uuid">
                      <td>{{ produtosPed.nome }}</td>
                      <td>{{ produtosPed.cpfCnpj }}</td>
                      <td>{{ produtosPed.cidade }}</td>
                      <td>
                        <b-button
                          variant="primary"
                          @click="filterUuid(produtosPed.uuid)"
                          >Editar</b-button
                        >
                      </td>
                      <td>
                        <b-button
                          class="btn btn-danger"
                          @click="deleteCostumer(produtosPed.uuid)"
                          >Excluir</b-button
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
      pedido: {
        uuid: "",
        idCliente: "",
        dataPedido: "",
        idStatusPedido: "",
        idFuncionario: "",
        observacao: "",
      },
      pesquisa: {
        coluna: "",
        text: "",
      },
      produtosComboBox: [],
      funcionarios: [],
      status: [],
      clientes: [],
      produtosPedido: {
        uuid: "",
        idProduto: "",
        quantidade: "",
        valor: "",
        desconto: "",
        observacao: "",
        idPedido: "",
      },
      prodPed: [],
      produtos: []
    };
  },
  methods: {
    async saveCustomer() {
      try {
        this.data = this.pedido;
        console.log("dataaaaa", this.data);
        if (this.data.uuid === "" || this.data.uuid === null) {
          const result = await axios.post("/Pedido", this.data);
          this.produtosPedido.idPedido = result.data.id;
        } else if (this.data.uuid !== "" || this.data.uuid !== null) {
          console.log("chegou aquiiiiii", this.data.uuid);
          const result = await axios.put(
            `/Pedido/${this.data.uuid}`,
            this.data
          );
          console.log("resultado", result);
          alert("Cliente atualizado com sucesso!");
          this.limpar();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async pesFilter() {
      try {
        console.log("pesquisa", this.pesquisa);
        const result = await axios.get(
          `/pedido/Search/${this.pesquisa.coluna}/${this.pesquisa.text}`
        );
        this.data = result.data.data;
        console.log("pedido", this.data);
        this.pedido = result;
        this.pesquisa = { coluna: "", text: "" };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async filterUuid(uuid) {
      try {
        console.log("uuid", uuid);
        const result = await axios.get(`/pedido/${uuid}`);
        console.log(result.data.cliente);
        this.pedido = result.data.cliente;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteCostumer(uuid) {
      try {
        console.log("UUUIDDDDDD", uuid);
        const result = await axios.delete(`/pedido/${uuid}`);
        console.log("delete", result);
      } catch (error) {
        return error;
      }
    },
    limpar() {
      this.pedido = {
        uuid: "",
        idCliente: "",
        dataPedido: "",
        idStatusPedido: "",
        idFuncionario: "",
        observacao: "",
      };
    },
    async preencherComboBox() {
      try {
        const result = await axios.get("/Pedido");
        console.log("result", result.data);
        this.clientes = result.data.cliente;
        this.funcionarios = result.data.funcionario;
        this.produtosComboBox = result.data.produto;
        this.status = result.data.status;
      } catch (error) {
        return error;
      }
    },
    async adicionarProd() {
      try {
        this.prodPed = this.produtosPedido;
        if (this.prodPed.idPedido !== "") {
          console.log("produtos", this.prodPed);
          await axios.post("/Produto/Pedido", this.prodPed);
          console.log("this.prodPed.idProduto", this.prodPed.idProduto);
          const produto = this.returnProd(this.prodPed.idProduto);
          console.log("produto", produto);
        } else {
          alert("É necessario salvar o pedido antes");
        }
      } catch (error) {
        return error;
      }
    },
    async returnProd(uuid) {
      const result = await axios.get(`/Produto/${uuid}`);
      return result;
    },
  },
  created() {
    this.preencherComboBox();
    console.log(this.pedido);
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
</style>
