import api from "../api/axios";
 
export const loginCandidate = (email, password) =>
  api.post("/CandidateLogin", {
    sEmail: email,
    sPassword: password,
  });

export const loginAdmin = (email, password) =>
  api.post("/log", {
    Email: email,
    Password: password,
  });

export const registerCandidate = (payload) =>
  api.post("/CandidateRegister", payload);

export const registerAdmin = (payload) =>
<<<<<<< HEAD
  api.post("/OrganizationRegister", payload);
=======
  api.post("/reg", payload);
>>>>>>> 2dcc0e4623f99cc21c3e604154fd563570b3fa28
