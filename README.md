# cmu-ediss-bookstore

This is the backend for a distributed bookstore application created in the context of the CMU EDISS class in Spring 2024. The backend is implemented in a microservices architecture orchestrated by Kubernetes.

## Project Structure

```
.
├── BookService                     -> Service for managing books
├── CF-A2-cmu.yml                   -> outdated CloudFormation template for the AWS infrastructure
├── CF-A3-cmu.yml                   -> CloudFormation template for the AWS infrastructure
├── CRM                             -> Service for CRM (emails)
├── CustomerService                 -> Service for managing customers
├── Dockerfile.BookService          -> Dockerfile for BookService
├── Dockerfile.CRM                  -> Dockerfile for CRM
├── Dockerfile.CustomerService      -> Dockerfile for CustomerService
├── Dockerfile.MobileBFF            -> Dockerfile for MobileBFF
├── Dockerfile.WebBFF               -> Dockerfile for WebBFF
├── K8                              -> Kubernetes configuration files
├── MobileBFF                       -> Service for the mobile backend
├── README.md                       -> This file
├── WebBFF                          -> Service for the web backend
├── api                             -> API documentation (swagger)
├── logs                            -> Log files (ignored)
├── node_modules                    -> Node modules (ignored)
├── package.json                    -> Node package file
├── prisma                          -> Prisma configuration and DB schema
├── src                             -> Source code (for shared functionality)
├── tsconfig.json                   -> TypeScript configuration
└── yarn.lock                       -> Yarn lock file
```