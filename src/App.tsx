import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { createGlobalStyle } from "styled-components"
import Home from "./components/Home";
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import ProductDetail, { CartList } from "./components/ProductDetail";
import Cart from "./components/Cart/Cart";
import { CheckedList } from "./components/CartList/CartList";

const GlobalStyle = createGlobalStyle`
  #root {
}

* {
  margin: 0;
  padding: 0;
  font-family: Spoqa Han Sans Neo;
  box-sizing: border-box;
  font-style: normal;
  font-weight: normal;
}

a {
  text-decoration: none;
}

ul,
li {
  list-style: none;
}

button {
  cursor: pointer;
}

`;

interface InitialState {
  products: Product[],
  cartList: CartList[],
  checkedList: number[],
}

export interface Product {
  id: number;
  name: string;
  provider: string;
  price: number;
  image: string;
}

export interface State {
  openMarket: {
    products: Product[],
    cartList: CartList[],
    checkedList: number[],
  }
}

const initialState: InitialState = {
  products: [],
  cartList: [],
  checkedList: [],
}

const counterSlice = createSlice({
  name: 'openMarket',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setPriceProducts: (state, action: PayloadAction<string>) => {
      if (action.payload === 'row') {
        state.products = state.products.sort((a, b) => a.price - b.price);
      } else if (action.payload === 'high') {
        state.products = state.products.sort((a, b) => b.price - a.price);
      } else {
        state.products = state.products.sort((a, b) => a.id - b.id);
      }

    },
    setCartList: (state, action: PayloadAction<CartList>) => {
      const index = state.cartList.findIndex(carItem => carItem.id === action.payload.id);
      if (index > -1) {
        state.cartList[index].count += action.payload.count;
      } else {
        state.cartList.push(action.payload);
        state.checkedList.push(action.payload.id);
      }
    },
    setCheckedList: (state, action: PayloadAction<CheckedList>) => {
      if (action.payload.checked) {
        state.checkedList.push(action.payload.id);
      } else {
        const index = state.checkedList.findIndex(checked => checked === action.payload.id);
        state.checkedList.splice(index, 1);
      }
    },
    deleteCartListAndCheckedList: (state, action: PayloadAction<number>) => {
      state.cartList = state.cartList.filter(cartItem => cartItem.id !== action.payload);
      state.checkedList = state.checkedList.filter(checkedId => checkedId !== action.payload);
    },
    resetCheckedList: (state) => {
      state.checkedList = [];
    },
    fullCheckedList: (state) => {
      state.checkedList = state.cartList.map(carItem => carItem.id);
    }
  },
});

export const {
  setProducts,
  setCartList,
  setCheckedList,
  deleteCartListAndCheckedList,
  resetCheckedList,
  fullCheckedList,
  setPriceProducts } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    openMarket: counterSlice.reducer,
  },
});
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const result = await axios.get('/data/products.json');
      dispatch(setProducts(result.data));
    })();


  }, [])

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
