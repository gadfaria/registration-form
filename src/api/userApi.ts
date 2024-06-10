
async function create(params: any) {
  const user = await fetch(`/registration`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const userJson = await user.json();

  return userJson;
}

export const userApi = {
  create,
};
