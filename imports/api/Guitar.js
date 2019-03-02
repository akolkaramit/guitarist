import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Guitar = new Mongo.Collection('guitar');

if(Meteor.isServer){
    Meteor.publish('guitarpublish', function(){
        return Guitar.find({});
    });
    Meteor.publish('guitarpublishUnique', function(id){
        return Guitar.find({"_id":id});
    });
    
    Meteor.methods({
        'addNewGuitar': function(guitarName, guitarBrand, guitarSerialNumber, guitarType, guitarNoOfStrings, guitarPrice, guitarInformation){
            var guitarVal = Guitar.insert({
                                guitarName          : guitarName,
                                guitarBrand         : guitarBrand,
                                guitarSerialNumber  : guitarSerialNumber,
                                guitarType          : guitarType,
                                guitarNoOfStrings   : guitarNoOfStrings,
                                guitarPrice         : guitarPrice,
                                guitarInformation   : guitarInformation,
                                baseType            : "guitar",
                                status              : "unsold",
                                createdAt           : new Date(),
                            });
            return guitarVal;
        },
        'updateGuitar': function(id, guitarName, guitarBrand, guitarSerialNumber, guitarType, guitarNoOfStrings, guitarPrice, guitarInformation){
            var guitarVal = Guitar.update(
                            {'_id':id},
                            {
                                $set: {
                                    guitarName          : guitarName,
                                    guitarBrand         : guitarBrand,
                                    guitarSerialNumber  : guitarSerialNumber,
                                    guitarType          : guitarType,
                                    guitarNoOfStrings   : guitarNoOfStrings,
                                    guitarPrice         : guitarPrice,
                                    guitarInformation   : guitarInformation,
                                }
                            });

            return guitarVal;
        },
        'deteteGuitar': function(id){
            Guitar.remove({'_id':id});
            return id;
        }
    });
}
