import {Card} from "Card";

/**
 * 地图
 */
export let Map = cc.Class({
    name: 'Map',

    properties: {
        /// 卡片数组
        map: null,

        /// 渲染器
        layerController: null
    },

    /**
     * 初始化地图
     * @param size 地图大小
     */
    initMap: function (size) {
        this.map = new Array(size);
        for (let i = 0; i < size; i++) {
            this.map[i] = new Array(size);
        }
    },

    /**
     * 初始化地图完成
     */
    finishInitMap: function () {
        this.layerController.startRenderMap(this);
    },

    getTag: function (x, y) {
        let card = this.map[x][y];
        if (null === card) {
            return Map.nilValue;
        } else {
            return card.tag;
        }
    },

    setTag: function (x, y, tag) {
        let card = this.map[x][y];
        if (null === card) {
            card = this.generateCard(tag);
            this.map[x][y] = card;
        } else {
            return false
        }
    },

    getCard: function (x, y) {
        return this.map[x][y];
    },

    generateCard: function (tag) {
        let card = new Card();
        card.tag = tag;

        return card;
    },
});
/// 没有卡片时候的空值
Map.nilValue = 0;
