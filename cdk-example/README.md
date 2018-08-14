
# Example aws-cdk Project

Simple aws-cdk example which creates a Lambda which has access to ParameterStore and Cloudwatch Logs and is triggered by a Cloudwatch Event.

### Prerequisites

To try out this example you will need to install the aws-cdk for your platform from here : 

[Install aws-cdk](https://awslabs.github.io/aws-cdk/getting-started.html)

Assume you have created a file with your AWS credentials in __~./aws/credentials__ as the Serverless Framework will require these to be able to run.

### Running aws-cdk

Install the dependencies:
```
npm install
```

Cross compile the Typescript code to Javascript:
```
npm run-script build
```

To print out the Cloudformation which will be created run:
```
cdk synth
```

To deploy the infrastructure:
```
cdk deploy
```

IF you were to make changes you can see what changes need to be applied with:
```
cdk diff
```

Once you have finished you can destroy the infrastructure with : 
```
cdk destroy
```
