import loginMethodV1 from "./auth/loginMethodV1.js";
import getRecentPaksMethodV1 from "./paks/getRecentPaksMethodV1.js";
import getRecentUsersMethodV1 from "./users/getRecentUsersMethodV1.js";
import getMeMethodV1 from "./auth/getMeMethodV1.js";
import createPakMethodV1 from "./paks/createPakMethodV1.js";
import getUserPaksMethodV1 from "./paks/getUserPaksMethodV1.js";
import findPakByNameMethodV1 from "./paks/findPakByNameMethodV1.js";

export default {
  v1: {
    login: loginMethodV1,
    getMe: getMeMethodV1,
    getRecentUsers: getRecentUsersMethodV1,
    getRecentPaks: getRecentPaksMethodV1,
    getUserPaks: getUserPaksMethodV1,
    createPak: createPakMethodV1,
    findPakByName: findPakByNameMethodV1,
  },
};
