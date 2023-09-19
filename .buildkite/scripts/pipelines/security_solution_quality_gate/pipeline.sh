#!/bin/bash
set -euo pipefail

source .buildkite/scripts/common/util.sh
source .buildkite/scripts/steps/functional/common_cypress.sh
.buildkite/scripts/bootstrap.sh

export JOB=kibana-security-solution-chrome

buildkite-agent meta-data set "${BUILDKITE_JOB_ID}_is_test_execution_step" "true"

echo "--- Serverless Security Solution Cypress tests (Chrome)"
cd x-pack/test/security_solution_cypress
set +e

CYPRESS_ELASTICSEARCH_URL=$TEST_ENV_ES_URL CYPRESS_BASE_URL=$TEST_ENV_KB_URL CYPRESS_ELASTICSEARCH_USERNAME=$TEST_ENV_USERNAME CYPRESS_ELASTICSEARCH_PASSWORD=$TEST_ENV_PWD CYPRESS_KIBANA_URL=$CYPRESS_BASE_URL yarn cypress:run:cloud:serverless; status=$?; yarn junit:merge || :; exit $status

.buildkite/scripts/lifecycle/post_command.sh