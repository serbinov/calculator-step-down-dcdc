// Example Netlify Function: secure proxy to an external API using a secret stored in environment variables.
// Deploy this project to Netlify and set the secret in Settings → Build & deploy → Environment.

const https = require('https');

exports.handler = async (event) => {
  const apiKey = process.env.SECURE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing SECURE_API_KEY environment variable' }),
    };
  }

  // Replace with the real URL you need to call.
  const apiUrl = 'https://api.example.com/data';

  return new Promise((resolve) => {
    const req = https.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode || 200,
          body: body,
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        statusCode: 502,
        body: JSON.stringify({ error: error.message }),
      });
    });

    req.end();
  });
};
