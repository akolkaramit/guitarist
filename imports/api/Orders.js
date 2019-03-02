import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { UserCart } from '/imports/api/UserCart.js';
import { Guitar } from '/imports/api/Guitar.js';

export const Orders = new Mongo.Collection('orders');

if(Meteor.isServer){
    Meteor.publish('orderpublish', function(){
        return Orders.find({});
    });

    Meteor.publish('orderpublishusers', function(userId){
        return Orders.find({"userId" : userId});
    });

    Meteor.methods({
        'addNewOrder': function(cartItems, cartTotal, gstRate, estmateTotal, gstCharges){
            var userData = Meteor.user();
            var userId = userData._id;

            if(userData.profile && userData.profile.address && userData.profile.name){
                var userAddress = userData.profile.address + ', ' + userData.profile.city + ', ' + userData.profile.state + ', ' + userData.profile.zip;
                var userName = userData.profile.name;
            }else{
                var userAddress = '';
                var userName = '';
            }

            try {
                var cartData = UserCart.find({"userId":userId}).fetch();
                var guitarIds = [];
                for(var i=0; i<cartData.length; i++){
                    if(cartData[i].baseType == "guitar"){
                        guitarIds.push(cartData[i].productId);
                    }
                }

                var orderVal = Orders.insert({
                    userId          : userId,
                    userAddress     : userAddress,
                    userName        : userName,
                    cartItems       : cartItems,
                    cartTotal       : cartTotal,
                    gstRate         : gstRate,
                    estmateTotal    : estmateTotal,
                    gstCharges      : gstCharges,
                    orderProducts   : cartData,
                    status          : "In Process",
                    createdAt       : new Date(),
                });
                UserCart.remove({"userId":userId});
                Guitar.update(
                    {"_id": {$in:guitarIds}},
                    {$set: {"status" : "sold", "soldOn" : new Date()}},
                    {multi : true}
                );

                return true;
            } catch (error) {
                return false;
            }
        },
    });
}
