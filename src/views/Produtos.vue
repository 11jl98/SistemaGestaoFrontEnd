<template>
  <div class="costumer">
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Cadastro de Produtos" active>
            <b-card-text>
              <b-form class="formTab">
                <div class="content">
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="cod. Barras"
                    v-model="Produtos.codBarras"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="nome Produto"
                    v-model="Produtos.nomeProduto"
                  ></b-input>
                </div>
                <div class="content">
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    aria-placeholder="Fornecedor"
                    value="null"
                    v-model="Produtos.idFornecedor"
                  >
                    <option v-for="forn in fornecedor" :key="forn.uuid">
                      {{ forn.razaoSocial }}
                    </option>
                  </b-select>
                  <b-input
                    class="form-control"
                    type="text"
                    placeholder="Valor"
                    v-model="Produtos.valor"
                  ></b-input>
                </div>
                <div class="content">
                  <b-input
                    class="form-control"
                    type="number"
                    placeholder="estoque Mínimo"
                    v-model="Produtos.estoqueMin"
                  ></b-input>
                  <b-input
                    class="form-control"
                    type="number"
                    placeholder="Estoque"
                    disabled
                    v-model="Produtos.estoque"
                  ></b-input>
                </div>
                <div class="content">
                  <b-button
                    class="btn btn-success"
                    type="submit"
                    style="margin-top: 10px"
                    id="btnSalvar"
                    @click="saveProd"
                    >Salvar</b-button
                  >
                  <b-button
                    class="btn btn-secondary"
                    style="margin-top: 10px"
                    id="btnNovo"
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
                    @keyup.enter.prevent="buscaFillter"
                  ></b-input>
                  <b-select
                    class="form-control"
                    id="selectColuna"
                    placeholder="Tipo pesquisa"
                    v-model="pesquisa.coluna"
                  >
                    <option value="nomeProduto">Nome</option>
                    <option value="codBarras">Cod. Barra</option>
                    <option value="valor">Valor</option>
                  </b-select>
                </div>
                <table class="table table-dark" id="TableCliente">
                  <thead>
                    <tr>
                      <th scope="col-md">Nome</th>
                      <th scope="col-md">Valor</th>
                      <th scope="col-md">Estoque</th>
                      <th scope="col-md">Editar</th>
                      <th scope="col-md">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="produto in data" :key="produto.uuid">
                      <td>{{ produto.nomeProduto }}</td>
                      <td>{{ produto.valor }}</td>
                      <td>{{ produto.estoque }}</td>
                      <td>
                        <b-button
                          @click="buscaId(produto.uuid)"
                          variant="primary"
                          >Editar</b-button
                        >
                      </td>
                      <td>
                        <b-button @click="del(produto.uuid)" variant="danger"
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
      Produtos: {
        uuid: "",
        codBarras: "",
        nomeProduto: "",
        valor: "",
        estoqueMin: "",
        idFornecedor: "",
        estoque: "",
      },
      pesquisa: {
        coluna: "",
        text: "",
      },
      fornecedor: [],
    };
  },
  methods: {
    async saveProd() {
      try {
        this.data = this.Produtos;
        console.log("dataaaaa", this.data);
        if (this.data.uuid === "" || this.data.uuid === null) {
          await axios.post("/produto", this.data);
          console.log("resultado", this.data);
          alert("produto cadastrado com sucesso!");
          return this.data;
        } else if (this.data.uuid !== "" || this.data.uuid !== null) {
          console.log("chegou aquiiiiii", this.data.uuid);
          const result = await axios.put(
            `/produto/${this.data.uuid}`,
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
    async preencheFornecedor() {
      try {
        const result = await axios.get("/produto");
        console.log("result", result.data.fornecedor);
        this.fornecedor = result.data.fornecedor;
        console.log("fron", this.fornecedor);
      } catch (error) {
        return error;
      }
    },
    async buscaId(uuid) {
      try {
        const result = await axios.get(`/produto/${uuid}`);
        console.log("resultado", result.data.produto);
        this.Produtos = result.data.produto;
      } catch (error) {
        return error;
      }
    },
    async buscaFillter() {
      try {
        console.log("pesquisa", this.pesquisa);
        const result = await axios.get(
          `/produto/Search/${this.pesquisa.coluna}/${this.pesquisa.text}`
        );
        console.log("RESULTADO", result);
        this.data = result.data.data;
        console.log("produtos", this.data);
        this.produtos = result;
        this.pesquisa = { coluna: "", text: "" };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async del(uuid) {
      try {
        await axios.delete(`/produto/${uuid}`);
        return alert("Produto excluido");
      } catch (error) {
        alert("Não foi possivel excluir");
        return error;
      }
    },
  },
  created() {
    this.preencheFornecedor();
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
