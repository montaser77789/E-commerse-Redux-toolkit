import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axioInstance from "../Config/axiosInstance";
 interface IUseAuthenticatedQuery {
    queryKey:string[],
    url:string,
    config?: AxiosRequestConfig,
 }

const UseAuthenticatedQuery =(   {queryKey,url,config}:IUseAuthenticatedQuery)=>{
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axioInstance.get(url,config);
      return data;
    },
  })
};

export default UseAuthenticatedQuery;