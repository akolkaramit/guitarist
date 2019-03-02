import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/Accessory.js';
import '/imports/api/Guitar.js';
import '/imports/api/Strap.js';
import '/imports/api/UserCart.js';
import '/imports/api/Orders.js';


import { Guitar } from '/imports/api/Guitar.js';
import { Accessory } from '/imports/api/Accessory.js';
import { Strap } from '/imports/api/Strap.js';
import { Orders } from '/imports/api/Orders.js';


Meteor.startup(() => {
  
});

Meteor.methods({
    addGuitarUserRole(){
        var userId = Meteor.userId();
        Roles.addUsersToRoles(userId, 'user');
        return true;
    },
    adminDashboardData(){
        var userCount       = Meteor.users.find({}).count();
        var accessoryData   = Accessory.find({}).fetch() || [];
        var guitarData      = Guitar.find({}).fetch() || [];
        var strapData      = Strap.find({}).fetch() || [];
        var ordersData      = Orders.find({}).fetch() || [];

        var totalBuyings = 0;
        var totalSell = 0;
        for(var i=0; i<accessoryData.length; i++){
            totalBuyings = totalBuyings + parseInt(accessoryData[i].accessoryPrice);
        }
        for(var i=0; i<guitarData.length; i++){
            totalBuyings = totalBuyings + parseInt(guitarData[i].guitarPrice);
        }
        for(var i=0; i<strapData.length; i++){
            totalBuyings = totalBuyings + parseInt(strapData[i].strapPrice);
        }
        for(var i=0; i<ordersData.length; i++){
            totalSell = totalSell + parseInt(ordersData[i].estmateTotal);
        }
        var dashObj = {
            'userCount'         : userCount,
            'totalBuyings'      : totalBuyings,
            'totalSell'         : totalSell,
            'accessoryCount'    : accessoryData.length,
            'guitarCount'       : guitarData.length,
            'strapCount'        : strapData.length,
            'ordersCount'       : ordersData.length,
        }
        return dashObj;
    }
})
