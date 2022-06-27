const storeData = JSON.parse(localStorage.getItem("storeData"));
const storeId = storeData.store_id;
const accessToken = storeData.access_token;

export async function changeStatusProduct(newStatus,productId){
    try {
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ enabled: newStatus }),
        };
              
        const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}/products/${productId}`, options)
        const result= await response.json(); 
        return result;   
    } catch (error) {
        console.log(error);
    }
}

export async function changePriceProduct(newPrice,productId){
    try {
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: parseFloat(newPrice) }),
        };
              
        const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}/products/${productId}`, options)
        const result= await response.json(); 
        return result;   
    } catch (error) {
        console.log(error);
    }
}

export async function changeShippingProduct(newShipping,productId){
    try {
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fixedShippingRate: parseFloat(newShipping) }),
        };
              
        const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}/products/${productId}`, options)
        const result= await response.json(); 
        return result;   
    } catch (error) {
        console.log(error);
    }
}