// API NOTIFICATION MESSAGE
export const  API_NOTIFICATION_MESSAGE ={
 loding:{
    title:"Loging...",
    message:"Data being loded, please wait..."
 },
 success:{
    title:"success",
    message:"Data Successfully loded"
 },
 responseFailure:{
    title:"Error",
    message:"An error occured while fetching response from the server. please try again." 
 },
 requestFailure:{
    title:"Error",
    message:"An error occured while parsing request Data"
 },
 networkError:{
    title:"Error",
    message:"Unable to connect with the server. Please check internet connectivity and try again later."
 }
}


//API SERVICES CALL
//SAMPLE REQUEST
//MEED SERVICES CALL : {url: "/" , method: 'POST/GET/PUT/DELETE' params: true/false. query: true/false}

export const SERVICE_URLS = {
userSignup:{url:'/signup', method:'post'}
}