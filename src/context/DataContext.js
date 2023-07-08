import { createContext, useContext, useReducer } from "react";
import { cuisineData, restaurantsData } from "../data/data";

export const DataContext = createContext();

const initialState = {
  cuisineData: cuisineData,
  restaurantsData: restaurantsData,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_REVIEW":
      const updateRes = restaurantsData.map((res) =>
        res.id == action.payload.id
          ? { ...res, ratings: [...res.ratings, { ...action.payload.review }] }
          : res
      );
      console.log(updateRes);
      return {
        ...state,
        restaurantsData: updateRes,
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
