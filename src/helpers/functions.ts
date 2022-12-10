import { ICartItem } from "../models/cartItem";

export const getTotalItemsAndCount = (input:any):object =>{
    let total = 0;
    let totalItems = 0;
    input.forEach(el =>{
        totalItems += parseInt(el.qty)
        input.forEach(e =>{
            total += (parseInt(el.qty) * parseInt(e.product.price))
        })
    })
    return {total,totalItems}
}