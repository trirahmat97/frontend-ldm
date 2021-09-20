import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import MessageReducer from './messageReducer';
import CategoryReducer from './categoryReducer';
import ProductReducer from './productReducer';
import JobReducer from './jobReducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    users: UserReducer,
    messages: MessageReducer,
    catigories: CategoryReducer,
    products: ProductReducer,
    jobs: JobReducer
});