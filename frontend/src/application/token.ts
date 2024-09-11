export function getSessionTokenFromStorage() {
  return localStorage.getItem("pak_session_token");
}

export function setSessionTokenToStorage(token: string) {
  localStorage.setItem("pak_session_token", token);
}

export function removeSessionTokenFromStorage() {
  localStorage.removeItem("pak_session_token");
}
