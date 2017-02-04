import {PassengerModel} from 'PassengerModel'
import {TrackModel} from 'TrackModel'

/**
 * 火车模型
 */
export let TrainModel = cc.Class({
    name: 'TrainModel',

    properties: {
        /// 车上的乘客
        passengers: [PassengerModel],
        /// 是否是反向行进
        isBackforward: false,
        /// 火车所在的铁轨
        track: TrackModel,
    },
});
