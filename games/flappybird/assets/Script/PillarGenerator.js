cc.Class({
    extends: cc.Component,

    properties: {
        pillarPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: "柱子障碍物的 Prefab",
        },

        scroreSpacePrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: "柱子障碍物中间的空隙 prefab",
        },

        scoreLabel: {
            default: null,
            type: cc.Label,
            tooltip: "显示分数的 label 组件",
        },

        score: {
            default: 0,
            visible: false,
            tooltip: "玩家分数",
        },

        pillarSapce: {
            default: 0,
            tooltip: "上下障碍物的中间空隙间距",
        },

        pillarMinHeight: {
            default: 0,
            tooltip: "上下预留给障碍物的最小高度",
        },

        pillarMoveSpeed: {
            default: 0,
            tooltip: "障碍物的移动速度",
        },

        pillarGenerateMargin: {
            default: 0,
            tooltip: "间隔多远生成一次障碍物",
        },

        pillars: {
            default: [],
            visible: false,
            tooltip: "记录所有障碍物的数组",
        },

        lastPillarGenerateMargin: {
            default: 0,
            visible: false,
            tooltip: "距离上一次生成障碍物间隔了多远了",
        },

        birdPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: "小鸟的 Prefab",
        },

        bird: {
            default: null,
            visible: false,
            tooltip: "运行时生成的，当前在画面中的鸟",
        },

        birdUpSpeed: {
            default: 0.0,
            tooltip: "点击屏幕时，鸟获得的上升速度",
        },

        birdSpeed: {
            default: 0.0,
            visible: false,
            tooltip: "鸟当前在 y 方向上的速度",
        },

        birdGravitationalAcceleration: {
            default: 0.0,
            tooltip: "鸟下降的重力加速度",
        },

        isCollided: {
            default: false,
            visible: false,
            tooltip: "是否发生了碰撞",
        },

        startLayer: {
            default: null,
            type: cc.Node,
            tooltip: "开始游戏视图",
        },
    },

    // use this for initialization
    onLoad: function () {
        this.setupEventListener();
        this.setupCollisionListener();
        this.setupStartLayer();
        this.setupBird();
        this.setupPillars();

        this.showStartLayer();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.isCollided) {
            return ;
        }

        // 本次更新移动的距离
        let dtSpace = dt * this.pillarMoveSpeed;

        // 移动各个障碍物
        for (let i = 0; i < this.pillars.length; i++) {
            let pillarArr = this.pillars[i];
            let upPillar = pillarArr[0];
            let downPillar = pillarArr[1];
            let scoreSpace = pillarArr[2];

            upPillar.x -= dtSpace;
            downPillar.x -= dtSpace;
            scoreSpace.x -= dtSpace;
        }

        // 记录距离上一次生成障碍物间隔了多远了
        this.lastPillarGenerateMargin += dtSpace;

        // 检查是否需要生成新的障碍物
        if (this.lastPillarGenerateMargin >= this.pillarGenerateMargin) {
            // TODO：这里会有误差的应该
            let x = this.node.width / 2 + this.pillars[0][0].width / 2;
            this.generateTwoPillar(x);
            this.lastPillarGenerateMargin = 0;
        }

        // 离开屏幕的障碍物的清理
        for (let i = 0; i < this.pillars.length; i++) {
            let pillarArr = this.pillars[i];
            let upPillar = pillarArr[0];
            let downPillar = pillarArr[1];
            let scoreSpace = pillarArr[2];

            let minX = -this.node.width / 2 - upPillar.width / 2;
            if (upPillar.x < minX) {
                this.pillars.shift();
                upPillar.removeFromParent();
                downPillar.removeFromParent();
                scoreSpace.removeFromParent();
            }
        }

        //鸟的当前速度
        let currentBirdSpeed = this.birdSpeed - this.birdGravitationalAcceleration * dt;
        this.birdSpeed = currentBirdSpeed;
        let birdUpHeight = dt * this.birdSpeed;
        this.bird.rotation = -20.0 * (currentBirdSpeed / this.birdUpSpeed);
        let birdY = this.bird.getPositionY() + birdUpHeight;
        this.bird.setPositionY(birdY);
    },

    /**
     * 创建开始游戏视图
     */
    setupStartLayer: function () {
        this.startLayer.removeFromParent();
    },

    /**
     * 切换显示开始游戏视图
     */
    showStartLayer: function () {
        this.isCollided = true;

        this.startLayer.removeFromParent();
        let root = this.node.parent;
        root.addChild(this.startLayer);
        this.startLayer.width = root.width;
        this.startLayer.height = root.height;
        this.startLayer.setPositionX(0);
        this.startLayer.setPositionY(0);
    },

    /**
     * 生成初始的障碍物
     */
    setupPillars: function () {
        let tmpPillar = cc.instantiate(this.pillarPrefab);
        // 最大可生成的位置
        let maxX = this.node.width / 2 + tmpPillar.width / 2;
        // 记录下最后一次生成位置的下一个位置
        this.generateTwoPillar(maxX);
        // 距离上一个生成位置已经间隔了多远
        this.lastPillarGenerateMargin = 0;
    },

    /**
     * 重新开始一局新游戏
     */
    restartGame: function () {
        // 移除各个障碍物
        for (let i = 0; i < this.pillars.length; i++) {
            let pillarArr = this.pillars[i];
            let upPillar = pillarArr[0];
            let downPillar = pillarArr[1];
            let scoreSpace = pillarArr[2];

            upPillar.removeFromParent();
            downPillar.removeFromParent();
            scoreSpace.removeFromParent();
        }
        this.pillars = [];

        // 移除鸟
        this.bird.removeFromParent();

        // 分数
        this.score = 0;
        this.scoreLabel.string = this.score.toString();

        // 重新初始化设置
        this.setupPillars();
        this.setupBird();

        this.startLayer.removeFromParent();

        // 重新开始游戏
        this.isCollided = false;
    },

    /**
     * 生成一对新的障碍物并自动加入到场景中
     * @param x 障碍物生成的水平位置
     */
    generateTwoPillar: function (x) {
        // 障碍物的宽度
        let width = cc.instantiate(this.pillarPrefab).width;

        // 障碍物间隙中心位置上下
        // 这里已经照顾到了上下障碍物都有个最小高度
        let effectHeight = this.node.height - this.pillarMinHeight * 2 - this.pillarSapce;
        let spaceCenterY = Math.random() * effectHeight - effectHeight / 2;

         // 上边障碍物的下边缘位置
        let upPillarDownY = spaceCenterY + this.pillarSapce / 2;
        // 上边障碍物的高度
        let upPillarHeight = this.node.height / 2 - upPillarDownY;
        // 上边障碍物的 Y
        let upY = upPillarDownY + upPillarHeight / 2;
        // 生成上边的障碍物
        let upPillar = this.generateAPillar(x, upY, width, upPillarHeight, 0);

        // 下边障碍物的上边缘位置
        let downPillarUpY = spaceCenterY - this.pillarSapce / 2;
        // 下边障碍物的高度
        let downPillarHeight = this.node.height / 2 + upPillarDownY;
        // 下边障碍物的 Y
        let downY = downPillarUpY - downPillarHeight / 2;
        // 设置下边障碍物的位置大小
        let downPillar = this.generateAPillar(x, downY, width, downPillarHeight, 180);

        // 中间空隙中添加一个 scoreSpace 用于计分
        let scoreSpace = cc.instantiate(this.scroreSpacePrefab);
        this.node.addChild(scoreSpace);
        scoreSpace.width = width;
        scoreSpace.height = upPillarDownY - downPillarUpY;
        scoreSpace.setPositionX(x);
        scoreSpace.setPositionY(downPillarUpY + scoreSpace.height / 2);
        let scoreSpaceCollider = scoreSpace.getComponent(cc.BoxCollider);
        scoreSpaceCollider.size.width = scoreSpace.width;
        scoreSpaceCollider.size.height = scoreSpace.height;
        scoreSpaceCollider.offset.x = 0;
        scoreSpaceCollider.offset.y = 0;

        // 放到障碍物数组中
        this.pillars.push([upPillar, downPillar, scoreSpace]);
    },

    /**
     * 生成一个新的障碍物并自动加入到场景中
     */
    generateAPillar: function (x, y, width, height, rotation) {
        // 生成障碍物实例
        let pillar = cc.instantiate(this.pillarPrefab);
        this.node.addChild(pillar);

        // 设置障碍物的旋转
        pillar.rotation = rotation;
        // 设置障碍物的位置大小
        pillar.width = width;
        pillar.height = height;
        pillar.setPositionX(x);
        pillar.setPositionY(y);
        // 设置碰撞体的位置大小
        let collider = pillar.getComponent(cc.BoxCollider);
        collider.size.width = pillar.width;
        collider.size.height = pillar.height;
        collider.offset.x = 0;
        collider.offset.y = 0;

        return pillar;
    },

    /**
     * 生成初始的小鸟
     */
    setupBird: function () {
        this.bird = cc.instantiate(this.birdPrefab);
        // 初始化位置(x始终不变)
        //x不变
        let x = -200;
        let y = 0;
        this.bird.setPositionX(x);
        this.bird.setPositionY(y);
        this.node.addChild(this.bird);

        this.birdSpeed = this.birdUpSpeed;
    },

    /**
     * 初始化系统事件监听
     */
    setupEventListener: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.startLayer.parent) {
                this.restartGame();

                return;
            }

            this.birdSpeed = this.birdUpSpeed;
            this.bird.rotation = -20;
        }, this);
    },

    /**
     * 初始化碰撞检测
     */
    setupCollisionListener: function () {
        this.node.on('collided', function (event) {
            let script = this.getComponent('PillarGenerator');
            script.isCollided = true;
            script.showStartLayer();
        });
        
        this.node.on('score', function (event) {
            let script = this.getComponent('PillarGenerator');
            script.score++;
            script.scoreLabel.string = script.score.toString();
        })
    },

});
