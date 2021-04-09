import { Handler } from "aws-lambda";
import { S3, Endpoint } from "aws-sdk";

const lambdaHandler: Handler = async (
  event: any,
  context,
  callback: () => void
) => {
  if (!event?.pathParameters?.id) {
    const response = {
      statusCode: 400,
      statusText: "No id provided",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "no id provided" }),
    };
  }
  const s3 = process.env.IS_OFFLINE
    ? new S3({
      s3ForcePathStyle: true,
      endpoint: new Endpoint(process.env.s3Endpoint),
      accessKeyId: process.env.s3AccessKey,
      secretAccessKey: process.env.s3SecretAccessKey,
    })
    : new S3();

  try {
    let s3object = await s3
      .getObject({ Bucket: process.env.bucket, Key: event.pathParameters.id })
      .promise();
    if (s3object?.Body) {
      let time = JSON.parse(s3object.Body.toString("utf-8"));

      const response = {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ greeting: "last said Hi at " + time.time }),
      };
      return response;
    }
  } catch (err) { }

  const time = Date.now().toString()
  try {
    const s3Params = {
      Bucket: process.env.bucket,
      Key: event.pathParameters.id,
      Body: JSON.stringify({
        time: time,
      }),
      ContentType: "application/json",
      ACL: "private",
    };

    await s3.putObject(s3Params).promise();

    const response = {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        greeting: "stored a greeting in S3 at " + Date.now().toString(),
      }),
    }
    return response;
  }
  catch (err) {
    const response = {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "something went badly wrong" }),
    };
    return response;
  }

};

export default lambdaHandler;
