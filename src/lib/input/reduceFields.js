const
FIELDS = {
  tags(fields, value) {
    let copy = fields.tags.filter(tag => tag !== value);
    if (!fields.tags.length) copy.push(value);
    if (copy.length === fields.tags.length) copy.push(value);
    return {...fields, tags: copy};
  },
},
reduceFields = (fields, name, input) => !FIELDS[name] ? {...fields, [name]: input} : FIELDS[name](fields, input);
export {reduceFields};
