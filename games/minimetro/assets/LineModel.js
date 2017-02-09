import {TrainModel} from 'TrainModel'
import {TrackModel} from 'TrackModel'
import {StationModel} from 'StationModel'

/**
 * 线路模型
 */
export let LineModel = cc.Class({
    name: 'LineModel',

    properties: {
        /// 站点和铁轨节点
        nodesList: [],
        /// 当前线路中行驶的火车
        trainsList: [TrackModel],
    },

    /**
     * 构造函数
     */
    ctor: function () {
    },

    /**
     * 向线路末尾添加一个站点
     * @return 返回连接到这个站点的铁轨模型
     */
    pushStation: function (station, trackLength) {
        // 当前线路上没有东西时，生成 node 添加到末尾即可
        if (this.nodesList.length == 0) {
            this.nodesList.push(station);

            return null;
        }
        // 线路上的最后一个车站
        let tailStation = this.nodesList[this.nodesList.length-1];

        // 生成连接下一个站的铁轨
        let trackModel = new TrackModel();
        trackModel.startStation = tailStation;
        trackModel.endStation = station;
        trackModel.totalLength = trackLength;
        this.nodesList.push(trackModel);

        // 连接下一个车站
        this.nodesList.push(station);

        return trackModel;
    },

    /**
     * 在 curStation 后插入 station，插入后，station 前边的铁轨长度为 prevTrackLength，后边的铁轨长度为 nextTrackLength
     */
    insertStationAfterStation: function (curStation, station, prevTrackLength, nextTrackLength) {
        // 要插入的位置
        let curIndex = this.nodesList.indexOf(curStation);
        // 准备插入的元素
        let insertNodes = [];

        // 插入 station 后，station 前一段铁轨
        let prevTrackModel = new TrackModel();
        prevTrackModel.startStation = curStation;
        prevTrackModel.endStation = station;
        prevTrackModel.totalLength = prevTrackLength;
        insertNodes.push(prevTrackModel);

        insertNodes.push(station);

        // 插入位置后边还有元素的话
        if (this.nodesList.length > curIndex + 2) {
            let nextStation = this.nodesList[curIndex + 2];

            // 插入 station 后，station 后一段铁轨
            let nextTrackModel = new TrackModel();
            nextTrackModel.startStation = station;
            nextTrackModel.endStation = nextStation;
            nextTrackModel.totalLength = nextTrackLength;
            insertNodes.push(nextTrackModel);
        }

        this.nodesList.splice(curIndex + 1, 1);
        for (let i = 0; i < insertNodes.length; i++) {
            this.nodesList.splice(curIndex + 1 + i, 0, insertNodes[i]);
        }

        return insertNodes;
    },

    /**
     * 在 curStation 前插入 station，插入后，station 前边的铁轨长度为 prevTrackLength，后边的铁轨长度为 nextTrackLength
     */
    insertStationBeforeStation: function (curStation, station, prevTrackLength, nextTrackLength) {
        // 要插入的位置
        let curIndex = this.nodesList.indexOf(curStation);
        // 准备插入的元素
        let insertNodes = [];

        // 插入位置前边还有元素的话
        if (curIndex >= 2) {
            let prevStation = this.nodesList[curIndex - 2];

            // 插入 station 后，station 前一段铁轨
            let prevTrackModel = new TrackModel();
            prevTrackModel.startStation = prevStation;
            prevTrackModel.endStation = station;
            prevTrackModel.totalLength = prevTrackLength;
            insertNodes.push(prevTrackModel);
        }

        insertNodes.push(station);

        // 插入 station 后，station 后一段铁轨
        let nextTrackModel = new TrackModel();
        nextTrackModel.startStation = station;
        nextTrackModel.endStation = curStation;
        nextTrackModel.totalLength = nextTrackLength;
        insertNodes.push(nextTrackModel);

        let insertIndex = curIndex - 1;
        if (insertIndex >= 1) {
            this.nodesList.splice(insertIndex, 1);
        } else {
            insertIndex = 0;
        }
        for (let i = 0; i < insertNodes.length; i++) {
            this.nodesList.splice(insertIndex+i, 0, insertNodes[i]);
        }

        return insertNodes;
    },
});
