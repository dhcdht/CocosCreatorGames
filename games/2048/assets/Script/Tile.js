cc.Class({
    extends: cc.Component,

    properties: {
        tag: 0,
        row: 0,
        col: 0,

        label: {
            default: null,
            type: cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.label.fontSize = 50;
        this.setTag(0);
    },

    //called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
    
    setTag:function(toTag) {
        this.tag = toTag;

        this.updateTag();
    },

    updateTag:function () {
        var Manager = require("Manager");
        var bgColor = Manager.colorForTag(this.tag);
        this.node.setColor(bgColor);

        var textColor = Manager.textColorForTag(this.tag);
        this.label.node.color = textColor;

        var num = Math.pow(Manager.cardinality, (this.tag + 1));
        this.label.string = num.toString();
    },
    
});
