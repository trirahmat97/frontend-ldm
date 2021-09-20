import {GET_PRODUCT, ADD_MESSAGE} from './type';
import apildm from '../apis/apildm';
import history from '../history';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json'
    }
}

export const getProduct = (size, page) => async dispatch => {
    const response = await apildm.get(`/produk?size=${size}&page=${page}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: GET_PRODUCT,
            payload: response.data.values
        });
    }else{
        dispatch({
            type: ADD_MESSAGE,
            payload: {
                message: response.data.resDesc,
                infoMessage: 'Error!',
                colorMessage: 'warning',
                isSubmiting: false
            }
        });
        history.push('/products');
    }
}