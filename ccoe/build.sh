#!/bin/bash

export SSM_NAME="/aa-faq-front-${APP_ENV}/config"
export NEXT_PUBLIC_APP_ENV=$APP_ENV
export NEXT_PUBLIC_API_GATEWAY_CONFIGS=$(aws ssm get-parameter --name "${SSM_NAME}" --query "Parameter.Value" --with-decryption --output text)

echo NEXT_PUBLIC_APP_ENV
echo $NEXT_PUBLIC_API_GATEWAY_CONFIGS

yarn install

yarn build