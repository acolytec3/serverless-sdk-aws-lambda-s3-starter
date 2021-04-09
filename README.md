# Lambda Handler

A template repo for a simple AWS Lambda function with an S3 bucket built in leveraging the [Serverless SDK](https://serverless.com) with a simple hello world response.  This template is ready for local testing and dev deployment out of the box.  See [avatar-star](https://github.com/acolytec3/avatar-star) for a working example.

## Setup

- Clone the repo
- Copy the `env.example.json` and rename to `env.offline.json`
    - Configure any port/server settings as desired
- Copy `env.example.json` to `env.dev.json` 
- `npm i`

## Configuration

In `serverless.yml`
- Add the org, app name, and service name from your Serverless Dashboard

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
