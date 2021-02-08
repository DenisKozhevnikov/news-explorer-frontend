// const BASE_URL = "http://192.168.88.254:3000";
const BASE_URL = "https://api.denisk.students.nomoreparties.xyz";

export async function onCreateUser(email, password, name) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}

export async function onUserLogin(email, password) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}

export async function getUserInfo(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}

export async function setArticle(
  token,
  keyword,
  title,
  text,
  date,
  source,
  link,
  image
) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ keyword, title, text, date, source, link, image }),
  });
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}

export async function getArticles(token) {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}

export async function deleteArticle(token, itemId) {
  const res = await fetch(`${BASE_URL}/articles/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return res.ok ? json : Promise.reject(json);
}
