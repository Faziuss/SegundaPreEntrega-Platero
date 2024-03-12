const d = document;

const loginForm = d.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(loginForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    let result = await axios.post("/api/sessions/login", obj);
    if (result.status === 201) {
      window.location.replace('/products');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return console.log(error.message);
    }
    return console.log(error);
  }
});
