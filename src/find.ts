import * as fs from 'fs';
import * as path from 'path';
import { Config } from './config';

/**
 * Find the app config settings, require the file, and return the config
 * instance. If none is found then this method returns an empty config object.
 */
export function findOrCreateAppConfig(cwd: string = process.cwd()): Config {
  let requirePath: string;

  try {
    requirePath = require.resolve(path.join(cwd, 'app', 'config'));
  } catch(err) {
    // this means the config file was not found.
    return new Config();
  }

  let exports = require(requirePath);
  if (exports instanceof Config) {
    return exports;
  } else if (exports.default instanceof Config) {
    return exports.default;
  } else {
    return new Config();
  }
}
