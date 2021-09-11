// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '6obkm9xao4'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-uzwrgyei.us.auth0.com',            // Auth0 domain
  clientId: 'bbVrihrcOMQv73oTHDobfIqQe1glfI2B',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
