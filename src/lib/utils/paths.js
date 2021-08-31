const myPath = {
  extractName(string) {
    const isPath = string.lastIndexOf('/');
    return string.slice((isPath >= 0) ? isPath + 1 : 0 , string.lastIndexOf('.'));
  },
  extractExt(string) {
    return string.slice(string.lastIndexOf('.'), string.length);
  },
  extractNameExt(string) {
    const isPath = string.lastIndexOf('/');
    return string.slice((isPath >= 0) ? isPath + 1 : 0, string.length);
  }
};

export default myPath;
