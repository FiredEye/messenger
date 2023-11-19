export const setUser = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const getUser = () => {
  const data = localStorage.getItem("userData");
  return data == null ? null : JSON.parse(data);
};
