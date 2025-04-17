export default function SetupGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Google OAuth Setup Guide</h1>

      <div className="prose max-w-none">
        <h2>Step 1: Create a Google Cloud Project</h2>
        <ol>
          <li>
            Go to the{" "}
            <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
              Google Cloud Console
            </a>
          </li>
          <li>Click on the project dropdown at the top of the page</li>
          <li>Click on "New Project"</li>
          <li>Enter a name for your project and click "Create"</li>
        </ol>

        <h2>Step 2: Configure the OAuth Consent Screen</h2>
        <ol>
          <li>In your Google Cloud project, go to "APIs & Services" > "OAuth consent screen"</li>
          <li>Select "External" user type (unless you have a Google Workspace account)</li>
          <li>
            Fill in the required information:
            <ul>
              <li>App name: "Dashwise"</li>
              <li>User support email: Your email</li>
              <li>Developer contact information: Your email</li>
            </ul>
          </li>
          <li>Click "Save and Continue"</li>
          <li>
            Add the following scopes:
            <ul>
              <li>email</li>
              <li>profile</li>
              <li>openid</li>
            </ul>
          </li>
          <li>Click "Save and Continue"</li>
          <li>Add test users if you're still in testing mode</li>
          <li>Click "Save and Continue"</li>
        </ol>

        <h2>Step 3: Create OAuth Client ID</h2>
        <ol>
          <li>Go to "APIs & Services" > "Credentials"</li>
          <li>Click "Create Credentials" > "OAuth client ID"</li>
          <li>Select "Web application" as the application type</li>
          <li>Name: "Dashwise Web Client"</li>
          <li>
            Add Authorized JavaScript origins:
            <ul>
              <li>
                Development: <code>http://localhost:3000</code>
              </li>
              <li>
                Production: <code>https://your-production-domain.com</code>
              </li>
            </ul>
          </li>
          <li>
            Add Authorized redirect URIs:
            <ul>
              <li>
                Development: <code>http://localhost:3000/api/auth/callback/google</code>
              </li>
              <li>
                Production: <code>https://your-production-domain.com/api/auth/callback/google</code>
              </li>
            </ul>
          </li>
          <li>Click "Create"</li>
        </ol>

        <h2>Step 4: Get Your Client ID</h2>
        <ol>
          <li>After creating the OAuth client, you'll see a modal with your Client ID and Client Secret</li>
          <li>Copy the Client ID</li>
        </ol>

        <h2>Step 5: Add Client ID to Your Application</h2>
        <ol>
          <li>
            Create a <code>.env.local</code> file in your project root (if it doesn't exist)
          </li>
          <li>
            Add the following line:
            <pre>
              <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here</code>
            </pre>
          </li>
          <li>Restart your development server</li>
        </ol>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <p className="text-yellow-700">
            <strong>Note:</strong> For production, make sure to add the environment variable to your hosting platform
            (e.g., Vercel).
          </p>
        </div>
      </div>
    </div>
  )
}
