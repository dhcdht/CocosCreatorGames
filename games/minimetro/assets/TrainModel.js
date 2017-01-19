import {PassengerModel} from 'PassengerModel'

/**
 * 火车模型
 */
export let TrainModel = cc.Class({
    name: 'TrainModel',

    properties: {
        passengers: [PassengerModel],
    },
});
