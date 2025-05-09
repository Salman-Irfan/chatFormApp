  <h1>React Frontend Task – Chat UI & Dynamic Form Assignment</h1>
  <p>This project consists of two main modules built using <strong>React.js + Vite + Material UI</strong>:</p>

  <ol>
    <li><strong>UI of Chat Screen</strong> containing — Header, Left Sidebar, Right Sidebar, Main Chat Screen</li>
    <li><strong>API Integration Task</strong> — Dynamic Forms with Company/User Assignment and Response Tracking</li>
  </ol>

  <hr>

  <h2>Features</h2>
  <ul>
    <li>Fully styled chat UI (Header + 3 Columns)</li>
    <li>Add/view Companies and Users</li>
    <li>Dynamically assign forms with nested structure</li>
    <li>Submit form responses</li>
    <li>Track submitted and pending forms</li>
    <li>Styled using Material UI with theme customization</li>
  </ul>

  <hr>

  <h2>Project Structure</h2>
  <pre>
src/
├── components/
│   ├── layouts/         # Components that stay across the whole app (Header, SidebarLeft, SidebarRight)
│   ├── pages/           # Route-based views (e.g., AddUserPage.jsx, AssignFormPage.jsx)
│   └── views/           # Section components used inside pages (e.g., HeroSection, TestimonialCards, etc.)
├── services/
│   └── apiServices/     # Axios API service functions (e.g., createUserService)
├── constants/
│   └── endPoints.js     # All backend API URLs in one place
├── theme/
│   └── customTheme.js   # Material UI custom palette, spacing, typography
├── App.jsx              # Main route configuration using react-router-dom
├── main.jsx             # App root with ThemeProvider and CssBaseline
└── .env                 # Shows required environment variables
└── .env.example         # Template for environment variables
  </pre>

  <hr>

  <h2>Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/Salman-Irfan/chatFormApp.git</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Create a <code>.env</code> file and add the API base URL:
      <pre><code>VITE_API_BASE_URL=http://localhost:5000/api/v1</code></pre>
    </li>
    <li>Run the development server:
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <hr>

  <h2>API Endpoints Integrated</h2>
  <ul>
    <li><code>POST /company/create-company</code></li>
    <li><code>GET /company/get-all-companies</code></li>
    <li><code>POST /user/create-user</code></li>
    <li><code>GET /user/get-all-users</code></li>
    <li><code>POST /form/create-form</code></li>
    <li><code>GET /form/get-all-forms</code></li>
    <li><code>POST /form/submit-response</code></li>
    <li><code>GET /form/get-all-form-responses</code></li>
  </ul>

  <hr>

  <h2>Task Breakdown</h2>

  <h3>1. Layout and Chat UI</h3>
  <p>Implemented a chat interface with:</p>
  <ul>
    <li><strong>Header</strong> with gradient design</li>
    <li><strong>Sidebar Left</strong> showing call logs</li>
    <li><strong>MainChatArea</strong> with aligned message bubbles</li>
    <li><strong>Sidebar Right</strong> with contact list and alphabet scroll</li>
  </ul>

  <h3>2. Form Assignment + API Integration</h3>
  <ul>
    <li>Forms can be dynamically created with sections → subsections → tasks</li>
    <li>Users and Companies fetched via dropdowns</li>
    <li>Form response submission and pending tracking handled</li>
    <li>All API interactions are modularized using <code>axios</code> services</li>
  </ul>

  <hr>

  <h2>Tech Stack</h2>
  <ul>
    <li>React 18 + Vite</li>
    <li>Material UI 5</li>
    <li>React Router DOM</li>
    <li>Axios</li>
    <li>React Toastify</li>
  </ul>

  <hr>