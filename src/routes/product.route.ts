import products,{ IProduct } from '../models/product.model';

export const getProductList = async (req:any, res:any) => {
    products.find((err: any, result: any) => {
        if (err) {
          res.send("Error!");
        } else {
        console.log(JSON.stringify(result))
          res.send(result);
        }
      });
  };

  export const createProduct = async (req:any, res:any) => {
    const request: IProduct = req.body;
    console.log(JSON.stringify(request))
    let prod = new products(request);
    prod.save((err:any, result:any) => {
        if (err) {
            res.send("Error!");
          } else {
          console.log(JSON.stringify(result))
            res.send(result);
          }
    });
  };

export const updateProduct = async (req:any, res:any) => {
    const product: IProduct = req.body;
    //Update
    res.send("for now show updated, till it's implemented")
  };
  
  export const deleteProduct = async (req:any, res:any) => {
    const productID: number = req.body['id'];
    //delete
    res.send("for now show deleted, till it's implemented")
  };