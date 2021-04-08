import http from "./http";

/// create Card
export function createCard(card) {
  return http.post(`/cards`, card);
}
/// get all user cards
export function getAllMyCards(page = 0) {
  return http.get(`/cards/allmyCards/?page=${page}`);
}
//// get card by id
export function getCard(id) {
  return http.get(`/cards/${id}`);
}
/// delete card
export function deleteCard(id) {
  return http.delete(`/cards/${id}`);
}
/// update Card
export function updateCard(id, card) {
  return http.put(`/cards/${id}`, card);
}
/// search By Card Number
export function searchByNumber(cardNumber) {
  return http.get(`/cards/search-by-number/?q=${cardNumber}`);
}
/// change user info cards
export function updateUserCardInfo(userInfo) {
  return http.put(`/cards/change-user-info`, userInfo);
}
/// search And get all cards
// when the search empty the result return all cards
// when the search not empty return the result of the search
export function search(searchValue = "", page = 0, statusHousesFromComponent) {
  let statusHouses = "";
  let {
    status,
    PropertyType,
    searchInput,
    city,
    rooms,
    minPrice,
    maxPrice,
    bedRooms,
  } = searchValue;
  if (!searchValue) {
    statusHouses = statusHousesFromComponent;
  } else {
    statusHouses = status;
  }

  let quiry = `/cards/search/?
    page=${page}
    ${statusHouses ? "&status=" + statusHouses : ""}
    ${PropertyType ? "&propertyType=" + PropertyType : ""}
    ${city ? "&city=" + city : ""}
    ${rooms ? "&rooms=" + rooms : ""}
    ${bedRooms ? "&bedRooms=" + bedRooms : ""}
    ${minPrice ? "&minPrice=" + minPrice : ""}
    ${maxPrice ? "&maxPrice=" + maxPrice : ""}
    `;

  return http.get(
    `${quiry.replace(/\s+/g, "")}${searchInput ? "&q=" + searchInput : ""}`
  );
}
/// get the lest 3 new rent cards
export function getNewRentCards() {
  return http.get(`/cards/new-rent-cards`);
}
/// get the lest 3 new sale cards
export function getNewSaleCards() {
  return http.get(`/cards/new-sale-cards`);
}
/// count Of my cards
export function countMYcards() {
  return http.get(`/cards/count/mycards`);
}
//// upload card images
export function uploadimages(images) {
  return http.post(`/uploadImage/save-card-images`, images);
}

//// delete card images
export function removeImagesFromServer(cardNumber, images) {
  const dataBody = {
    cardNumber,
    images,
  };
  return http.put(`/uploadImage/delete-cards-images`, dataBody);
}

const service = {
  createCard,
  getAllMyCards,
  getCard,
  deleteCard,
  updateCard,
  search,
  searchByNumber,
  getNewRentCards,
  getNewSaleCards,
  countMYcards,
  updateUserCardInfo,
  uploadimages,
  removeImagesFromServer,
};

export default service;
