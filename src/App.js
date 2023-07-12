import "./index.css";
import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
const initialstate = {
  questions: [],

  // "loading" , "error" , "ready" , "active" , "finished"
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };

    default:
      break;
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
