variable "environment" {
  description = "Environment with an account"
  default     = "development"
}

variable "module-name" {
  description = "Default name of this module"
  default     = "lambda-cloudwatch-triggered"
}

variable "lambda-runtime" {
  description = "Default runtime for the Lambda function"
  default     = "nodejs8.10"
}

variable "lambda-memory" {
  description = "Amount of memory in MB given to the Lambda function"
  default     = 128
}

variable "lambda-timeout" {
  description = "Default timeout in s for the Lambda function"
  default     = 10
}

variable "lambda-s3-bucket" {
  description = "S3 bucket from which to pull lambda code bundle"
}

variable "lambda-s3-key" {
  description = "key to use for lambda code bundle"
  default     = "lambda-cloudwatch-triggered.zip"
}
