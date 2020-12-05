
# Example cdktf Project

Simple cdftk example which creates a Lambda which has access to ParameterStore and Cloudwatch Logs and is triggered by a Cloudwatch Event using Terraform

### Prerequisites

To try out this example you will need to install the cdtf for your platform from here : 

[Setup guide fpr cdftf](https://learn.hashicorp.com/tutorials/terraform/cdktf)

Assume you have created a file with your AWS credentials in __~./aws/credentials__ as the Serverless Framework will require these to be able to run.

### Running cdktf

Install the dependencies:
```
npm i -g @architect/architect
```

Get cdktf dependencies
```
mkdir architect-example && cd architect-example && arc init architect-example
```

Start the local dev server
```
arc sandbox
```

Deploy to the staging environment
```
arc deploy
```

Deploy to the production environment
```
arc deploy production
```


Once you have finished you can destroy the infrastructure with : 
```
arc destroy
```
