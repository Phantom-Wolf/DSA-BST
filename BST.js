class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.root = null;
  }

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
      this.root = key;
    } else if (key < this.key) {
      /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
      /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
        this.left.insert(key, value);
      }
    } else {
      /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error("Key Error");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        /* If the node only has a left child, 
               then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
               then you replace it with its right child */
        this._replaceWith(this.right);
      } else {
        /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

 
}

const BST = new BinarySearchTree();
BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);
// console.log(BST);

const BST2 = new BinarySearchTree();
BST2.insert("E");
BST2.insert("A");
BST2.insert("S");
BST2.insert("Y");
BST2.insert("Q");
BST2.insert("U");
BST2.insert("E");
BST2.insert("S");
BST2.insert("T");
BST2.insert("I");
BST2.insert("O");
BST2.insert("N");
// console.log(BST2);

// ***** What does the following program do? *****

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

// a recursive function that sums all the values in a tree. 0(n) runtime.

// ***** Height of a BST *****

// Write an algorithm to find the height of a binary search tree

function findBSTHeight(tree) {
  if (tree === null) {
    return -1;
  }

  let left = findBSTHeight(tree.left);
  let right = findBSTHeight(tree.right);

  if (left > right) {
    return left + 1;
  } else {
    return right + 1;
  }
}

// ***** is it a BST? ****

// write an algorithm that checks whether a binary tree is a binary search tree

function isBST(tree) {
  if (tree === null) {
    return true;
  }

  if (tree.left && tree.left.key > tree.key) {
    return false;
  }

  if (tree.right && tree.right.key < tree.key) {
    return false;
  }

  return left && right;
}

// ***** Balanced BST ******

// Write an algorithm that checks if a BST is balanced

function isBalanced(tree) {
  if (tree === null) {
    return true;
  }

  if (tree.left && (tree.left.left || tree.left.right) && !tree.right) {
    return false;
  }
  if (tree.right && (tree.right.left || tree.right.right) && !tree.left) {
    return false;
  }

  let left = isBalanced(tree.left);
  let right = isBalanced(tree.right);

  return left && right;
}


const newBST = new BinarySearchTree();
newBST.insert(3);
newBST.insert(1);
newBST.insert(4);
newBST.insert(6);
newBST.insert(9);
newBST.insert(2);
newBST.insert(5);
newBST.insert(7);

isBalanced(newBST);
