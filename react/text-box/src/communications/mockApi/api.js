const delay = 100;

export function getPerson({ value }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        "val1": "1",
        "val2": "2"
      });
    }, delay);
  });
}

export function getFacility({ value }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        "val3": "3",
        "val4": "4"
      });
    }, delay);
  });
}

export function getExposure({ value }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        "val5": "5"
      });
    }, delay);
  });
}
