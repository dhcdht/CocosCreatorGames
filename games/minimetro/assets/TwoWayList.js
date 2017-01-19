/**
 * 使用 import {TwoWayList, TwoWayListNode} from 'TwoWayList'; 引用本模块
 */

/**
 * 双向链表节点
 */
export let TwoWayListNode = cc.Class({
    name: 'TwoWayListNode',

    properties: {
        next: null,
        prev: null,
        data: null
    },
});

/**
 * 双向链表
 */
export let TwoWayList = cc.Class({
    name: 'TwoWayList',

    properties: {
        head: {
            default: null,
            type: TwoWayListNode,
        },
        tail: {
            default: null,
            type: TwoWayListNode,
        },
    },

    /**
     * 返回节点是否在列表中
     */
    isNodeInList: function (node) {
        if (null == node) {
            return null;
        }

        let curNode = this.head;
        while (curNode) {
            if (curNode == node) {
                return true;
            }

            curNode = curNode.next;
        }

        return false;
    },

    /**
     * 在末尾插入一个节点
     */
    pushBackNode: function (node) {
        if (this.isNodeInList(node)) {
            return node;
        }

        if (null == this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        return node;
    },

    /**
     * 在开头插入一个节点
     */
    pushHeadNode: function (node) {
        if (this.isNodeInList(node)) {
            return node;
        }

        if (null == this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }

        return node;
    },

    /**
     * 在 curNode 后边插入一个节点
     */
    insertNodeAfter: function (curNode, node) {
        if (!this.isNodeInList(curNode)) {
            return null;
        }
        if (this.isNodeInList(node)) {
            if (node.prev != curNode) {
                return null
            } else {
                return node;
            }
        }

        if (null == curNode) {
            return null;
        }

        let origNext = curNode.next;
        curNode.next = node;
        node.prev = curNode;
        node.next = origNext;
        if (origNext) {
            origNext.prev = node;
        } else {
            this.tail = node;
        }

        return node;
    },

    /**
     * 在 curNode 前边插入一个节点
     */
    insertNodeBefore: function (curNode, node) {
        if (!this.isNodeInList(curNode)) {
            return null;
        }
        if (this.isNodeInList(node)) {
            if (node.next != curNode) {
                return null
            } else {
                return node;
            }
        }

        if (null == curNode) {
            return null;
        }

        let origPrev = curNode.prev;
        curNode.prev = node;
        node.next = curNode;
        node.prev = origPrev;
        if (origPrev) {
            origPrev.next = node;
        } else {
            this.head = node;
        }

        return node;
    },

    /**
     * 去掉最末尾的节点
     */
    popBackNode: function () {
        let prevNode = this.tail.prev;
        if (prevNode) {
            prevNode.next = null;
        }
        if (this.tail) {
            this.tail.prev = null;
        }

        this.tail = prevNode;

        return tailNode;
    },

    /**
     * 去掉最开头的节点
     */
    popHeadNode: function () {
        let nextNode = this.head.next;
        if (nextNode) {
            nextNode.prev = null;
        }
        if (this.head) {
            this.head.next = null;
        }

        this.head = nextNode;

        return this.head;
    },

    /**
     * 去掉一个节点
     */
    removeNode: function (node) {
        if (!this.isNodeInList(node)) {
            return null;
        }

        let prevNode = node.prev;
        let nextNode = node.next;

        if (prevNode) {
            prevNode.next = nextNode;
        } else {
            this.head = nextNode;
        }
        if (nextNode) {
            nextNode.prev = prevNode;
        } else {
            this.tail = prevNode;
        }

        node.prev = null;
        node.next = null;

        return node;
    },

    /**
     * 替换 curNode 为 node
     */
    replaceNode: function (curNode, node) {
        if (!this.isNodeInList(curNode) || this.isNodeInList(node)) {
            return null;
        }

        let prevNode = curNode.prev;
        let nextNode = curNode.next;

        node.prev = prevNode;
        if (prevNode) {
            prevNode.next = node;
        } else {
            this.head = node;
        }

        node.next = nextNode;
        if (nextNode) {
            nextNode.prev = node;
        } else {
            this.tail = node;
        }

        curNode.prev = null;
        curNode.next = null;

        return node;
    },

    /**
     * 交换两个节点
     * 返回是否成功
     */
    exchangeNode: function (node1, node2) {
        if (!this.isNodeInList(node1) || !this.isNodeInList(node2)) {
            return false;
        }
        if (node1 == node2) {
            return false;
        }

        let nextNode = node1.next;
        let prevNode = node1.prev;

        this.removeNode(node1);
        this.replaceNode(node2, node1);

        if (nextNode) {
            this.insertNodeBefore(nextNode, node2);
        } else if (prevNode) {
            this.insertNodeAfter(prevNode, node1);
        } else {
            return false;
        }

        return true;
    },
});
