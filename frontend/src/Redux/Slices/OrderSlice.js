import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;
const HOSTNAME = "http://localhost:8000";

const token = localStorage.getItem("loggedDataToken");

export const getAllOrdersAsync = createAsyncThunk(
  "order/allOrders",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/trading/order/`,

        {
          headers: { Authorization: `${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getAllOrdersAsync Error - ", error.response);
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async ({ orderPrice, orderQty, orderType }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/trading/order/`,
        {
          orderPrice,
          orderQty,
          orderType,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      // console.log(" resopnse data " , response.data );
      return response.data;
    } catch (error) {
      console.log("createOrderAsync Error - ", error.response);
    }
  }
);

const initialState = {
  orderBookdata: [],
  userOrdersdata: [],
  isLoading: false,
  isError: false,
};

export const orderSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log( "action" , action.payload );
        try {
          state.orderBookdata = action.payload.orderBook;
          state.userOrdersdata = action.payload.userOrders;
        } catch (error) {
          console.log("Error - ", error.message);
        }
      })

      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createOrderAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        try {
          if (action.payload.msg === "Order Created") {
            state.orderBookdata.push(action.payload.orderBook);
          }

          if (action.payload.msg === "Order Appended") {
            const findIdx = state.orderBookdata.findIndex((data) => {
              return data.id === action.payload.orderBook.id;
            });
            // console.log("findIdx - ", findIdx);
            state.orderBookdata[findIdx].qty = action.payload.orderBook.qty;
          }
          state.userOrdersdata.unshift(action.payload.userOrders);
        } catch (error) {
          console.log("Error ", error.message);
        }
      })

      .addCase(createOrderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default orderSlice.reducer;
