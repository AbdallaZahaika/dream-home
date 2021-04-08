import http from "./http";
import jwtDecode from "jwt-decode";

//// token key
const tokenKey = "token";
const refreshTokenKey = "reftoken";

//// lgoin
export async function login(email, password) {
  const { data } = await http.post(`/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem(refreshTokenKey, data.refreshToken);
  http.refreshRequestToken();
}

/// logut
export function logout() {
  localStorage.setItem("user", null);
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshTokenKey);
  http.refreshRequestToken();
}
//// edit user
export function editUser(data) {
  return http.put(`/users/edit`, data);
}
/// change Password
export function changePassword(data) {
  return http.patch(`/users/changePassword`, data);
}
//// get user information
export function getUserInfo() {
  return http.get(`/users/me`);
}
/// get all user cards has favorited
export function allFavorite(data) {
  return http.get(`/users/favoriteCards/?numbers=${data}`);
}
/// and card to  favorite and remove card from  favorite
export function favorite(data) {
  return http.patch(`/users/favorite`, { cards: [data] });
}
//// check if the token result not null
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
}
/// upload user Avatir
export function uploadimage(image) {
  return http.post(`/uploadImage/save-user-avatir`, image);
}
/// delete user Avatir
export function deleteimage(image) {
  const dataBody = {
    image,
  };
  return http.put(`/uploadImage/delete-user-avatir`, dataBody);
}

export function forgotPasswrod(email) {
  return http.put("/users/forgotPassword", { email });
}
export function resetPassword(resetLink, newPassword) {
  return http.put("/users/reset-password", { resetLink, newPassword });
}

const service = {
  login,
  logout,
  getCurrentUser,
  getUserInfo,
  allFavorite,
  favorite,
  editUser,
  changePassword,
  uploadimage,
  deleteimage,
  forgotPasswrod,
  resetPassword,
};

export default service;
