#!/usr/bin/env node
import events = require('@aws-cdk/aws-events')
import lambda = require('@aws-cdk/aws-lambda');
import s3 = require('@aws-cdk/aws-s3');
import cdk = require('@aws-cdk/cdk');

import { ServicePrincipal } from '../node_modules/@aws-cdk/cdk';

class CdkHelloStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        //code comes from a well defined bucket based on dev/prod account + service name
        const bucket = s3.BucketRef.import(this, 'CodeBucket', {
            bucketName: new s3.BucketName('jamesnmullen')
        });

        //lambda function
        const lambdaFunction = new lambda.Function(this, 'lambdaFunction', {
            code: new lambda.S3Code(bucket, 'lambda-cloudwatch-triggered.zip'),
            runtime: lambda.Runtime.NodeJS810,
            handler: 'index.handler',
            functionName: 'my-cdk-lambda-function'
        });

        const rule = new events.EventRule(this, 'Rule', {
            scheduleExpression: 'cron(0 0 * * ? *)',
        });
        rule.addTarget(lambdaFunction);
    
        lambdaFunction.addToRolePolicy(new cdk.PolicyStatement()
            .addResource('arn:aws:ssm:::development/lambda-cloudwatch-triggered/')
            .addActions('ssm:GetParameter','ssm:GetParameters','ssm:GetParametersByPath')
        );
    }
}

const app = new cdk.App(process.argv);

new CdkHelloStack(app, 'CdkHelloStack');

process.stdout.write(app.run());