import React from "react";
import axios from "axios";
import consts from "../commons/constants";

import GoogleLogin from "react-google-login";

const login = props => {
  const responseGoogleSucess = response => {
    const { tokenId } = response;
    axios
      .post(`${consts.BASE_URL}/users/googleLogin`, { token: tokenId })
      .then(resp => {
        localStorage.setItem(consts.USER_KEY, JSON.stringify(resp.data));
      })
      .catch(e => {
        console.log(e);
      });
    //
  };

  const responseGoogleFailure = response => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="261371279843-puia2ushkcotak6dkpr8mdsk95kor4qd.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogleSucess}
      onFailure={responseGoogleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default login;
