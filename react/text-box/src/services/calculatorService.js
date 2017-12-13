import { getPerson, getFacility, getExposure } from 'communications/mockApi/api';
import { log } from 'utilities/logging';
import { createSuccessPromise, createFailurePromise } from 'utilities/promises';

export async function calculate({ value }) {

  const person = await getPerson({ value });
  if (person && typeof person.val1 !== undefined && person.val2 !== undefined) {
    const facility = await getFacility({ value: person.val1 });
    const exposure = await getExposure({ value: person.val2 });
    const result = parseInt(facility.val3, 10) * parseInt(exposure.val5, 10);
    return createSuccessPromise({ result });
  }

  return createFailurePromise(new Error('Sorry, network data error'));
}
