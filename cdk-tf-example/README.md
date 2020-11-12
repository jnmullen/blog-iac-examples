
# Example cdktf Project

Simple cdftk example which creates a Lambda which has access to ParameterStore and Cloudwatch Logs and is triggered by a Cloudwatch Event using Terraform

### Prerequisites

To try out this example you will need to install the cdtf for your platform from here : 

[Setup guide fpr cdftf](https://learn.hashicorp.com/tutorials/terraform/cdktf)

Assume you have created a file with your AWS credentials in __~./aws/credentials__ as the Serverless Framework will require these to be able to run.

### Running cdktf

Install the dependencies:
```
yarn install
```

Get cdktf dependencies
```
npm run-script get
```

Cross compile the Typescript code to Javascript:
```
npm run-script compile
```

To print out the Cloudformation which will be created run:
```
npm run-script synth (runs cdktf synth)
```

To run a plan to see what changes will be made:
```
cd ./cdktf.out && terraform init && terraform plan
```

To apply the changes from the above plan:
```
terraform apply ./cdktf.out
```

IF you were to make changes you can see what changes need to be applied with:
```
cdktf diff
```

Once you have finished you can destroy the infrastructure with : 
```
cdktf destroy
```
