<template>
  <div id="app">
      <form @submit.prevent="submitForm">
        <DynamicForm
          :schema="schema"
          v-model="form"
          @status="saveStatus"
          ref="dynamicForm"
        />

        <pre>{{ form }}</pre>
        <button type="submit">SEND!</button>
      </form>
  </div>
</template>

<script>
import schema from './data/schema.json'
import DynamicForm from './components/DynamicForm'

export default {
  name: 'app',
  components: { DynamicForm },
  data () {
    return {
      schema,
      form: {},
      status: null
    }
  },
  methods: {
    submitForm () {
      this.$refs.dynamicForm.validate()
      if (this.status.invalid) {
        return
      }

      alert('Form submitted')
    },
    saveStatus (status) {
      this.status = status
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

pre {
  text-align: left;
}

input {
  height: 30px;
  font-size: 20px;
}

form {
  margin: 0 auto;
  max-width: 500px
}
</style>
