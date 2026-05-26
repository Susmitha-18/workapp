resource "aws_instance" "jenkins_server" {
ami           = "ami-0f5ee92e2d63afc18"
instance_type = "t3.micro"
key_name = "Susmipass"
tags = {
Name = "Jenkins-Server"
}
}

resource "aws_instance" "dev_server" {
ami           = "ami-0f5ee92e2d63afc18"
instance_type = "t3.micro"
key_name = "Susmipass"

tags = {
Name = "Dev-Server"
}
}

resource "aws_instance" "prod_server" {
ami           = "ami-0f5ee92e2d63afc18"
instance_type = "t3.micro"
key_name = "Susmipass"
tags = {
Name = "Prod-1-Server"
}
}
