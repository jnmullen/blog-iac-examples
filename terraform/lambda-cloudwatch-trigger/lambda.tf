resource "aws_lambda_function" "lambda-cw-triggered" {
  function_name = "${var.environment}-lambda-cw-triggered"
  role          = "${aws_iam_role.iam_for_lambda.arn}"
  handler       = "index.handler"
  runtime       = "${var.lambda-runtime}"
  memory_size   = "${var.lambda-memory}"
  timeout       = "${var.lambda-timeout}"
  s3_bucket     = "${var.lambda-s3-bucket}"
  s3_key        = "${var.lambda-s3-key}"

  environment {
    variables = {
      ENVIRONMENT = "${var.environment}"
    }
  }
}

resource "aws_lambda_permission" "allow_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda-cw-triggered.function_name}"
  principal     = "events.amazonaws.com"
  source_arn    = "${aws_cloudwatch_event_rule.cloudwatch_rule.arn}"
}
