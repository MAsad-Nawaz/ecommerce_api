import { publicRequest, userRequest } from "../requestMethod";
import { addProductsFailure, addProductsStart, addProductsSuccess, deleteProductsFailure, deleteProductsStart, deleteProductsSuccess, getProductsFailure, getProductsStart, getProductsSuccess, updateProductsFailure, updateProductsStart, updateProductsSuccess, } from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure(err.response.data.msg));
    }
};


export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure(err.response.data.msg));
    }
}

export const deletProducts = async (id, dispatch) => {
    dispatch(deleteProductsStart());
    try {
        // const res = await userRequest.delete(`/products${id}`);
        dispatch(deleteProductsSuccess(id));
    } catch (err) {
        dispatch(deleteProductsFailure(err.response.data.msg));
    }
};

export const updateProducts = async (id, product, dispatch) => {
    dispatch(updateProductsStart());
    try {
        //const res = await userRequest.update(`/products${id}`);
        dispatch(updateProductsSuccess({ id, product }));
    } catch (err) {
        dispatch(updateProductsFailure(err.response.data.msg));
    }
};

export const addProducts = async (product, dispatch) => {
    dispatch(addProductsStart());
    try {
        const res = await userRequest.post(`/products`, { product });
        dispatch(addProductsSuccess(res.data));
    } catch (err) {
        dispatch(addProductsFailure(err.response.data.msg));
    }
}