export function getUsers(){
    return window.fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
      return response.json()
    });
}

export function getTodos(){
    return window.fetch('http://echo.jsontest.com/key/value/one/two')
    .then(function(response) {
      return response.json()
    });
}

