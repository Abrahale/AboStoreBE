import e from "express";
import { ObjectId } from "mongoose";
import { ICart } from "../models/cart";
import { ICartItem } from "../models/cartItem";
import { IProduct } from "../models/product";
import { cartRouter } from "../routes/cart";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export const getTotalItemsAndCount = (input:any):object =>{
    let total = 0;
    let totalItems = 0;
    input.forEach(el =>{
        console.log(el)
        if(el.active){
            totalItems += parseInt(el.qty)
            input.forEach(e =>{
                total += (parseInt(el.qty) * parseInt(e.product.price))
            })
        }
    })
    return {total,totalItems}
}

export const removeCartItem = (input:ICart,product:IProduct):{cart:ICart, status:boolean, message:string} => {
    let qtyD = 0;
    let priceD =0; 
    input.cartItem.forEach(el =>{
        if(el.product == product.id){
            qtyD = el.qty;
            priceD = qtyD * product.price
        }
    })
    input.total -= priceD;
    input.totalItems -= qtyD;
    input.cartItem = input.cartItem.filter(el => el.product != product.id);
    console.log(input)
    return {cart:input, status:true, message:""};
}

export const updateCartQty = (input:ICart,product:IProduct, inc:boolean):{cart:ICart, status:boolean, message:string} => {
    input.cartItem.forEach(el =>{
        if(el.product == product.id){
            if(inc){
                if(product.quantity > el.qty){
                    el.qty++;
                    el.t_amnt += product.price
                    input.total += product.price
                    input.totalItems++;
                }
                else return {cart:input, status:false, message:`We only have ${product.quantity} in stock`}
            }
            else{
                el.qty--;
                el.t_amnt -= product.price
                input.total -= product.price
                input.totalItems--;
            }
        }
    })
    return {cart:input, status:true, message:""};
}

export const updateCartitem = (input:ICartItem[],newCI:ICartItem, price:number):Array<ICartItem> => {
    let proExists = false;
    input.forEach(el =>{
        if(el.product == newCI.product){
            proExists = true;
            el.qty += newCI.qty;
            el.t_amnt += newCI.qty * price
        }
    })
    if(proExists){
        return input;
    }
    else {
       return [...input,newCI]
    }
}


export const listS3Files = async (s3, bucket, prefix = null) => {
    const params = {
        Bucket: bucket,
        Prefix: prefix,
        MaxKeys: 1000,
        ContinuationToken:null
    };
    let cycle = true;
    const keys = [];
    while (cycle) {
        const data = await s3.send(new ListObjectsV2Command(params));
        const { Contents, IsTruncated, NextContinuationToken } = data;
        if (Contents) {
            Contents.forEach((item) => {
                keys.push(item.Key);
            });
        }
        if (!IsTruncated || !NextContinuationToken) {
            cycle = false;
        }
        params.ContinuationToken = NextContinuationToken;
    }
    return keys;
  }