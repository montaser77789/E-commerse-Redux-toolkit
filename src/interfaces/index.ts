export interface Iproduct{
    id: number;
    qty:number;
    attributes:{
        id: number;
        qty:number;
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
    qty:number;
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






 

  

  

  

