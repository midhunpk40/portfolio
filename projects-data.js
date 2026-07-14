const PROJECTS_DATA = [
  {
    id: "project-aws-tier",
    title: "Secure Multi-Tier Web Architecture",
    category: "Cloud Architecture",
    subtitle: "Highly available and fault-tolerant AWS web hosting environment.",
    shortDescription: "Designed and deployed a secure, highly available, and scalable multi-tier web application architecture on AWS following the Well-Architected Framework.",
    fullDescription: "A production-ready infrastructure design utilizing Amazon Web Services (AWS) to host web applications securely. The architecture is designed to prevent single points of failure, automatically scale based on demand, and isolate databases from public access.",
    highlights: [
      "Set up a custom VPC with public subnets for the load balancer, private subnets for application servers, and isolated private subnets for database resources.",
      "Configured an Application Load Balancer (ALB) across multiple Availability Zones to distribute incoming HTTP/HTTPS traffic evenly.",
      "Implemented an Auto Scaling Group (ASG) with launch templates to scale EC2 application instances dynamically based on CPU utilization metrics.",
      "Integrated Multi-AZ Amazon RDS (MySQL) with automated failover and restricted security group rules that only permit traffic from the application tier servers."
    ],
    techStack: ["AWS VPC", "AWS EC2", "Amazon RDS", "Application Load Balancer", "Auto Scaling", "Security Groups", "IAM", "Ubuntu Linux"],
    icon: "cloud"
  },
  {
    id: "project-cicd",
    title: "Containerized Automated CI/CD Pipeline",
    category: "DevOps & CI/CD",
    subtitle: "Automated test-build-deploy workflow for modern containerized apps.",
    shortDescription: "Built a fully automated CI/CD pipeline using GitHub Actions and Docker to build, test, and deploy applications to cloud container services.",
    fullDescription: "An automation pipeline that streamlines the software release cycle. Upon code push, it validates code quality, builds a Docker image, registers it in a container registry, and performs a rolling update, eliminating manual deployment overhead and downtime.",
    highlights: [
      "Configured multi-stage Dockerfiles to optimize image sizes and enhance container security.",
      "Built a GitHub Actions workflow that triggers on code pushes, executing unit tests and code checks.",
      "Configured automatic build and push tasks to upload tagged images to Amazon Elastic Container Registry (ECR).",
      "Automated rolling deployments to Amazon ECS (Elastic Container Service) with AWS Fargate, maintaining 100% application uptime during releases."
    ],
    techStack: ["Docker", "GitHub Actions", "Amazon ECS", "AWS Fargate", "Amazon ECR", "Nginx", "Git", "Node.js"],
    icon: "git-branch"
  },
  {
    id: "project-terraform",
    title: "Infrastructure as Code (IaC) with Terraform",
    category: "Automation & IaC",
    subtitle: "Reproducible and modular cloud infrastructure defined in code.",
    shortDescription: "Developed reusable Terraform modules to provision and configure standard network and compute environments dynamically.",
    fullDescription: "A project focusing on declarative infrastructure management. By defining all resources as code, environments can be provisioned in minutes with absolute consistency. State is managed securely in the cloud to prevent conflicts.",
    highlights: [
      "Designed modular Terraform scripts to separate networking (VPC, Route Tables, NAT Gateways) from computing (EC2, Launch Templates, Security Groups).",
      "Configured S3 remote state storage with DynamoDB state locking to ensure secure, concurrent-safe deployments within a team environment.",
      "Used environment variables and local configurations to make infrastructure adaptable for development, staging, or production tiers.",
      "Implemented strict IAM least-privilege roles for the provisioning system to prevent credential leaks."
    ],
    techStack: ["Terraform", "Infrastructure as Code (IaC)", "Amazon S3", "Amazon DynamoDB", "AWS IAM", "AWS VPC", "Linux CLI"],
    icon: "terminal"
  },
  {
    id: "project-sysadmin",
    title: "Linux Homelab Administration & Monitoring",
    category: "Systems & Security",
    subtitle: "Secure Linux server deployment, automation, and real-time monitoring.",
    shortDescription: "Established a local virtualization environment to test server hardening, bash automation, and prometheus-grafana telemetry.",
    fullDescription: "A hands-on system administration project implementing enterprise security standards, shell automation, and monitoring pipelines on virtualized Linux systems (Ubuntu/CentOS).",
    highlights: [
      "Provisioned local virtual instances and configured custom networks (NAT, Host-Only adapters) to simulate enterprise networks.",
      "Hardened Linux OS security: disabled root login, configured SSH key-only authentication, and enabled firewalld/UFW rules.",
      "Deployed Prometheus and Node Exporter to aggregate hardware statistics (CPU, memory, storage utilization, and network traffic).",
      "Created a customized Grafana dashboard displaying telemetry with configured alerting notifications for resource depletion."
    ],
    techStack: ["Linux (Ubuntu/CentOS)", "Prometheus", "Grafana", "Virtualization", "Bash Scripting", "UFW/Firewalld", "Systemd"],
    icon: "cpu"
  }
];
