const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  AllUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  getUserDetails: {
    url: `${backendDomain}/api/get-user-details`,
    method: "post",
  },
  AllEmergencies: {
    url: `${backendDomain}/api/all-emergencies`,
    method: "get",
  },
  getMedicalProfile: {
    url: `${backendDomain}/api/medprofile`,
    method: "get",
  },
  getMessUsers: {
    url: `${backendDomain}/api/message-users`,
    method: "get",
  },
  UserMessages: {
    url: `${backendDomain}/api/messages`,
    method: "get",
  },
  UserEmergency: {
    url: `${backendDomain}/api/user-emerg`,
    method: "get",
  },
  AllMedics: {
    url: `${backendDomain}/api/all-medics`,
    method: "get",
  },
   SendMessage: {
    url: `${backendDomain}/api/sendMessage`,
    method: "post",
  },
};

export default SummaryApi;
