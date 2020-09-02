import * as fs from 'fs';
import * as path from 'path';
import { Config } from './config';

/**
 * Find the app config settings, require the file, and return the config
 * instance. If none is found then this method returns an empty config object.
 */
export function findOrCreateAppConfig(pwd: string = process.cwd()): Config {
  try {
    let exports = require(path.join(pwd, 'app', 'config'));
    if (exports instanceof Config) {
      return exports;
    } else if (exports.default instanceof Config) {
      return exports.default;
    } else {
      return new Config();
    }
  } catch (err) {
    return new Config();
  }
}
