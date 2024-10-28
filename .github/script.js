var _this = this;
//Clase Nodo para el árbol RBT
var NodeRBT = /** @class */ (function () {
    function NodeRBT(data, isLeaf) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }
    NodeRBT.prototype.getData = function () {
        return this.data;
    };
    NodeRBT.prototype.setFather = function (newFather) {
        this.father = newFather;
    };
    NodeRBT.prototype.getFather = function () {
        return this.father;
    };
    NodeRBT.prototype.setLeftChild = function (newChild) {
        this.leftChild = newChild;
    };
    NodeRBT.prototype.getLeftChild = function () {
        return this.leftChild;
    };
    NodeRBT.prototype.setRightChild = function (newChild) {
        this.rightChild = newChild;
    };
    NodeRBT.prototype.getRightChild = function () {
        return this.rightChild;
    };
    NodeRBT.prototype.setNodeAsRed = function () {
        this.color = "RED";
    };
    NodeRBT.prototype.setNodeAsBlack = function () {
        this.color = "BLACK";
    };
    NodeRBT.prototype.setColor = function (color) {
        this.color = color;
    };
    NodeRBT.prototype.getColor = function () {
        return this.color;
    };
    return NodeRBT;
}());
var RBTree = /** @class */ (function () {
    function RBTree() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.list = new Array();
    }
    RBTree.prototype.getRoot = function () {
        return this.root;
    };
    RBTree.prototype.fixInsert = function (testNode) {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                var uncle = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                }
                else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            }
            else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                var uncle = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                }
                else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    };
    RBTree.prototype.leftRotate = function (x) {
        var y = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    };
    RBTree.prototype.rightRotate = function (x) {
        var y = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    };
    RBTree.prototype.searchNode = function (node, value) {
        // Caso base: si llegamos a una hoja (leaf) o encontramos el valor
        if (node === this.leaf || value === node.getData()) {
            return node;
        }
        // Si el valor que estamos buscando es menor al valor actual, buscamos en el hijo izquierdo
        if (value < node.getData()) {
            return this.searchNode(node.getLeftChild(), value);
        }
        // Si el valor es mayor, buscamos en el hijo derecho
        return this.searchNode(node.getRightChild(), value);
    };
    RBTree.prototype.inhorden = function (nodo) {
        var n = "";
        if (nodo.getLeftChild() !== this.leaf)
            this.inhorden(nodo.getLeftChild());
        n += (nodo.getData() + "(" + nodo.getColor() + ") ");
        if ((nodo === null || nodo === void 0 ? void 0 : nodo.getRightChild()) !== this.leaf)
            this.inhorden(nodo.getRightChild());
        return n;
    };
    RBTree.prototype.postorden = function (nodo) {
        if (nodo.getLeftChild() !== this.leaf)
            this.postorden(nodo.getLeftChild());
        if ((nodo === null || nodo === void 0 ? void 0 : nodo.getRightChild()) !== this.leaf)
            this.postorden(nodo.getRightChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
    };
    RBTree.prototype.preorden = function (nodo) {
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo.getLeftChild() !== this.leaf)
            this.preorden(nodo.getLeftChild());
        if ((nodo === null || nodo === void 0 ? void 0 : nodo.getRightChild()) !== this.leaf)
            this.preorden(nodo.getRightChild());
    };
    RBTree.prototype.printInhorden = function (lugar) {
        var n = this.inhorden(this.root);
        lugar.textContent = "HOLA";
    };
    RBTree.prototype.printPostorden = function () {
        this.postorden(this.root);
    };
    RBTree.prototype.printPreorden = function () {
        this.preorden(this.root);
    };
    RBTree.prototype.deleteNode = function (value) {
        var nodeToDelete = this.searchNode(this.root, value);
        if (nodeToDelete === this.leaf) {
            return; // No se encontró el nodo
        }
        this.deleteHelper(nodeToDelete);
    };
    RBTree.prototype.deleteHelper = function (node) {
        var y = node;
        var originalColor = y.getColor();
        var x;
        if (node.getLeftChild() === this.leaf) {
            x = node.getRightChild();
            this.transplant(node, node.getRightChild());
        }
        else if (node.getRightChild() === this.leaf) {
            x = node.getLeftChild();
            this.transplant(node, node.getLeftChild());
        }
        else {
            y = this.minimum(node.getRightChild());
            originalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === node) {
                x.setFather(y);
            }
            else {
                this.transplant(y, y.getRightChild());
                y.setRightChild(node.getRightChild());
                y.getRightChild().setFather(y);
            }
            this.transplant(node, y);
            y.setLeftChild(node.getLeftChild());
            y.getLeftChild().setFather(y);
            y.setNodeAsRed(); // Se copia el color
        }
        if (originalColor === "BLACK") {
            this.fixDelete(x);
        }
    };
    // Función para reemplazar nodos
    RBTree.prototype.transplant = function (u, v) {
        if (u.getFather() === this.leaf) {
            this.root = v;
        }
        else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        }
        else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    };
    // Método para corregir el árbol
    RBTree.prototype.fixDelete = function (x) {
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                var sibling = x.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    sibling = x.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                }
                else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = x.getFather().getRightChild();
                    }
                    sibling.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            }
            else {
                var sibling = x.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    sibling = x.getFather().getLeftChild();
                }
                if (sibling.getRightChild().getColor() === "BLACK" && sibling.getLeftChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                }
                else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = x.getFather().getLeftChild();
                    }
                    sibling.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    };
    // Función para buscar el nodo con el valor mínimo
    RBTree.prototype.minimum = function (node) {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    };
    RBTree.prototype.insert = function (data) {
        // Inserción normal de BST
        var newNode = new NodeRBT(data);
        var parent = this.leaf;
        var current = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            }
            else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        }
        else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        }
        else {
            parent.setRightChild(newNode);
        }
        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    };
    RBTree.prototype.clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    RBTree.prototype.drawTree = function (node, x, y, offsetX) {
        if (node && node !== this.leaf) {
            // Dibujar el nodo actual
            this.drawNode(node, x, y, ctx);
            // Dibujar las conexiones a los hijos
            if (node.getLeftChild() && node.getLeftChild() !== this.leaf) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x - offsetX, y + nodeDistanceY);
                ctx.stroke();
                this.drawTree(node.getLeftChild(), x - offsetX, y + nodeDistanceY, offsetX / 2);
            }
            if (node.getRightChild() && node.getRightChild() !== this.leaf) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + offsetX, y + nodeDistanceY);
                ctx.stroke();
                this.drawTree(node.getRightChild(), x + offsetX, y + nodeDistanceY, offsetX / 2);
            }
        }
    };
    
    RBTree.prototype.drawNode = function (node, x, y, ctx) {
        if (node) {
            // Dibuja el nodo como un círculo
            ctx.beginPath();
            ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
            ctx.fillStyle = node.getColor() === 'RED' ? '#FF0000' : '#000000';
            ctx.fill();
            ctx.stroke();
            // Dibuja el valor del nodo
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '8px Arial';
            ctx.fillText(node.getData().toString(), x - 3, y + 3); // Llamar a getData() correctamente
        }
    };
    
    
    return RBTree;
}());
//main
var botonforinhorden = document.getElementById("RECORRIDOinhorden");
var textoQUECAMBIA = document.getElementById("Textocambiante");
var botonAgregar = document.getElementById("botondatos");
var botonEliminar = document.getElementById("botoneliminar");
var botonBuscar = document.getElementById("botonbuscar");
var inputAdd = document.getElementById("datos");
var inputDelete = document.getElementById("eliminar");
var inputSearch = document.getElementById("buscar");
var resultado = document.getElementById("Textocambiante");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var nodeRadius = 7;
var nodeDistanceX = 20;
var nodeDistanceY = 30;
var arbolRBT = new RBTree();
// Agregar un nodo
botonAgregar.addEventListener("click", function () {
    var value = parseInt(inputAdd.value);
    if (!isNaN(value)) {
        arbolRBT.insert(value);
        arbolRBT.clearCanvas(); // Limpiar el canvas antes de dibujar
        arbolRBT.drawTree(arbolRBT.getRoot(), canvas.width / 2, 15, 30); // Dibujar el árbol
    }
});

// Eliminar un nodo
botonEliminar.addEventListener("click", function () {
    var value = parseInt(inputDelete.value);
    if (!isNaN(value)) {
        arbolRBT.deleteNode(value);
        inputDelete.value = "";
        arbolRBT.clearCanvas();
        arbolRBT.drawTree(arbolRBT.getRoot(), canvas.width / 2, 15, 30);
    }
    else {
        alert("Introduce un valor válido");
    }
});
botonBuscar.addEventListener("click", function () {
    var value = parseInt(inputSearch.value);
    if (!isNaN(value)) {
        var resultNode = arbolRBT.searchNode(arbolRBT.getRoot(), value);
        if (resultNode !== _this.leaf) {
            resultado.textContent = "Nodo encontrado: ".concat(resultNode.getData(), " (").concat(resultNode.getColor(), ")");
        }
        else {
            resultado.textContent = "Nodo no encontrado";
        }
        arbolRBT.clearCanvas();
        arbolRBT.drawTree(arbolRBT.getRoot(), canvas.width / 2, 15, 30);
    }
    else {
        alert("Introduce un valor válido");
    }
});