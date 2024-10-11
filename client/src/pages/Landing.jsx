import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";

import { Link } from "react-router-dom";
import { Logo } from "../components";
import { useEffect } from "react";
function Landing() {
  // console.log("123")
  // useEffect(()=>{
  //   console.log("123")
  //   fetch("http://localhost:5100/api/v1/jobs")
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // },[])
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            I'm baby banh mi woke lumbersexual, poutine shabby chic blue bottle
            chartreuse 8-bit butcher godard bruh 90's edison bulb. Succulents
            biodiesel celiac solarpunk bespoke, selvage hashtag 90's raw denim
            synth readymade poutine. Salvia four loko +1 vibecession vaporware.
            Post-ironic gluten-free green juice slow-carb iceland. Aesthetic
            truffaut DIY, tonx marxism crucifix authentic hella. Jean shorts
            retro snackwave, iPhone banjo bodega boys direct trade DSA poke.
          </p>
          <Link to={"/register"} className="btn register-link">
            Register
          </Link>
          <Link to={"/login"} className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
