import { getPerson, getFacility, getExposure } from 'communications/api';
import { log } from 'utilities/logging';

export async function calculate({ value }) {
  
  function createSuccessPromise(result) {
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }
  function createFailurePromise(result) {
    return new Promise((resolve, reject) => {
      reject(result);
    });
  }

  const person = await getPerson({ value });
  if (person && typeof person.val1 !== undefined && person.val2 !== undefined) {
    const facility = await getFacility({ value: person.val1 });
    const exposure = await getExposure({ value: person.val2 });
    const result = parseInt(facility.val4, 10) * parseInt(exposure.val5, 10);
    return createSuccessPromise({ result });
  }

  return createFailurePromise(new Error('Sorry, network data error'));
}
