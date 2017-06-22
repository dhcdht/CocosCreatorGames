/**
 * Created by xieyajie on 16/06/2017.
 */
import {Map} from "Map";
import {LayerController} from "LayerController";

/*
 * 创建地图
 * */
let GameController = cc.Class({
    extends: cc.Component,
    name: 'GameController',

    properties: {
        map: Map,
    },

    onLoad: function () {
        this.initGame();
    },

    /*
     * 初始化游戏
     * */
    initGame: function () {
        this.map = new Map();
        let layerController = this.node.getComponent("LayerController");
        this.map.layerController = layerController;

        let width = 6;
        let height = 5;
        this.map.initMap(width, height);
        this.setupCards(width, height);
        this.finishInit();
    },

    finishInit: function () {
        this.map.finishInitMap();
    },

    setupCards: function (aWidth, aHeight) {
        var tmpArray = new Array();
        for (var i = 0; i < aHeight; i++) {
            for (var j = 0; j < aWidth; j++) {
                let tmpItem = new Array();
                tmpItem[0] = i;
                tmpItem[1] = j;
                tmpArray.push(tmpItem);
            }
        }

        //随机获取位置
        let maxTag = 5;
        var maxIndex = tmpArray.length - 1;
        let maxX = tmpArray.length / 2;
        for (var x = 0; x < maxX; x++) {
            let randomTag = Math.floor(Math.random() * maxTag) + 1;

            let firstIndex = Math.floor(Math.random() * maxIndex);
            var item = tmpArray[firstIndex];
            tmpArray.splice(firstIndex, 1);
            this.map.setTag(item[0], item[1], randomTag);

            maxIndex = tmpArray.length - 1;
            let secondIndex = Math.floor(Math.random() * maxIndex);
            item = tmpArray[secondIndex];
            tmpArray.splice(secondIndex, 1);
            this.map.setTag(item[0], item[1], randomTag);
        }
    },

});