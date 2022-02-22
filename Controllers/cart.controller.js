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

module.exports = {
    addToCart
} 