import {Card} from "Card";

/**
 * 地图
 */
export let Map = cc.Class({
    name: 'Map',

    properties: {
        /// 卡片数组
        cards: null,

        /// 渲染器
        layerController: null,
    },

    /**
     * 初始化地图
     * @param size 地图大小
     * @param tags 初始的 tags
     */
    initMap: function (width, height, tags=null) {
        this.cards = new Array(height);
        for (let i = 0; i < height; i++) {
            this.cards[i] = new Array(width);
        }

        if (tags) {
            for (let i = 0; i < tags.length; i++) {
                let row = tags[i];
                for (let j = 0; j < row.length; j++) {
                    this.cards[i][j] = tags[i][j];
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

    getWidth: function () {
        return this.cards[0].length;
    },

    getHeight: function () {
        return this.cards.length;
    },

    getTag: function (x, y) {
        let card = this.cards[x][y];
        if (!card) {
            return Map.nilValue;
        } else {
            return card.tag;
        }
    },

    setTag: function (x, y, tag) {
        let card = this.cards[x][y];
        if (!card) {
            card = this.generateCard(tag);
            this.cards[x][y] = card;
        } else {
            return false
        }
    },

    getCard: function (x, y) {
        return this.cards[x][y];
    },

    generateCard: function (tag) {
        let card = new Card();
        card.tag = tag;

        return card;
    },
});
/// 没有卡片时候的空值
Map.nilValue = 0;
