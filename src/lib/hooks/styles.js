export
const
useStyle = (style, parameters, reducer) => {
  const states = reducer(parameters);
  return (filters, localStyle = "") => {
    let classes = style[localStyle] || localStyle;

    filters.forEach(filter => {
      if (states[filter]) classes = classes.concat(" ", style[filter]);
    });
    return classes.trim();
  };
},
// this function is to be used in cases where a tag is passed
// inline styles
useInlineStyle = (parameters, reducer) => {
  const states = reducer(parameters);
  return (filters, localStyle = {}) => {
    let tmp = {}, flag = false;
    filters.forEach(filter => {
      if (states[filter]) {
        flag = true;
        tmp = {...localStyle, ...localStyle[filter]};
      }
    });
    return flag ? tmp : localStyle;
  };
};
