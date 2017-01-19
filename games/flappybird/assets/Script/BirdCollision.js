cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        if (other.node.group == "Pillar") {
            this.node.dispatchEvent( new cc.Event.EventCustom('collided', true) );
        }
    },

    onCollisionExit: function (other, self) {
        if (other.node.group == "ScoreSpace") {
            this.node.dispatchEvent( new cc.Event.EventCustom('score', true) );
        }
    },
});
