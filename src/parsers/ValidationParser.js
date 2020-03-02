import * as Validators from 'vuelidate/lib/validators'

export const validationRules = schema => {
  return Object.keys(schema).reduce((rules, elementName) => {
    const item = schema[elementName]
    if (!('validations' in item)) return rules

    const validations = {}
    for (const rule in item.validations) {
      const params = item.validations[rule].params
      // validations[rule] = validationFn(rule, params)

      if (params) {
        validations[rule] = Validators[rule](params)
      } else {
        validations[rule] = Validators[rule]
      }
    }

    rules[elementName] = validations
    return rules
  }, {})

  /* const rules = {}
  for (let name in schema) {
    const item = schema[name]
    if (!item.hasOwnProperty('validations')) return

    const validations = {}
    for (let rule in item.validations) {
      const params = item.validations[rule]
      // validations[rule] = validationFn(rule, params)
      if (params) {
        validations[rule] = Validators[rule](params)
      } else {
        validations[rule] = Validators[rule]
      }
    }

    rules[name] = validations
  }

  return rules */
}

/* const validationFn = (name, params) => {
  switch (name) {
    case 'required':
    case 'email':
      return Validators[name]

    case 'minLength':
      return Validators.minLength(params)
  }
} */
