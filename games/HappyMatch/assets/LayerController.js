/**
 * Created by xieyajie on 16/06/2017.
 */

/*
 * 展示地图
 * */
cc.Class({
    extends: cc.Component,

    properties: {
        /// 卡片的父级节点
        cardContainerNode: cc.Node,

        /// 卡片原型
        prefabCard: cc.Prefab,

        // 卡片的图片
        cardTagTextureURLs: [cc.Texture2D],

        /// 所有已经被渲染的卡片
        cards: null,
    },

    onLoad: function () {

    },

    startRenderMap: function (map) {
        this.removeAllCard();

        this.cards = [];
        let width = map.getWidth();
        let height = map.getHeight();
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                let tag = map.getTag(i, j);
                let cardTextureURL = this.cardTagTextureURLs[tag - 1];
                let card = cc.instantiate(this.prefabCard);
                let frame = new cc.SpriteFrame(cardTextureURL);
                card.getComponent(cc.Sprite).spriteFrame = frame;
                row[j] = card;
            }
            this.cards[i] = row;
        }

        this.layoutAllCard();
    },

    removeAllCard: function () {
        for (let row in this.cards) {
            for (let card in row) {
                card.removeFromParent();
            }
        }

        this.cards = null
    },

    layoutAllCard: function () {
        for (let i = 0; i < this.cards.length; i++) {
            let row = this.cards[i];
            for (let j = 0; j < row.length; j++) {
                this.layoutCardAtIndex(i, j);
            }
        }
    },

    layoutCardAtIndex: function (row, col) {
        let card = this.cards[row][col];

        if (!card.parent) {
            this.cardContainerNode.addChild(card);
        }

        let width = card.width + 10;
        let height = card.height + 10;

        let baseRow = (this.cards.length * height) / -2;
        let baseCol = (this.cards[0].length * width) / -2;

        let pRow = baseRow + height * row;
        let pCol = baseCol + width * col;

        card.setPosition(pCol, pRow);
    }
});