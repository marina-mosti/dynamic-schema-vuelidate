<template>
  <div class="input">
    <label :for="name">{{ label }}</label>
    <select
      :class="{
        'error': hasError,
        'green': !!value && !hasError
      }"
      :aria-describedby="`${name}-error`"
      :name="name"
      :id="name"
      @change="$emit('input', $event.target.value)"
    >
      <option value></option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :selected="opt.value === value"
      >{{opt.label}}</option>
    </select>
    <p :id="`${name}-error`" class="error" v-if="hasError && error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator (opts) {
        return (
          opts.find(opt => {
            return !('label' in opt) || !('value' in opt)
          }) === undefined
        )
      }
    },
    hasError: { type: Boolean, default: false },
    error: { type: String, required: false }
  },
  data () {
    return {
      val: null
    }
  }
}
</script>

<style scoped>
select {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

select.error {
  border-color: #721c24;
}

select.green {
  border-color: green;
  border-width: 2px;
}
</style>
