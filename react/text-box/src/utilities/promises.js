export function createSuccessPromise(result) {
  return new Promise((resolve, reject) => {
    resolve(result);
  });
}

export function createFailurePromise(result) {
  return new Promise((resolve, reject) => {
    reject(result);
  });
}