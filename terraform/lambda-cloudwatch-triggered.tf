module "terraform-cloudwatch-trigger" {
  source           = "./lambda-cloudwatch-trigger"
  lambda-s3-bucket = "jamesnmullen"
}

