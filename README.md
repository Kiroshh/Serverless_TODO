# Serverless TODO

Simple TODO application using AWS Lambda and Serverless framework.

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.
Started code forked from https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code

## Prerequisites

* <a href="https://manage.auth0.com/" target="_blank">Auth0 account</a>
* <a href="https://github.com" target="_blank">GitHub account</a>
* <a href="https://nodejs.org/en/download/package-manager/" target="_blank">NodeJS</a> version up to 12.xx 
* Serverless 
   * Create a <a href="https://dashboard.serverless.com/" target="_blank">Serverless account</a> user
   * Install the Serverless Framework’s CLI  (up to VERSION=2.21.1). Refer to the <a href="https://www.serverless.com/framework/docs/getting-started/" target="_blank">official documentation</a> for more help.
   ```bash
   npm install -g serverless@2.21.1
   serverless --version
   ```
   * Login and configure serverless to use the AWS credentials 
   ```bash
   # Login to your dashboard from the CLI. It will ask to open your browser and finish the process.
   serverless login
   # Configure serverless to use the AWS credentials to deploy the application
   # You need to have a pair of Access key (YOUR_ACCESS_KEY_ID and YOUR_SECRET_KEY) of an IAM user with Admin access permissions
   sls config credentials --provider aws --key YOUR_ACCESS_KEY_ID --secret YOUR_SECRET_KEY --profile serverless
   ```

## deploy backend

* cd backend 
* npm update --save
* npm audit fix
* serverless
* serverless deploy --verbose
* sls deploy -v --aws-profile serverless

## deploy frontend code

  * cd client
  * npm update --save
  * npm install --save-dev
  * npm run start

## References

* https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html
* https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-relational-modeling.html
* https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started
* https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
* https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html
* https://json-schema.org/
* https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
* https://martinfowler.com/articles/oss-lockin.html
* https://blog.octo.com/en/hexagonal-architecture-three-principles-and-an-implementation-example/#tests
* https://github.com/dherault/serverless-offline
* https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
* 
