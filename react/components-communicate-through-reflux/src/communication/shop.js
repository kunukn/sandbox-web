export function fetchShopData({completed, failed}){
    window.fetch('/ashop.json')
        .then(response => response.json())
        .then( completed )
        .catch( failed );
}