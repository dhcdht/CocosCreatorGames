cc.Class({
    extends: cc.Component,

    statics: {
        cardinality: 2,
        order: 4,

        tileSize: {
            width: 130,
            height: 130
        },

        /**
         * 游戏主界面背景颜色
         * @returns {Color}
         */
        backgroundColor: function () {
            return cc.color(250, 248, 239, 255);
        },

        /**
         * 计分板背景颜色
         * @returns {Color}
         */
        scoreBoardColor: function () {
            return cc.color(187, 173, 160, 255);
        },

        /**
         * 计分板上提示文字的颜色
         * @returns {Color}
         */
        socreHintColor: function () {
            return cc.color(235, 231, 227, 255);
        },

        /**
         * 计分板上主显文字的颜色
         * @returns {Color}
         */
        socreLabelColor: function () {
            return cc.color(255, 255, 255, 255);
        },

        /**
         * 按钮颜色
         * @returns {Color}
         */
        buttonColor: function () {
            return cc.color(119, 110, 101, 255);
        },

        /**
         * 游戏卡片的各个分数对应的颜色
         * @param tag
         * @returns {Color}
         */
        colorForTag: function (tag) {
            var retColor = cc.color(255, 255, 255, 255);

            switch(tag) {
                case 0: {
                    retColor = cc.color(238, 228, 218, 255);
                }
                    break;
                case 1: {
                    retColor = cc.color(237, 224, 200, 255);
                }
                    break;
                case 2: {
                    retColor = cc.color(242, 177, 121, 255);
                }
                    break;
                case 3: {
                    retColor = cc.color(245, 149, 99, 255);
                }
                    break;
                case 4: {
                    retColor = cc.color(246, 124, 95, 255);
                }
                    break;
                case 5: {
                    retColor = cc.color(246, 94, 59, 255);
                }
                    break;
                case 6: {
                    retColor = cc.color(237, 207, 114, 255);
                }
                    break;
                case 7: {
                    retColor = cc.color(237, 204, 97, 255);
                }
                    break;
                case 8: {
                    retColor = cc.color(237, 200, 80, 255);
                }
                    break;
                case 9: {
                    retColor = cc.color(237, 197, 63, 255);
                }
                    break;
                case 10: {
                    retColor = cc.color(237, 194, 46, 255);
                }
                    break;
            }

            return retColor;
        },

        /**
         * 各个分数卡片文字对应的颜色
         * @param tag
         * @returns {Color}
         */
        textColorForTag: function (tag) {
            var retColor = cc.color(255, 255, 255, 255);

            switch(tag) {
                case 0:
                case 1: {
                    retColor = cc.color(118, 109, 100, 255);
                }
                    break;
            }

            return retColor;
        },

        getRowCount:function () {
            return this.order;
        },

        getColCount:function () {
            return this.order;
        }
        
    }
});
