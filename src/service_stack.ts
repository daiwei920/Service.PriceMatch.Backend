import * as CDK from "@aws-cdk/core"
import { ServiceAPI } from "./api_stack"
import { IConfig } from "./config"

export class ServicePriceMatch extends CDK.Stack {
  constructor(scope: CDK.Construct, stackName: string, props: CDK.StackProps) {
    super(scope, stackName, props)

    const config: IConfig = scope.node.tryGetContext("config")

    const apigateway = new ServiceAPI(this, stackName, config)

    /*
    const zone = Route53.HostedZone.fromHostedZoneAttributes(this, "zone", {
      hostedZoneId: config.zoneId,
      zoneName: config.zoneDomain,
    })

    new Route53.CnameRecord(this, "api_alias", {
      domainName: apigateway.domain.domainNameAliasDomainName,
      recordName: "price-match",
      zone,
    })
    */

    /*
    // db
    const table = new DynamoDB.Table(this, 'ID', {
      tableName: stackName,
      //replicationRegions: ,
      partitionKey: { name: 'ID', type: DynamoDB.AttributeType.STRING },
      //sortKey: { name: 'SK', type: DynamoDB.AttributeType.STRING },
      billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
      serverSideEncryption: true,
      pointInTimeRecovery: true,
      timeToLiveAttribute: 'TimeToLive'
    });
    */
  }
}
