import {TwoWayList, TwoWayListNode} from 'TwoWayList';
import {TrainModel} from 'TrainModel'
import {TrackModel} from 'TrackModel'

/**
 * 线路模型
 */
export let LineModel = cc.Class({
    name: 'LineModel',

    properties: {
        /// 站点和铁轨节点
        nodesList: TwoWayListNode,
        /// 当前线路中行驶的火车
        trainsList: [TrackModel],
    },

    pushStation: function (station) {
        let listNode = new TwoWayListNode();
        listNode.data = station;

        this.nodesList.pushBackNode(listNode);
    },
});
