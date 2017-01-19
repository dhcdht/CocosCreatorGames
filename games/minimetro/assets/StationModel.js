import {PassengerModel} from 'PassengerModel'

/**
 * 站点模型
 */
export let StationModel = cc.Class({
    name: 'StationModel',

    properties: {
        stationType: "",
        passengers: [PassengerModel],
    },
});
