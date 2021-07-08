<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/Login">GESTÃO DE EMPRESAS</b-nav-item>
        <b-nav-item href="/">Home</b-nav-item>

        <b-nav-item-dropdown text="Cadastros" right>
          <b-dropdown-item href="/Cliente">Cliente</b-dropdown-item>
          <b-dropdown-item href="/Produtos">Produto</b-dropdown-item>
          <b-dropdown-item href="/Funcionario">Funcionario</b-dropdown-item>
          <b-dropdown-item href="/Fornecedor">Fornecedor</b-dropdown-item>
          <b-dropdown-item href="Estoque">Estoque</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="/pedido">Pedido</b-nav-item>
        <b-nav-item href="#">NF-e/NFC-e</b-nav-item>
        <b-nav-item href="#">Caixa</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
