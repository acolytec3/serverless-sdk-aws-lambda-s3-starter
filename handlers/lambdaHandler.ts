import { Handler } from 'aws-lambda';
import { S3, Endpoint } from 'aws-sdk';


const lambdaHandler: Handler = async (event: any, context, callback: () => void) => {

  const s3 = process.env.IS_OFFLINE ? new S3({
    s3ForcePathStyle: true,
    endpoint: new Endpoint(process.env.s3Endpoint),
    accessKeyId: process.env.s3AccessKey,
    secretAccessKey: process.env.s3SecretAccessKey,
  }) :
    new S3();

  const s3Params = {
    Bucket: process.env.bucket,
    Key: Date.now().toString(),
    Body: {
      greeting: "Hi"
    },
    ContentType: 'application/json',
    ACL: "public-read"
  };

  await s3.putObject(s3Params).promise();

  const response = {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ 'greeting': 'stored a greeting in S3 at ' + Date.now().toString() })
  };

  return response;
}

export default lambdaHandler;