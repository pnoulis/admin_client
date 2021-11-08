const
FIELDS = {
  tags(fields, value) {
    let copy = fields.tags.filter(tag => tag !== value);
    if (!fields.tags.length) copy.push(value);
    if (copy.length === fields.tags.length) copy.push(value);
    return {...fields, tags: copy};
  },
  img(fields, value) {
    return {
      ...fields,
      oldImg: !fields.oldImg ? fields.img : fields.oldImg,
      img: value,
    };
  },
  stock(fields, value) {
    return {
      ...fields,
      tp: parseInt(value) * parseInt(fields.ppu) || 0,
      stock: value,
      inStock: parseInt(value) > 0 ? true : false,
      _vstock: (typeof fields._vstock === "number") ? fields._vstock :  parseInt(fields.vstock),
      vstock: (typeof fields._vstock === "number") ? fields._vstock + parseInt(value) || 0 : parseInt(fields.vstock) + parseInt(value) || 0,
    };
  },
  ppu(fields, value) {
    return {
      ...fields,
      ppu: value,
      tp: parseInt(value) * parseInt(fields.stock) || 0,
    };
  },
},
reduceFields = (fields, name, input) => !FIELDS[name] ? {...fields, [name]: input} : FIELDS[name](fields, input);
export {reduceFields};
