import type { ReactNode } from "react";
import Footer from "./Footer";
import Navber from "./Navber";

export interface IProps{
  children: ReactNode 
}


const CommonLaylout = ({children}:IProps) => {
  return (
    <div>
      <Navber/>
      {children}
      <Footer/>
    </div>
  );
};

export default CommonLaylout;