#!/usr/bin/env node
import * as cdk from "@aws-cdk/core"
import "source-map-support/register"

import { ServicePriceMatch } from "../src/service_stack"
import { IConfig } from "../src/config"

const app = new cdk.App()
const config: IConfig = app.node.tryGetContext("config")
const stackName = `price-match-${config.environment}`

new ServicePriceMatch(app, `${stackName}`, {
  tags: {
    Owner: "David Dai",
    StackName: stackName,
  },
})
