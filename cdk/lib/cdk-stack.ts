import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { CodePipeline ,CodePipelineSource,ShellStep} from 'aws-cdk-lib/pipelines';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const pipeline = new CodePipeline(this, 'CdkPipeline', {
      pipelineName: 'CdkPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Abrahale/AboStoreBE', 'Master'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk/cdk.out',
      }),
    });

    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true
    });
  }
}
