import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Strap = new Mongo.Collection('strap');

if(Meteor.isServer){
    Meteor.publish('strappublish', function(){
        return Strap.find({});
    });

    Meteor.methods({
        'addNewStrap': function(strapName, strapPrice){
            var strapVal = Strap.insert({
                                strapName   : strapName,
                                strapPrice  : strapPrice,
                                baseType    : "strap",
                                createdAt   : new Date(),
                            });
            return strapVal;
        },
        'updateStrap': function(id, strapName, strapPrice){
            var strapVal = Strap.update(
                            {'_id':id},
                            {
                                $set: {
                                    strapName   : strapName,
                                    strapPrice  : strapPrice,
                                }
                            });

            return strapVal;
        },
        'deteteStrap': function(id){
            Strap.remove({'_id':id});
            return id;
        }
    });
}
