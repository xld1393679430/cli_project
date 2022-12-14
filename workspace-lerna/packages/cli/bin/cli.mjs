#!/usr/bin/env node
'use strict';

import cli from '../src/cli.mjs'
import logA from '@xld-cli-dev/test-lerna-a'
import logB from '@xld-cli-dev/test-lerna-b'

cli().parse(process.argv.slice(2));

logA();

logB();
