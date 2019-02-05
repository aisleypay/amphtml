/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {dev} from '../src/log';
import {loadScript, validateData} from '../3p/3p';

const TAG = 'PROMOTEIQ';
const mandatoryDataFields = ['src', 'params', 'sfcallback'];

/**
 * @param {!Window} global
 * @param {!Object} data
 */
export function promoteiq(global, data) {
  validateData(data, mandatoryDataFields, []);
  const sfInputs = JSON.parse(data.params);

  loadScript(global, data.src, () => {
    if (!!global.TagDeliveryContent) {
      const sfCallback = new Function('return ' + data.sfcallback);
      global.TagDeliveryContent.request(sfInputs, sfCallback);
    } else {
      dev().error(TAG, 'TagDeliveryContent object not loaded on page');
    }
  });
}
