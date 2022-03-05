const cartModel = require('../models/cart.model');
const{
    getErrorResponse,
    getResponseV1,
    getResponseV2
}=require('../helpers/helper');

const addToCart = (req, res) => {
    const user = req.user;
    const cartItem = req.body.cartItem;
    cartModel.findOne({
        user: user.id
    }).exec((error, cart) => {
        if (error){
            return getErrorResponse(res, 500, error);
        } 
        if (cart) {
            //Cart is already created.  To Update the existing cartItems 
            let item = cart.cartItems.find(c=>c.cloth==cartItem);
            if(item){
                const newQty = item.qty+1;
                cartModel.updateOne(
                    {
                        "user":user.id,
                        "cartItems.cloth":cartItem
                    },
                    {
                        $set:{
                            "cartItems.$.qty":newQty
                        }
                    },(err,cartres)=>{
                        if(err){
                            console.log(err);
                            return getErrorResponse(res, 500, error);
                        }
                        if(cartres){
                            return getResponseV2(res,true,200,"Cart updated successfully",cartres);
                        }
                    }
                )
            }
            else{
                const oldCartItems = cart.cartItems;
            const newCartItem = [...oldCartItems,{
                cloth:cartItem,
                qty:1
            }];
            cartModel.updateOne(
                {
                    user:user.id
                },
                {
                    $set:{
                        cartItems:newCartItem
                    }
                },(err,cartres)=>{
                    if(err){
                        console.log(err);
                        return getErrorResponse(res, 500, error);
                    }
                    if(cartres){
                        return getResponseV2(res,true,200,"Cart updated successfully",cartres);
                    }
                }
            )
            }  
        } 
        else {
            console.log("in else");
            const _cart = new cartModel({
                user: user.id,
                cartItems: [{
                    cloth:cartItem,
                    qty:1
                }]
            })

            _cart.save((error, cartData) => {

                if (error) return getErrorResponse(res, 500, error)

                if (cartData) {
                    return getResponseV1(res, 200, cartData)
                }
            })
        }

    })
}
const removeFromCart = (req,res)=>{
    const cartItem = req.body.cartItem;
    const user = req.user;
    cartModel.findOne({
        user: user.id
    }).exec((error, cart) => {
        if (error){
            return getErrorResponse(res, 500, error);
        } 
        if (cart) {
            //Cart is already created.  To Update the existing cartItems 
            const cartItems = cart.cartItems;
            let item = cartItems.find(c=>c.cloth==cartItem);
            if(item){
                const newQty = item.qty-1;
                if(newQty>=0){
                    cartModel.updateOne(
                        {
                            "user":user.id,
                            "cartItems.cloth":cartItem
                        },
                        {
                            $set:{
                                "cartItems.$.qty":newQty
                            }
                        },(err,cartres)=>{
                            if(err){
                                console.log(err);
                                return getErrorResponse(res, 500, error);
                            }
                            if(cartres){
                                return getResponseV2(res,true,200,"Cart updated successfully",cartres);
                            }
                        }
                    )
                }
                else{
                    const newCartItems=v=cartItems.filter((cartItem)=>cartItem!==item);
                    console.log('New cart',newCartItems);
                    cartModel.updateOne(
                        {
                            "user":user.id,
                        },
                        {
                            $set:{
                                "cartItems":newCartItems
                            }
                        },(err,cartres)=>{
                            if(err){
                                console.log(err);
                                return getErrorResponse(res, 500, error);
                            }
                            if(cartres){
                                return getResponseV2(res,true,200,"Cart updated successfully",cartres);
                            }
                        }
                    )
                }
            }
            else{
                console.log("Cannot find cloth to delete in cart");
                return getErrorResponse(res,500);
            }
        } 
        else {
            console.log("Cart not Found");
            return getErrorResponse(res, 500);
        }

    })

}

const getCart=async(req,res)=>{
    try {
        const cart = await cartModel.findOne({
            user: req.user.id
        }, '_id cartItems');
        return getResponseV1(res, 200, cart)

    } catch (error) {
        console.log(error);
        return getErrorResponse(res, 500, error);
    }

}
module.exports = {
    addToCart,
    removeFromCart,
    getCart
} 