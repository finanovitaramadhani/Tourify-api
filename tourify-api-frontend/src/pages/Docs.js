import "../styles/docs.css";

function Docs() {
  return (
    <div className="docs">
      <h1>Tourify API Documentation</h1>
      <p className="subtitle">
        Open API platform for Indonesian tourism data
      </p>

      {/* BASE URL */}
      <section>
        <h2>Base URL</h2>
        <pre>http://localhost:3000/api</pre>
      </section>

      {/* AUTH OVERVIEW */}
      <section>
        <h2>Authentication</h2>
        <p>
          Tourify API uses two authentication mechanisms:
        </p>
        <ul>
          <li><strong>JWT Token</strong> – for user & admin authentication</li>
          <li><strong>API Key</strong> – for accessing tourism data</li>
        </ul>
      </section>

      {/* REGISTER */}
      <section>
        <h2>Register (User)</h2>
        <p><strong>POST</strong> /register</p>

        <pre>{`{
  "username": "user123",
  "password": "password"
}`}</pre>

        <p><strong>Response:</strong></p>
        <pre>{`{
  "message": "Register berhasil"
}`}</pre>
      </section>

      {/* LOGIN */}
      <section>
        <h2>Login</h2>
        <p><strong>POST</strong> /login</p>

        <pre>{`{
  "username": "user123",
  "password": "password"
}`}</pre>

        <p><strong>Response:</strong></p>
        <pre>{`{
  "token": "JWT_TOKEN",
  "role": "user"
}`}</pre>
      </section>

      {/* API KEY */}
      <section>
        <h2>Generate API Key</h2>
        <p><strong>POST</strong> /apikey/create</p>

        <p><strong>Headers:</strong></p>
        <pre>{`Authorization: Bearer JWT_TOKEN`}</pre>

        <p><strong>Response:</strong></p>
        <pre>{`{
  "api_key": "tourify_xxxxxxxxxx"
}`}</pre>
      </section>

      <section>
        <h2>Get My API Keys</h2>
        <p><strong>GET</strong> /apikey/my</p>

        <pre>{`Authorization: Bearer JWT_TOKEN`}</pre>
      </section>

      {/* WISATA */}
      <section>
        <h2>Get Tourism Data</h2>
        <p><strong>GET</strong> /wisata</p>

        <p><strong>Headers:</strong></p>
        <pre>{`x-api-key: YOUR_API_KEY`}</pre>

        <p><strong>Query Parameters:</strong></p>
        <ul>
          <li><code>page</code> – page number</li>
          <li><code>limit</code> – data per page</li>
          <li><code>kategori</code> – filter by category</li>
        </ul>

        <pre>{`GET /wisata?page=1&limit=10`}</pre>
      </section>

      {/* ADMIN */}
      <section>
        <h2>Admin Endpoints</h2>
        <p>
          Admin endpoints require a JWT token with role <code>admin</code>.
        </p>

        <h3>Create Category</h3>
        <pre>{`POST /admin/kategori
Authorization: Bearer JWT_ADMIN

{
  "nama_kategori": "Pantai",
  "deskripsi": "Wisata pantai"
}`}</pre>

        <h3>Update Category</h3>
        <pre>{`PUT /admin/kategori/:id
Authorization: Bearer JWT_ADMIN`}</pre>

        <h3>Delete Category</h3>
        <pre>{`DELETE /admin/kategori/:id
Authorization: Bearer JWT_ADMIN`}</pre>

        <h3>Import Data from OpenStreetMap</h3>
        <pre>{`POST /admin/import/osm
Authorization: Bearer JWT_ADMIN`}</pre>
      </section>

      {/* FLOW */}
      <section>
        <h2>Usage Flow</h2>
        <ol>
          <li>User registers account</li>
          <li>User logs in and receives JWT</li>
          <li>User generates API key</li>
          <li>API key is used to access tourism data</li>
        </ol>
      </section>

      <footer>
        <p>© 2026 Tourify API – Open Tourism Data Platform</p>
      </footer>
    </div>
  );
}

export default Docs;
