const storeData = JSON.parse(localStorage.getItem("storeData"));
const storeId = storeData.store_id;
const accessToken = storeData.access_token;

export async function listProducts(accessToken,storeId){
    try {
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', Authorization: `Bearer ${accessToken}`}
        };
        const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}/products`, options);
        const result= await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);        
    }
}

export async function getProduct(keySearch){
    try {
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', Authorization: `Bearer ${accessToken}`}
          };
          
        const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}/products/${keySearch}`, options);
        const result= await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);        
    }
}