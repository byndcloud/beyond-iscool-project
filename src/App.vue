<template>
  <div>
    <!-- Without vuetify -->
    <div class='toolbar'>Toolbar</div>
    Conteúdo
    <div class='bottom-bar'>
      <input type='text'>
      <button>Enviar</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style>
  .toolbar {
    height: 76px;
    width: 100%;
    background-color: #18FFFF;
    display: flex;
    align-items: center;
    padding-left: 8px;
  }
  .bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 76px;
    width: 100%;
    background-color: #29B6F6;
    display: flex;
    align-items: center;
    padding-left: 8px;
  }
  .bottom-bar button, input {
    background-color: #E0E0E0 !important;
    margin: 4px;
    padding: 4px;
    border-radius: 4px;
  }
</style>