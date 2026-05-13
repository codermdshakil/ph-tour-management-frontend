import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {

  const location = useLocation();

  const [email] = useState(location.state);
  const navigate = useNavigate()


  console.log(location.state, "hit from varify");

  useEffect(() => {

    if(!email){
      navigate("/")
    }

  }, [email, navigate])


  return (
    <div className="container mx-auto px-4 py-16">
      <h1>Verify Component</h1>
    </div>
  );
};

export default Verify;