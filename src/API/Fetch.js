let api = process.env.REACT_APP_URL;
const authorization = process.env.REACT_APP_HEADER;
const token = localStorage.getItem("token");

export const fetchLogin = async (email, password) => {
  const response = await fetch(
    `${api}/login?email=${email}&password=${password}`,
    {
      method: "POST",
      headers: {
        authorization: `${authorization}`,
        "content-type": "application/json",
      },
    }
  );
  const result = await response.json();

  return { result };
}; //Login

export const fetchRegister = async (email, username, password) => {
  const response = await fetch(
    `${api}/register?email=${email}&username=${username}&password=${password}`,
    {
      method: "POST",
      headers: {
        authorization: `${authorization}`,
        "content-type": "application/json",
      },
    }
  );
  const result = await response.json();

  return { result };
};

export const fetchUser = async () => {
  const response = await fetch(`${api}/getUser`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });

  const result = await response.json();

  return { result };
};

export const fetchViewPokemon = async (name) => {
  const response = await fetch(`${api}/viewPokemon?pokemonName=${name}`, {
    method: "GET",
    headers: {
      authorization: `${authorization}`,
      "content-type": "application/json",
    },
  });

  const results = await response.json();
  const result = results.data;

  return { result };
};

export const fetchPokemon = async ({ pageParam = 1 }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let keyword = params.get("keyword") || "";

  if (keyword !== "") {
    const response = await fetch(
      `${api}/pokemon?page=${pageParam}&size=24&keyword=${keyword}`,
      {
        method: "GET",
        headers: {
          authorization: `${authorization}`,
          "content-type": "application/json",
        },
      }
    );
    const results = await response.json();
    const result = results.data.data;

    return { result, nextPage: pageParam + 1, totalPages: results.data.pages };
  }

  const response = await fetch(`${api}/pokemon?page=${pageParam}&size=24`, {
    method: "GET",
    headers: {
      authorization: `${authorization}`,
      "content-type": "application/json",
    },
  });

  const results = await response.json();
  const result = results.data.data;

  return { result, nextPage: pageParam + 1, totalPages: results.data.pages };
};

export const fetchItem = async ({ pageParam = 1 }) => {
  const response = await fetch(`${api}/listItems?page=${pageParam}$size=20`, {
    method: "GET",
    headers: {
      authorization: `${authorization}`,
      "content-type": "application/json",
    },
  });

  const results = await response.json();
  const result = results.data.data;

  return { result, nextPage: pageParam + 1, totalPages: results.data.pages };
};

export const getFavPokemon = async () => {
  const response = await fetch(`${api}/getFavPokemon`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const results = await response.json();
  const result = results.data.list;

  return { result };
};

export const addFavPokemon = async (id) => {
  const response = await fetch(`${api}/addFavPokemon?pokeId=${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  const results = await response.json();
  return { results };
};

export const listFavPokemon = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `${api}/listFavPokemon?page=${pageParam}&size=24`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }
  );
  const results = await response.json();
  const result = results.data.data;

  return { result, nextPage: pageParam + 1, totalPages: results.data.pages };
};
