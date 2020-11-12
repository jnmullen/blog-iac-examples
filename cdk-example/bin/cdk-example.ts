#!/usr/bin/env node
import s3 = require('@aws-cdk/aws-s3');
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import { PolicyStatement } from "@aws-cdk/aws-iam"
import cdk = require('@aws-cdk/core');


//import { ServicePrincipal } from '../node_modules/@aws-cdk/cdk';

class CdkHelloStack extends cdk.Stack {
    constructor(parent: cdk.App, id: string) {
        super(parent, id);

        const bucket = s3.Bucket.fromBucketName(this, 'BucketByName', 'jamesnmullen');

        const lambdaPolicy = new PolicyStatement()
        lambdaPolicy.addActions("ssm:GetParameter", "ssm:GetParameters", "ssm:GetParametersByPath")
        lambdaPolicy.addResources('arn:aws:ssm:::development/lambda-cloudwatch-triggered/');

        //lambda function
        const lambdaFunction = new lambda.Function(this, 'lambdaFunction', {
            code: new lambda.S3Code(bucket, 'lambda-cloudwatch-triggered.zip'),
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: 'index.handler',
            functionName: 'my-cdk-lambda-function',
            initialPolicy: [lambdaPolicy]
        });

        const rule = new events.Rule(this, 'Rule', {
            schedule: events.Schedule.expression('cron(0 0 * * ? *)'),
        });
        rule.addTarget(new targets.LambdaFunction(lambdaFunction));
    }
}

const app = new cdk.App();

new CdkHelloStack(app, 'CdkHelloStack');
app.synth();