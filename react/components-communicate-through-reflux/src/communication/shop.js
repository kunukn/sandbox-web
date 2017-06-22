export function fetchShopData({completed, failed}){
    window.fetch('/shop.json')
        .then(response => response.json())
        .then( completed )
        .catch( failed );
}