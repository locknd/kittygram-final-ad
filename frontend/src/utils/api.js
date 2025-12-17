import { API_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
};

const headersWithContentType = { "Content-Type": "application/json" };

const authHeaders = () => ({
  "Content-Type": "application/json",
  authorization: `Token ${localStorage.getItem("auth_token")}`,
});

export const registerUser = (username, password) => {
  return fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ username, password }),
  }).then(checkResponse);
};

export const loginUser = (username, password) => {
  return fetch(`${API_URL}/token/login/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ username, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.auth_token) {
        localStorage.setItem("auth_token", data.auth_token);
        return data;
      }
      return null;
    });
};

export const logoutUser = () => {
  return fetch(`${API_URL}/token/logout/`, {
    method: "POST",
    headers: authHeaders(),
  }).then((res) => {
    if (res.status === 204) {
      localStorage.removeItem("auth_token");
      return res;
    }
    return null;
  });
};

export const getUser = () => {
  return fetch(`${API_URL}/users/me/`, {
    method: "GET",
    headers: authHeaders(),
  }).then(checkResponse);
};

export const getCards = (page = 1) => {
  return fetch(`${API_URL}/cats/?page=${page}`, {
    method: "GET",
    headers: authHeaders(),
  }).then(checkResponse);
};

export const getCard = (id) => {
  return fetch(`${API_URL}/cats/${id}/`, {
    method: "GET",
    headers: authHeaders(),
  }).then(checkResponse);
};

export const getAchievements = () => {
  return fetch(`${API_URL}/achievements/`, {
    method: "GET",
    headers: authHeaders(),
  }).then(checkResponse);
};

export const sendCard = (card) => {
  return fetch(`${API_URL}/cats/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(card),
  }).then(checkResponse);
};

export const updateCard = (card, id) => {
  return fetch(`${API_URL}/cats/${id}/`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(card),
  }).then(checkResponse);
};

export const deleteCard = (id) => {
  return fetch(`${API_URL}/cats/${id}/`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then((res) => {
    if (res.status === 204) return { status: true };
    return { status: false };
  });
};
