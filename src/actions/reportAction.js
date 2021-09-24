import {ADD_MESSAGE,GET_REPORT} from './type';
import apildm from '../apis/apildm';

const config = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'Application/json'
    }
}

export const getReport = (page, size) => async dispatch => {
    const response = await apildm.get(`/job/report?size=${size}&page=${page}`, config);
    if(response.data.resCode === '200'){
        dispatch({
            type: GET_REPORT,
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
    }
}
