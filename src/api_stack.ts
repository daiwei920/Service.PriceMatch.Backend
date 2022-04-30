import * as CDK from "@aws-cdk/core"
import * as Lambda from "@aws-cdk/aws-lambda"
import * as ApiGateway from "@aws-cdk/aws-apigateway"
import * as CertManager from "@aws-cdk/aws-certificatemanager"
import * as Logs from "@aws-cdk/aws-logs"
import { IConfig } from "./config"


export class ServiceAPI {
  apigateway: ApiGateway.RestApi
  domain: ApiGateway.DomainName
  constructor(scope: CDK.Stack, stackName: string, config: IConfig) {
    // apigateway
    this.apigateway = new ApiGateway.RestApi(scope, "api", {
      restApiName: stackName,
      description: "API for Price Match Service",
      deployOptions: {
        stageName: "prod",
        loggingLevel: ApiGateway.MethodLoggingLevel.ERROR,
        dataTraceEnabled: true,
        metricsEnabled: true,
        tracingEnabled: true,
      },
      deploy: true,
    })

    this.domain = new ApiGateway.DomainName(scope, "domain", {
      domainName: config.domainName,
      endpointType: ApiGateway.EndpointType.REGIONAL,
      certificate: CertManager.Certificate.fromCertificateArn(scope, "certificate", config.certificateArnSydney),
    })

    new ApiGateway.BasePathMapping(scope, "mapping", {
      domainName: this.domain,
      restApi: this.apigateway,
    })

    // endpoint: /price
    
    const bankingResource = this.apigateway.root.addResource("price")
    {
      const lambda = new Lambda.Function(scope, "service", {
        functionName: `${stackName}-service`,
        runtime: Lambda.Runtime.PYTHON_3_8,
        code: Lambda.Code.fromAsset("src/lambdas/service-price-checker/package/lambda_service_price_checker.zip"),
        handler: "index.handler",
        logRetention: Logs.RetentionDays.ONE_DAY,
        timeout: CDK.Duration.seconds(60),
        tracing: Lambda.Tracing.PASS_THROUGH,
        memorySize: 128,
        environment: {
          ENDPOINT_NAME: "test-endpoint",
        },
      })

      bankingResource.addMethod("GET", new ApiGateway.LambdaIntegration(lambda))
      
    }
  }
}
