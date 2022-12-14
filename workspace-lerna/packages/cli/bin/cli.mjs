#!/usr/bin/env node
'use strict';

import cli from '../src/cli.mjs'
import logA from '@ld_xu/test-lerna-a'
import logB from '@ld_xu/test-lerna-b'

cli().parse(process.argv.slice(2));

logA();

logB();
