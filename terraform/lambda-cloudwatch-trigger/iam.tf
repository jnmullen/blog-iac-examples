resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
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
}
EOF
}

data "aws_iam_policy_document" "lambda_ssm_cloudwatch" {
  statement {
    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
      "ssm:GetParametersByPath",
    ]

    resources = [
      "arn:aws:ssm:::/${var.environment}/${var.module-name}/",
    ]
  }

  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams",
    ]

    resources = [
      "arn:aws:logs:*:*:*",
    ]
  }
}

resource "aws_iam_policy" "allow_ssm_cloudwatch" {
  name   = "${var.environment}-${var.module-name}"
  path   = "/"
  policy = data.aws_iam_policy_document.lambda_ssm_cloudwatch.json
}

resource "aws_iam_policy_attachment" "attach_allow_ssm_cloudwatch" {
  name       = "${var.environment}-${var.module-name}"
  roles      = [aws_iam_role.iam_for_lambda.name]
  policy_arn = aws_iam_policy.allow_ssm_cloudwatch.arn
}
