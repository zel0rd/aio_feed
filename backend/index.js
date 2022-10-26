const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const express = require('express')

const app = express()
const port = 3000

app.use(express.static('public'))

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1S09NG5cYDXZwJgLTlbd8y9AlgTiW-DfvWK0nqkdnp-o/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1S09NG5cYDXZwJgLTlbd8y9AlgTiW-DfvWK0nqkdnp-o',
        range: 'sheet1',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    
    return rows
}


async function append (spreadsheetId, range, valueInputOption, resource) {
  const authClient = await authorize();

  const sheets = google.sheets({ version: 'v4', authClient });
  const request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: spreadsheetId,  // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values are appended after the last row of the table.
    range: range,  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: valueInputOption,  // TODO: Update placeholder value.
    resource: resource,
    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.
    auth: authClient,
  };

  try {
    const response = (await sheets.spreadsheets.values.append(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}


app.get('/', async (req, res) => {
    const name = 'test'
    const content = 'aaaa'
    const value = {
        "majorDimension": "ROWS",
        "values": [
          [name, content],
        ]
      }
    // const data = await append('1S09NG5cYDXZwJgLTlbd8y9AlgTiW-DfvWK0nqkdnp-o', 'sheet1', 'RAW', value)
    // const data = await authorize().then(listMajors).catch(console.error);
    res.sendFile(path.join(__dirname+'/test.html'));
})



app.get('/getData', async (req, res) => {
    const data = await authorize().then(listMajors).catch(console.error);
    res.send(data)
})

app.get('/sendData/:name/:content', async (req, res) => {
    const name = req.params.name
    const content = req.params.content
    const value = {
        "majorDimension": "ROWS",
        "values": [
          [name, content],
        ]
      }
    const data = await append('1S09NG5cYDXZwJgLTlbd8y9AlgTiW-DfvWK0nqkdnp-o', 'sheet1', 'RAW', value)
    res.send('done')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})