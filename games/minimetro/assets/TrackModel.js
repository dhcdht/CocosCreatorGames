import {StationModel} from 'StationModel'

/**
 * 铁轨模型
 */
export let TrackModel = cc.Class({
    name: 'TrackModel',

    properties: {
        /// 起始站点
        startStation: StationModel,
        /// 结束站点
        endStation: StationModel,
        /// 长度，单位可以按照米计算
        totalLength: 0,
    },
});
