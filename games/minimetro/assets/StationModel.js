import {PassengerModel} from 'PassengerModel'

/**
 * 站点模型
 */
export let StationModel = cc.Class({
    name: 'StationModel',

    properties: {
        /// 站点类型
        stationType: "",
        /// 站点中的乘客
        passengers: [PassengerModel],
    },
});
