export interface Iproduct{
    id: number;
    attributes:{
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail:{
        data:{
            id: number,
            attributes:{
                url:string
            }
        }
    }
    }
}
export interface Iattributes{
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail:{
        data:{
            id: number,
            attributes:{
                url:string
            }
        }
    }
}






 

  

  

  

