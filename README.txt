PHISHSCALE - COMPLETE LOCAL DEMO

FILES
- index.html: complete frontend
- backend/server.js: Express API
- backend/package.json: backend dependencies

SETUP ON MAC
1. Unzip this folder.
2. Open the unzipped PhishScale_complete folder in VS Code.
3. Open Terminal and run:
   cd backend
   npm install
   node server.js
4. Keep that terminal open.
5. Open index.html in VS Code and click Go Live (Live Server extension), OR open the file in your browser.
6. Use the URL Checker and test https://example.com.

IMPORTANT
- The API only checks URL syntax and basic warning signs. It does NOT query threat intelligence and cannot confirm a URL is safe.
- Dashboard campaign figures are demo placeholders. Campaigns and activity are stored in browser memory and reset on reload.
- No emails are sent; no credentials are collected.
- If port 3000 is already in use, stop the previous server with Control+C in its terminal before starting again.
