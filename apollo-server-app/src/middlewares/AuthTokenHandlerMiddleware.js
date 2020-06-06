import jwt from 'jsonwebtoken';
import "regenerator-runtime/runtime";
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

//Refresh Token, Post Request
const requestRefreshToken =  async (token) => {
  const baseURL = process.env.API_SRM;
  const payload = { "refresh": token };
  return fetch(`${baseURL}refresh/`, {
        method: 'post',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json());
};

//Set Header response helper
export const setHeadersResponseMiddleware = (argument) => {
  const { context } = argument;
  const { refresh } = context;
  if(context.exp_status){
    argument.response.http.headers.set('x-token', refresh.access);
    argument.response.http.headers.set('x-refresh-token', refresh.refresh);
  }
  return true;
};

//Refresh middleware
export const RefreshTokenMiddleware = async (request) => {
  // Get the user token from the headers.
  const token = request.headers['x-token'] || '';
  const refreshToken = request.headers['x-refresh-token'] || '';
  const currentTime = new Date().getTime() / 1000;

  try {
    //Decode token
    const tokenDecode = jwt.decode(token);
    //Chek exp
    if (currentTime > tokenDecode.exp) {
      console.log("Token expired");
      /* refresh */
      const refresh = await requestRefreshToken(refreshToken);
      //Update request headers
      request.headers['x-token'] = refresh.access;
      request.headers['x-refresh-token'] = refresh.refresh;
      // Return refresh, then add to contex
      return { exp_status: true, refresh  };
    } else {
      console.log("Not expired ->  now: "+currentTime+" exp: "+tokenDecode.exp);
      return { exp_status: false };
    }
  } catch (e) {  /* if request doesn't have token headers */
    console.log(e);
    return { exp_status: false };
  }
};

export default RefreshTokenMiddleware;
