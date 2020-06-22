import * as Constants from '../network/Constants';
//import NetInfo from "@react-native-community/netinfo";
import CLStrings from "../res/CLStrings";

//construct the httprequest for different types
export const httpRequest = {
  get (url,body, callback) {
      const METHOD = 'get';
      return doHttpCall(url, METHOD, body, false, callback);
  }
};

//check if the device has internet connectivity
const checkNetwork = async() => {
  let connectionState = false

   await NetInfo.fetch().then(state => {
    if (state.isConnected) {
      connectionState = true
    }
  });

  return connectionState
}

//Make the rest call to the server
const doHttpCall = async(url, method, body, isAbsoluteURL, callback) => {
  const netStatusReceived =  await checkNetwork()

  const promise = new Promise((resolve, reject) => {
    if (!netStatusReceived) {
      alert("Check your internet connectivity")
      return false
    }
    let value = 1/0

          let NEW_URL = isAbsoluteURL ? url : (url)
          let options = {
              method : method
          };
           //check the method type and construct request body
          if ((method === 'post' || method === 'put') && body != null) {
              options.body = JSON.stringify(body)
          }
          //add headers the request
          options.headers = new Headers();
          options.headers.append('Content-Type', 'application/json; charset=utf-8');

        //async start
        (async () => {
          //parse the response
          fetch(NEW_URL, options)
          .then((response) => {
            if(response.status === 403) {
              console.log(`${"Error occurred  \nHTTP status " +response.status +" "+NEW_URL}`)
              alert('Please logout and login again. Your session time has expired');
            }

            if(response.status === 400) {
              console.log(`${"Error occurred  \nHTTP status " +response.status +" "+NEW_URL}`)
              alert('A unknown error has occurred. Please try again later.');
            }
            if (!response.ok) {
                console.log(`${"Error occurred  \nHTTP status " +response.status +" "+NEW_URL}`)
                alert("We are updating the system to better serve you. Kindly try after sometime. Thank you for your patience.");
            }

            return response.json();

        })
          .then((responseJson) => {
            if (responseJson.hasOwnProperty('statusCode')) {
              if (responseJson.statusCode === 401) {
                reject(CLStrings.SESSION_TIMEOUT)
              } else if (responseJson.statusCode === 403){
                reject(CLStrings.SERVICE_DENIED)
              } else if (responseJson.statusCode === 400){
                reject(responseJson.message)
              } else {
                resolve(responseJson);
              }
            } else {
              resolve(responseJson);
            }

          }).catch((message)=> {
            alert("We are updating the system to better serve you. Kindly try after sometime. Thank you for your patience.");
          });


      })()
      //async end
  });
  callback(promise);
}




