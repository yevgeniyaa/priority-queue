const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    push(data, priority) {
        const node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }

        const rootData = this.root.data;
        const detachedRoot = this.detachRoot();
        if (!this.isEmpty()) {
            this.restoreRootFromLastInsertedNode(detachedRoot);
            this.shiftNodeDown(this.root);
        }
        return rootData;
    }

    detachRoot() {
        const detachedRoot = this.root;
        this.parentNodes = this.parentNodes.filter(parentNode => parentNode !== detachedRoot);
        this.root = null;
        this.heapSize--;
        return detachedRoot;
    }

    restoreRootFromLastInsertedNode(detached) {
        const lastInsertedNode = this.parentNodes.pop();

        const parent = lastInsertedNode.parent;
        if (parent !== detached && this.parentNodes.indexOf(parent) === -1) {
            this.parentNodes.unshift(parent);
        }
        lastInsertedNode.remove();

        this.root = lastInsertedNode;
        if (detached.left) {
            this.root.appendChild(detached.left);
        }
        if (detached.right) {
            this.root.appendChild(detached.right);
        }
        if (!this.root.left || !this.root.right) {
            this.parentNodes.unshift(lastInsertedNode);
        }
    }

    size() {
        return this.heapSize;
    }

    isEmpty() {
        return this.heapSize === 0;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    insertNode(node) {
        this.parentNodes.push(node);
        if (this.isEmpty()) {
            this.root = node;
        } else {
            this.parentNodes[0].appendChild(node);
            if (this.parentNodes[0].right) {
                this.parentNodes.shift();
            }
        }
        this.heapSize++;
    }

    shiftNodeUp(node) {
        if (node.parent) {
            if (node.parent.priority < node.priority) {
                const i = this.parentNodes.indexOf(node);
                const j = this.parentNodes.indexOf(node.parent);
                if (i !== -1) {
                    this.parentNodes[i] = node.parent;
                }
                if (j !== -1) {
                    this.parentNodes[j] = node;
                }

                node.swapWithParent();
                this.shiftNodeUp(node);
            }
        } else {
            this.root = node;
        }

    }

    shiftNodeDown(node) {
        const leftChild = node.left;
        const rightChild = node.right;

        if (node.priority < (leftChild && leftChild.priority) || node.priority < (rightChild && rightChild.priority)) {
            let childToSwap;
            if ((leftChild && leftChild.priority) >= (rightChild && rightChild.priority)) {
                childToSwap = leftChild;
            } else if ((rightChild && rightChild.priority) >= (leftChild && leftChild.priority)) {
                childToSwap = rightChild;
            }
            if (childToSwap) {
                childToSwap.swapWithParent();

                if (!childToSwap.parent) {
                    this.root = childToSwap;
                }

                const i = this.parentNodes.indexOf(node);
                const j = this.parentNodes.indexOf(childToSwap);
                if (i !== -1) {
                    this.parentNodes[i] = childToSwap;
                }
                if (j !== -1) {
                    this.parentNodes[j] = node;
                }

                this.shiftNodeDown(node);
            }
        }

    }
}

module.exports = MaxHeap;
