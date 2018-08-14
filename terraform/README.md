# Example Terraform Project

Simple Terraform example which creates a Lambda which has access to ParameterStore and Cloudwatch Logs and is triggered by a Cloudwatch Event.

### Prerequisites

To try out this example you will need to install terraform for your platform from here : 

[Install Terraform](https://www.terraform.io/intro/getting-started/install.html)

Assume you have created a file with your AWS credentials in __~./aws/credentials__ as Terraform will require these to be able to run.

### Running Terraform

You may need to update the lambda-cloudwatch-triggered.tf to match your own requirements or create your own. The example references a bucket within my AWS account as an example.

To setup Terraform you must first initialise it :
```
terraform init
```

To plan the Terraform to see what will be produced simply run this from the root folder:
```
terraform plan
```

To then apply the changes if you are happy run the following :
```
terraform apply
```

Once you have finished you can destroy the infrastructure with : 
```
terraform destroy
```
