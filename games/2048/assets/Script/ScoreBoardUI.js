cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        boardBackground: cc.Sprite,
        boardHint: cc.Label,
        boardLabel: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        let Manager = require("Manager");

        this.boardBackground.node.color = Manager.scoreBoardColor();
        this.boardHint.node.color = Manager.socreHintColor();
        this.boardLabel.node.color = Manager.socreLabelColor();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
