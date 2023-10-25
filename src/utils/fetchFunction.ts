export const fetchFunction = async (
  url: string,
  method: "GET" | "POST",
  opts: { body?: { login: string; password: string }; auth?: string },
) => {
  let response;

  if (method === "GET") {
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${opts.auth}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        response = data;
      })
      .catch((e) => {
        console.error(e);
      });
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(opts.body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      response = data;
    })
    .catch((e) => {
      console.error(e);
    });
  return response;
};
