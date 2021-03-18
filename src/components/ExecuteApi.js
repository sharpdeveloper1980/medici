import config from "../auth_config.json";
const  ExecuteApi= async (url,method,callBack='',data='',resp_type='')=>{
        const token = localStorage.getItem('token');
        if(method==='GET') {
            const response = await fetch(config.API_ORIGIN+url, {
                method: method,
                headers: {
                    'Accept': 'application/json;x-www-form-urlencoded; charset=UTF-8',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    Authorization: "Bearer " + token
                },
            });
            try{
                if(url.indexOf('/acs/') !== -1){
                    return await response;
                }
                else{
                const responseData = await response.json();
                return responseData;
                }
            } catch(error)
            {
                
                return {};
            }
            
        }
        else 
        {
           
            const response = await fetch(config.API_ORIGIN+url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                },
                body:JSON.stringify(data)
            });
            try{
                const responseData = await response.json();
                return responseData;
            } catch(error) {
                
                return [];
            }
        }
}
export default ExecuteApi;