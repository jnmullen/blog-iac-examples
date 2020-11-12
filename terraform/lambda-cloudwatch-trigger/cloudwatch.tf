resource "aws_cloudwatch_event_target" "cloudwatch_target_lambda" {
  target_id = "${var.environment}-${var.module-name}-cwe-target"
  rule      = aws_cloudwatch_event_rule.cloudwatch_rule.name
  arn       = aws_lambda_function.lambda-cw-triggered.arn
}

resource "aws_cloudwatch_event_rule" "cloudwatch_rule" {
  name                = "${var.environment}-${var.module-name}-cwe-rule"
  description         = "Cron to run lambda function"
  schedule_expression = "cron(0 0 * * ? *)"
}
