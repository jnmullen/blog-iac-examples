#!/usr/bin/env node
import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider, CloudwatchEventRule, CloudwatchEventTarget, DataAwsS3Bucket, IamPolicy, IamRole, IamRolePolicyAttachment, LambdaFunction } from '../.gen/providers/aws'

class CdkTfHelloStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new AwsProvider(this, 'aws', {
            region: 'eu-west-1'
        })

        const s3BucketData = new DataAwsS3Bucket(this, 'CodeBucket', {
            bucket: 'jamesnmullen'
        });

        const iamPolicy = new IamPolicy(this, 'ssmPolicy', {
            policy: `{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "Stmt1605043057231",
                    "Action": [
                        "ssm:GetParameter",
                        "ssm:GetParameters",
                        "ssm:GetParametersByPath"
                    ],
                    "Effect": "Allow",
                    "Resource": "arn:aws:ssm:::development/lambda-cloudwatch-triggered/"
                }
            ]
        }`});

        const iamRole = new IamRole(this, 'my-role', {
            assumeRolePolicy: `{
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Action": "sts:AssumeRole",
                    "Principal": {
                      "Service": "lambda.amazonaws.com"
                    },
                    "Effect": "Allow",
                    "Sid": ""
                  }
                ]
              }`
        });

        new IamRolePolicyAttachment(this, 'my-attachment', {
            policyArn: iamPolicy.arn,
            role: iamRole.arn
        });

        const lambdaFunction = new LambdaFunction(this, 'my-lambda', {
            filename: "s3://" + s3BucketData.id + "/lambda-cloudwatch-triggered.zip",
            runtime: "nodejs8.10",
            functionName: "my-cdktf-lambda-function",
            handler: "index.handler",
            role: iamRole.arn
        })

        const eventRule = new CloudwatchEventRule(this, 'my-rule', {
            scheduleExpression: 'cron(0 0 * * ? *)'
        });

        new CloudwatchEventTarget(this, 'my-target', {
            arn: lambdaFunction.arn,
            rule: eventRule.arn
        });
    }
};

const app = new App();
new CdkTfHelloStack(app, 'hello-terra');
app.synth();
