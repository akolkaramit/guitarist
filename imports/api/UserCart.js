import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const UserCart = new Mongo.Collection('usercart');

if(Meteor.isServer){
    Meteor.publish('cartpublish', function(){
        return UserCart.find({});
    });

    Meteor.methods({
        'addToCart': function(cartData){
            var userId = Meteor.userId();
            var data = UserCart.findOne({"userId":userId, "productId":cartData._id});
            if(data){
                return 'old';
            }else{
                var cartVal = UserCart.insert({
                    userId                  : userId,
                    productId               : cartData._id,
                    guitarName              : cartData.guitarName,
                    guitarBrand             : cartData.guitarBrand,
                    guitarSerialNumber      : cartData.guitarSerialNumber,
                    guitarType              : cartData.guitarType,
                    guitarNoOfStrings       : cartData.guitarNoOfStrings,
                    price                   : cartData.guitarPrice,
                    baseType                : cartData.baseType,
                    createdAt               : new Date(),
                });
                return cartVal;
            }
        },
        'addToCartAccessory': function(cartData){
            var userId = Meteor.userId();
            var cartVal = UserCart.insert({
                userId                  : userId,
                productId               : cartData._id,
                accessoryName           : cartData.accessoryName,
                accessoryType           : cartData.accessoryType,
                price                   : cartData.accessoryPrice,
                baseType                : cartData.baseType,
                createdAt               : new Date(),
            });
            return cartVal;
        },
        'addToCartSrap': function(cartData, strapSize){
            var userId = Meteor.userId();
            var cartVal = UserCart.insert({
                userId                  : userId,
                productId               : cartData._id,
                strapName               : cartData.strapName,
                strapSize               : strapSize,
                price                   : cartData.strapPrice,
                baseType                : cartData.baseType,
                createdAt               : new Date(),
            });
            return cartVal;
        },
        'deteteCart': function(id){
            UserCart.remove({'_id':id});
            return id;
        }
    });
}
