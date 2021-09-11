import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';
const ;
// TODO: Implement the dataLayer logic
export class todosAccess {
    constructor() {
        this.XAWS = AWSXRay.captureAWS(AWS);
        this.docClient = new XAWS.DynamoDB.DocumentClient();
        this.todosTable = process.env.TODO_TABLE;
        this.userIdIndex = process.env.USER_ID_INDEX;
        this.logger = createLogger('TodosAccess');
    }
}
{ }
//# sourceMappingURL=todosAccess.js.map