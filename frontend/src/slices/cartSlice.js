import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[], shippingAddress: {}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            const item = action.payload;
            console.log("items: ", item)

            const existItem = state.cartItems.find((x) => x._id === item._id);
            console.log("existsItem: ",existItem)
            if(existItem){
                console.log("are we in here???")
                state.cartItems = state.cartItems.map((x)=>x._id===existItem._id?item:x)
            }else{
                console.log("or in here???")
                state.cartItems = [...state.cartItems, item];
            }

            console.log("state:", state)

            return updateCart(state)
        },

        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter((x)=>x._id!== action.payload)

            return updateCart(state)
        },

        saveShippingAddress:(state,action)=>{
            state.shippingAddress = action.payload;
            return updateCart(state)
        },

        savePaymentMethod: (state, action)=>{
            state.paymentMethod = action.payload;
            return updateCart(state);
        },

        clearCartItems: (state, action) =>{
            state.cartItems = []
            return updateCart(state)
        }
    },
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems} = cartSlice.actions;

export default cartSlice.reducer;