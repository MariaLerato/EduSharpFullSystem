import React,{useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { Sidemenu } from "./sidemenu";

export const Home = () => {
  const navigate = useNavigate()
 

  return (
    <>
    <Sidemenu/>
    </>
  );
};
