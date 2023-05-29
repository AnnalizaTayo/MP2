import { google } from 'googleapis';
import credentials from '../../credentials.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const authorizeClient = () => {
  return new Promise((resolve, reject) => {
    const { client_email, private_key } = credentials;
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email,
        private_key,
      },
      scopes: SCOPES,
    });

    auth
      .getClient()
      .then((client) => resolve(client))
      .catch(reject);
  });
};

export const initializeGoogleSheets = () => {
  return new Promise((resolve, reject) => {
    google.auth
      .getClient({
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
        scopes: SCOPES,
      })
      .then((client) => {
        google.sheets({ version: 'v4', auth: client });
        resolve();
      })
      .catch(reject);
  });
};
