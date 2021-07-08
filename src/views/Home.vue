<template>
  <div>
    <b-card-group class="B-card-Group" deck>
      <b-card
        bg-variant="primary"
        text-variant="white"
        header="Primary"
        class="text-center"
      >
        <b-card-text
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
        >
      </b-card>

      <b-card
        bg-variant="success"
        text-variant="white"
        header="Secondary"
        class="text-center"
      >
        <b-card-text
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
        >
      </b-card>

      <b-card
        bg-variant="danger"
        text-variant="white"
        header="Success"
        class="text-center"
      >
        <b-card-text
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
        >
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>

<style scoped>
.text-center {
  width: 300px !important;
  height: 150px;
  margin: 20px;
}
.B-card-Group {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
