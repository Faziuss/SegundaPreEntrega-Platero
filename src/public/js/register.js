const d = document;

const registerForm = d.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    let result = await axios.post("/api/sessions/register", obj);
    console.log(result.data.message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return console.log(error.response.data.message);
    }
    return console.log(error);
  }
});
