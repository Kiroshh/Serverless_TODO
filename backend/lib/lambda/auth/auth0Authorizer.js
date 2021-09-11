import 'source-map-support/register';
import { verify, decode } from 'jsonwebtoken';
import { createLogger } from '../../utils/logger';
import Axios from 'axios';
const logger = createLogger('auth');
const jwksUrl = 'https://dev-uzwrgyei.us.auth0.com/.well-known/jwks.json';
const jwkToPem = require('jwk-to-pem');
export const handler = async (event) => {
    logger.info('Authorizing a user', event.authorizationToken);
    try {
        const jwtToken = await verifyToken(event.authorizationToken);
        logger.info('User was authorized', jwtToken);
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    }
    catch (e) {
        logger.error('User not authorized', { error: e.message });
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }
};
async function verifyToken(authHeader) {
    const token = getToken(authHeader);
    const jwt = decode(token, { complete: true });
    //getting key set from the Auth0 JWKS endpoint
    const response = await Axios(jwksUrl);
    const responseData = response.data;
    //Finding the signature verification key in the filtered JWKS with a matching kid property of the decoded JWT
    const signingKey = responseData['keys'].find(key => key['kid'] === jwt['header']['kid']);
    if (!signingKey) {
        throw new Error('Signing key is invalid');
    }
    return verify(token, jwkToPem(signingKey), { algorithms: ['RS256'] });
}
function getToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    const split = authHeader.split(' ');
    const token = split[1];
    return token;
}
//# sourceMappingURL=auth0Authorizer.js.map