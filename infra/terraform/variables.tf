variable "aws_region" {
  description = "aws region to deploy into"
  type = string
  default = "eu-west-2"
}
variable "key_pair_name" {
    description = "existing ec2 key pair name"
    type = string
}
variable "my_ip_cidr" {
    description = "your public IP in CIDR format"
    type = string
  
}