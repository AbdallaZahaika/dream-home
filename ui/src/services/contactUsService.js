import http from "./http";
function sendEmail(dataBody) {
  return http.post("/contactUs", dataBody);
}
export default sendEmail;
