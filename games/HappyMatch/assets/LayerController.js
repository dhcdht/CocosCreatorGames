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

        /// 所有已经被渲染的卡片
        cards: null,
    },

    startRenderMap: function (map) {
        this.removeAllCard();

        this.cards = [];
        let size = map.getSize();
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                let card = cc.instantiate(this.prefabCard);
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

    layoutCardAtIndex: function (x, y) {
        let card = this.cards[x][y];

        if (card.parent === null) {
            this.cardContainerNode.addChild(card);
        }

        let width = card.width + 10;
        let height = card.height + 10;

        let baseX = (this.cards.length * width) / -2;
        let baseY = (this.cards[0].length * height) / -2;

        let pX = baseX + width * x;
        let pY = baseY + height * y;

        card.setPosition(pX, pY);
    }
});