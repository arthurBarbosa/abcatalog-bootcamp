export const CLIENT_ID = 'abcatalog';
export const CLIENT_SECRET = 'abcatalog123';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number
  scope: string;
  serFirstName: string
  userId: number;
}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);

  return parsedSessionData as LoginResponse;
}