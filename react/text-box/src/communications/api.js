import { log } from 'utilities/logging';

export function getJson(url){
  log(url, 'was invoked');
  
  return window.fetch(url).then(response => {
    if (!response.ok) {
      log(response.statusText);
      throw new Error('There are network problems at the moment');
    }
    return response.json();
  }).catch(error => {
    log(error);
    throw new Error('No network at the moment');
  });
}

/* external dummy api server */
export function get12() {
    return getJson('http://echo.jsontest.com/val1/1/val2/2');
}

export function get34() {
  return getJson('http://echo.jsontest.com/val3/3/val4/4');
}

export function get5() {
  return getJson('http://echo.jsontest.com/val5/5');
}

/* local dummy api server */
export function getPerson({ value }) {
  //const url = `http://fubar.com/person/${value}`;
  const url = `http://localhost:9000/person/1`; // simulate usage of value
  return getJson(url);
}

export function getFacility({ value }) {
  //const url = `http://fubar.com/facility/${value}`;
  const url = `http://localhost:9000/facility/1`; // simulate usage of value
  return getJson(url);
}

export function getExposure({ value }) {
  //const url = `http://fubar.com/exposure/${value}`;
  const url = `http://localhost:9000/exposure/1`; // simulate usage of value
  return getJson(url);
}
