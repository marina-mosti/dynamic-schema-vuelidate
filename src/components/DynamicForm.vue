<template>
    <div>
        <component
            v-for="(field, key) in schema"
            :key="key"
            :name="key"
            :is="field.component"
            v-bind="{...field}"
            :value="value[key]"
            @input="update(key, $event)"
            :hasError="$v.form[key].$error"
            :error="errorMessages[key]"
        >
        </component>
    </div>
</template>

<script>
import { validationRules } from '@/parsers/ValidationParser'

export default {
  props: {
    schema: { type: Object, required: true },
    value: { type: Object, required: true }
  },
  data () {
    return {
      form: {}
    }
  },
  computed: {
    errorMessages () {
      const validations = this.$v.form

      return Object.keys(this.schema).reduce((messages, key) => {
        const rules = this.schema[key].validations
        const rulesKeys = Object.keys(this.schema[key].validations)
        const validator = validations[key]

        if (!validator) return messages

        for (const rule of rulesKeys) {
          if (validator[rule] !== false) continue

          messages[key] = rules[rule].message
          return messages
        }

        return messages
      }, {})
    }
  },
  methods: {
    update (key, value) {
      this.form[key] = value
      this.$v.form[key].$touch()

      this.$emit('input', {
        ...this.value,
        [key]: value
      })
    },
    validate () {
      this.$v.$touch()
      this.announceStatus()
    },
    announceStatus () {
      this.$emit('status', {
        invalid: this.$v.$invalid
      })
    }
  },
  validations () {
    return { form: validationRules(this.schema) }
  },
  created () {
    for (const name in this.schema) {
      this.$set(this.form, name, null)
    }
  }
}
</script>
