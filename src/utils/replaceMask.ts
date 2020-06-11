const replaceMask = (content: string, values: any): string => {
  Object.keys(values).map(key => {
    content = content.split(`[[${key}]]`).join(values[key]);
  });
  return content;
};

export default replaceMask;
