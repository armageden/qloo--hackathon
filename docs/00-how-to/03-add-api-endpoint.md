**Back:** [00-overview](./00-overview.md)

# How-To: Add a REST API Endpoint

## 1. Goal
Use this recipe when adding a new HTTP route to `server.js` (for example, to support new analytical queries, export formats, or health telemetry).

## 2. Step-by-Step Procedure

1. **Define Route in `server.js`:**
   In the `server.js` request handler, inspect `pathname` and `req.method`.
2. **Parse Body (for POST/PUT requests):**
   Use the built-in helper `await parseBody(req)`.
3. **Execute Logic and Send JSON:**
   Use the built-in helper `sendJson(res, statusCode, payload)`.
4. **Add Unit/Integration Test in `test.js`:**
   Verify the new route handler logic.
5. **Update API Documentation:**
   Document the new route in `docs/03-interfaces-and-api/http-rest-api.md`.

## 3. Real Code Patterns

From `server.js`:
```js
// Inside http.createServer callback in server.js:
if (pathname === "/api/example" && req.method === "POST") {
  const body = await parseBody(req);
  const result = {
    received: body,
    timestamp: new Date().toISOString()
  };
  return sendJson(res, 200, result);
}
```

Helper utilities available in `server.js`:
- `sendJson(res, statusCode, data)`: Sends JSON with standard CORS and `Content-Type` headers.
- `parseBody(req)`: Returns a Promise resolving to the parsed JSON body with a 1MB payload ceiling.

## 4. Verification

Test the server and test suite:
```sh
node test.js
```
Probe the endpoint using Node:
```sh
node -e "fetch('http://localhost:3000/api/example', {method:'POST', body: JSON.stringify({test:true})}).then(r=>r.json()).then(console.log)"
```

## 5. Deep-Dive Links
- Reference documentation: [http-rest-api.md](../03-interfaces-and-api/http-rest-api.md)
- System topology: [system-topology.md](../01-architecture/system-topology.md)
