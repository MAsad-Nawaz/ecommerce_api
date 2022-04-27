import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
        errormsg: ""
    },
    reducers: {
        // Get All
        getProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.errormsg = "";
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
            state.errormsg = "";
        },
        getProductsFailure: (state, action) => {
            state.isFetching = false;
            state.products = [];
            state.error = true;
            state.errormsg = action.payload;
        },
        // Delete Product
        deleteProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.errormsg = "";
        },
        deleteProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload), 1
            );
            state.error = false;
            state.errormsg = "";
        },
        deleteProductsFailure: (state, action) => {
            state.isFetching = false;
            state.products = [];
            state.error = true;
            state.errormsg = action.payload;
        },
        // Update Product
        updateProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.errormsg = "";
        },
        updateProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex((item) => item._id === action.payload.id)] = action.payload.product;
            state.error = false;
            state.errormsg = "";
        },
        updateProductsFailure: (state, action) => {
            state.isFetching = false;
            state.products = [];
            state.error = true;
            state.errormsg = action.payload;
        },
        // Adding Product
        addProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.errormsg = "";
        },
        addProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
            state.error = false;
            state.errormsg = "";
        },
        addProductsFailure: (state, action) => {
            state.isFetching = false;
            state.products = [];
            state.error = true;
            state.errormsg = action.payload;
        },
    },
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    deleteProductsStart,
    deleteProductsSuccess,
    deleteProductsFailure,
    updateProductsSuccess,
    updateProductsFailure,
    updateProductsStart,
    addProductsSuccess,
    addProductsFailure,
    addProductsStart,
} = productSlice.actions;
export default productSlice.reducer;