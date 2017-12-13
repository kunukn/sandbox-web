/* mock endpoint */
//import { getPerson, getFacility, getExposure } from 'communications/mockApi/api';
/* live endpoint */
import { getPerson, getFacility, getExposure } from 'communications/api';

import _ from 'lodash';

import { log } from 'utilities/logging';
import { createSuccessPromise, createFailurePromise } from 'utilities/promises';

export async function calculateService({ value }) {
  const person = await getPerson({ value });
  if (person && !_.isNil(person.val1) && !_.isNil(person.val2)) {
    const facility = await getFacility({ value: person.val1 });
    const exposure = await getExposure({ value: person.val2 });
    const result = parseInt(facility.val3, 10) * parseInt(exposure.val5, 10);
    return createSuccessPromise({ result });
  }

  return createFailurePromise(new Error('Sorry, network data error'));
}
