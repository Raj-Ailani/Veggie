import  {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailReducer, productCreateReducer, productDeleteReducer, productUpdateReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer, userListReducer, userUpdateReducer} from './reducers/userReducers'
import { orderCreateReducer, orderDetailReducer, orderListMyReducer, orderPayReducer,orderListReducer, orderDeliverReducer, orderCODPayReducer } from './reducers/orderReducers'

const reducer=combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderCODPay:orderCODPayReducer,
    orderList:orderListMyReducer,
    userList:userListReducer,   
    userDelete:userDetailsReducer,
    userUpdate:userUpdateReducer, 
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    allOrderList:orderListReducer,

})
const cartItemsFromStorage = localStorage.getItem('cartItems') ?JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : []


const intialState = {
    cart:{cartItems: cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage},
    userLogin: {userInfo:userInfoFromStorage}

}
const middleware=[thunk]


const store = createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store