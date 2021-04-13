# Lambda Handler

A template repo for a simple AWS Lambda function with an S3 bucket built in leveraging the [Serverless SDK](https://serverless.com) with a simple hello world response.  This template is ready for local testing and dev deployment out of the box.  See [avatar-star](https://github.com/acolytec3/avatar-star) for a working example.

## Setup

- Follow [these instructions](https://www.serverless.com/framework/docs/getting-started/) to set up Serverless SDK
- Ensure you set up an app and service on the Serverless SDK dashboard as described above
- Clone the repo
- Copy `env.example.json` and rename to `env.offline.json`
- Copy `env.example.json` to `env.dev.json` 
- `npm i`

## Configuration

This repo uses [Mustache](https://mustache.github.io/) for setting up config options so update appropriate fields in `env.offline.json` and `env.dev.json`.
At a minimum, update the `org`, `app`, and `service` fields to match the corresponding values you created on the Serverless dashboard.
## Usage

- For local testing
    - Run `npm run local-server`
    - Access localhost:3000/lambdaHandler 
- To deploy to AWS
    - Run `npm run deploy`

A successful response from lambdaHandler will produce a response of the sort 
```json
{
    "greeting": "stored a greeting in S3 at {some unix timestamp}" 
}
```
