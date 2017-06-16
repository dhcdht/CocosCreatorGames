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
     * @param tags 初始的 tags
     */
    initMap: function (size, tags) {
        this.map = new Array(size);
        for (let i = 0; i < size; i++) {
            this.map[i] = new Array(size);
        }

        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                let row = tags[i];
                for (let j = 0; j < row.length; j++) {
                    this.map[i][j] = tags[i][j];
                }
            }
        }
    },

    /**
     * 初始化地图完成
     */
    finishInitMap: function () {
        this.layerController.startRenderMap(this);
    },

    getSize: function () {
        return this.map.length;
    },

    getTag: function (x, y) {
        let card = this.map[x][y];
        if (!card) {
            return Map.nilValue;
        } else {
            return card.tag;
        }
    },

    setTag: function (x, y, tag) {
        let card = this.map[x][y];
        if (!card) {
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
