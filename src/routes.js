import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Cliente from "./views/Cliente.vue";
import Produtos from "./views/Produtos.vue";
import Fornecedor from "./views/Fornecedor.vue";
import Funcionario from "./views/Funcionario.vue";
import Pedido from "./views/Pedido.vue"

Vue.use(Router);
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Cliente",
    component: Cliente,
  },
  {
    path: "/Produtos",
    component: Produtos
  },
  {
    path: "/Fornecedor",
    component: Fornecedor
  },
  {
    path: "/Funcionario",
    component: Funcionario
  },
  {
    path: "/Pedido",
    component: Pedido
  }
];
export default new Router({
  mode: "history",
  routes
});
