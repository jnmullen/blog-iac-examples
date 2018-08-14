
# Example Serverless Framework Project

Simple Serverless Framework example which creates a Lambda which has access to ParameterStore and Cloudwatch Logs and is triggered by a Cloudwatch Event.

### Prerequisites

To try out this example you will need to install the Serverless Framework for your platform from here : 

[Install Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)

Assume you have created a file with your AWS credentials in __~./aws/credentials__ as the Serverless Framework will require these to be able to run.

### Running Serverless Framework

To create the infrastructure run:
```
sls deploy --stage development -v
```
The serverless config has been setup to allow multiple stages/environments to be created but as yet only one called development exists.

Once you have finished you can destroy the infrastructure with : 
```
sls remove --stage development
```
