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

        gameController: null,
    },

    onLoad: function () {
         this.cardContainerNode.on(cc.Node.EventType.TOUCH_END, function (e) {
             let pX = e.touch._point.x;
             let pY = e.touch._point.y;
             pX -= this.cardContainerNode.width / 2;
             pY -= this.cardContainerNode.height / 2;

             let width = this.cards[0][0].width + 10;
             let height = this.cards[0][0].height + 10;
             let baseRow = (this.cards.length * height) / -2;
             let baseCol = (this.cards[0].length * width) / -2;

             let col = Math.floor((pX - baseCol) / width);
             if (col < 0 || col >= this.cards[0].length) {
                 col = -1;
             }
             let row = Math.floor((pY - baseRow) / height);
             if (row < 0 || row >= this.cards.length) {
                 row = -1;
             }

             this.gameController.touchRowCol(row, col);
         }.bind(this), this);

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

        let baseRow = (this.cards.length * height) / -2 + height/2;
        let baseCol = (this.cards[0].length * width) / -2 + width/2;

        let pRow = baseRow + height * row;
        let pCol = baseCol + width * col;

        card.setPosition(pCol, pRow);
    }
});