class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (!this.left) {
            node.parent = this;
            this.left = node;
        } else if (!this.right) {
            node.parent = this;
            this.right = node;
        }
    }

    removeChild(node) {
        if (this.left === node) {
            node.parent = null;
            this.left = null;
        } else if (this.right === node) {
            node.parent = null;
            this.right = null;
        } else {
            throw new Error('Node doesn\'t belong to this parent');
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
    }

    swapWithParent() {
        const nodeToSwitch = this.parent;
        if (!nodeToSwitch) {
            return;
        }
        this.remove();

        const newParent = nodeToSwitch.parent;
        if (newParent) {
            nodeToSwitch.remove();
            newParent.appendChild(this);
        }

        const isFirst = nodeToSwitch.right;
        const bro = nodeToSwitch.left || nodeToSwitch.right;
        if (bro) {
            bro.remove();
        }

        const leftChild = this.left;
        if (leftChild) {
            leftChild.remove();
            nodeToSwitch.appendChild(leftChild);
        }

        const rightChild = this.right;
        if (rightChild) {
            rightChild.remove();
            nodeToSwitch.appendChild(rightChild);
        }

        if (!isFirst && bro) {
            this.appendChild(bro);
        }
        this.appendChild(nodeToSwitch);
        if (isFirst && bro) {
            this.appendChild(bro);
        }
    }
}

module.exports = Node;
