//Clase Nodo para el árbol RBT
class NodeRBT {
    private data: number;
    private father!: NodeRBT; // NodeRBT* es un apuntador
    private leftChild!: NodeRBT; // "!" significa que el atributo no será inicializado en el constructor ...
    private rightChild!: NodeRBT; // ... pero que sí se inicializará en otra parte
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public setColor(color: string): void {
        this.color = color;
    }
    

    public getColor(): string {
        return this.color;
    }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;
    
    public list: number[];

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.list = new Array()
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
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
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
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
    }


    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
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
    }

    private searchNode(node: NodeRBT, value: number): NodeRBT {
        // Caso base: si llegamos a una hoja (leaf) o encontramos el valor
        if (node === this.leaf || value === node.getData()) {
            return node;
        }
    
        // Si el valor que estamos buscando es menor al valor actual, buscamos en el hijo izquierdo
        if (value < node.getData()) {
            return this.searchNode(node.getLeftChild(), value);
        }
        
        // Si el valor es mayor, buscamos en el hijo derecho
        return this.searchNode(node.getRightChild(), value);
    }

    private inhorden(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.inhorden(nodo.getLeftChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo?.getRightChild() !== this.leaf)
            this.inhorden(nodo.getRightChild());
    }

    private postorden(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.postorden(nodo.getLeftChild());
        if (nodo?.getRightChild() !== this.leaf)
            this.postorden(nodo.getRightChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
    }


    private preorden(nodo: NodeRBT): void {
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo.getLeftChild() !== this.leaf)
            this.preorden(nodo.getLeftChild());
        if (nodo?.getRightChild() !== this.leaf)
            this.preorden(nodo.getRightChild());
    }

    public printInhorden(): void {
        this.inhorden(this.root);
    }

    public printPostorden(): void {
        this.postorden(this.root);
    }

    public printPreorden(): void {
        this.preorden(this.root);
    }

    public deleteNode(value: number): void {
        let nodeToDelete = this.searchNode(this.root, value);
        if (nodeToDelete === this.leaf) {
            return; // No se encontró el nodo
        }
        this.deleteHelper(nodeToDelete);
    }
    
    private deleteHelper(node: NodeRBT): void {
        let y = node;
        let originalColor = y.getColor();
        let x: NodeRBT;
    
        if (node.getLeftChild() === this.leaf) {
            x = node.getRightChild();
            this.transplant(node, node.getRightChild());
        } else if (node.getRightChild() === this.leaf) {
            x = node.getLeftChild();
            this.transplant(node, node.getLeftChild());
        } else {
            y = this.minimum(node.getRightChild());
            originalColor = y.getColor();
            x = y.getRightChild();
    
            if (y.getFather() === node) {
                x.setFather(y);
            } else {
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
    }
    
    // Función para reemplazar nodos
    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }
    
    // Método para corregir el árbol
    private fixDelete(x: NodeRBT): void {
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                let sibling = x.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    sibling = x.getFather().getRightChild();
                }
    
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                } else {
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
            } else {
                let sibling = x.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    sibling = x.getFather().getLeftChild();
                }
    
                if (sibling.getRightChild().getColor() === "BLACK" && sibling.getLeftChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                } else {
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
    }
    
    // Función para buscar el nodo con el valor mínimo
    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    

    public insert(data: number): void {
        // Inserción normal de BST
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }
}

const laboratorio4: RBTree = new RBTree();


laboratorio4.insert(9);
laboratorio4.insert(3);
laboratorio4.insert(18);
laboratorio4.insert(6);
laboratorio4.insert(1);
laboratorio4.insert(4);
laboratorio4.insert(24);
laboratorio4.insert(7);
laboratorio4.insert(12);
laboratorio4.insert(17);
laboratorio4.insert(20);
laboratorio4.insert(15);



console.log("/-/ Inhorden: /-/")
laboratorio4.printInhorden();

console.log("\n/-/ Preorden: /-/")
laboratorio4.printPreorden();

console.log("\n/-/ Postorden: /-/")
laboratorio4.printPostorden();

console.log("******* Después de Eliminar *******")
laboratorio4.deleteNode(9)


laboratorio4.printInhorden()