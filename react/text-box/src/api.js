export function getUsers(){
    return window.fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
      return response.json()
    });
}

export function getTodos(){
    return window.fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response) {
      return response.json()
    });
}

