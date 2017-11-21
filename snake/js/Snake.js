class Snake {
    constructor(name, pointArray, geometry, material, boxSize, status) {
        this.name = name;
        this.status = status; //TRUE - GAME, FALSE - LOSE
        this.aktualnyBrakPomyslu = 0;
        this.geometry = geometry;
        this.material = material;
        this.boxSize = boxSize;
        this.boxArray = [];
        this.pointArray = pointArray;

        let box;
        for (let i = 0; i < pointArray.length; i++) {
            box = new THREE.Mesh(this.geometry, this.material);
            box.position.set(boxSize * pointArray[i].x, 300, boxSize * pointArray[i].y);
            this.boxArray.push(box);
        }

        //mock
        this.board = new Array(width);
        for (let i = 0; i < width - 1; i++) {
            this.board[i] = new Array(height);
            for (let j = 0; j < height - 1; j++) {
                if (i == 0 || j == 0) {
                    this.board[i][j] = 1;
                }
                else {
                    this.board[i][j] = 0;
                }
            }
        }
    }

    draw(scene) {
        for (let i = 0; i < this.boxArray.length; i++) {
            scene.add(this.boxArray[i]);
        }
    }

    move(brakPomyslu) {
        let direction = new THREE.Vector3();

        switch (brakPomyslu) {
            case 0:
                if (this.aktualnyBrakPomyslu != 2) {
                    this.aktualnyBrakPomyslu = brakPomyslu;
                }
                break;
            case 1:
                if (this.aktualnyBrakPomyslu != 3) {
                    this.aktualnyBrakPomyslu = brakPomyslu;
                }
                break;
            case 2:
                if (this.aktualnyBrakPomyslu != 0) {
                    this.aktualnyBrakPomyslu = brakPomyslu;
                }
                break;
            case 3:
                if (this.aktualnyBrakPomyslu != 1) {
                    this.aktualnyBrakPomyslu = brakPomyslu;
                }
                break;
        }

        switch (this.aktualnyBrakPomyslu) {
            case 0:
                direction.z = -this.boxSize;
                break;
            case 1:
                direction.x = -this.boxSize;
                break;
            case 2:
                direction.z = this.boxSize;
                break;
            case 3:
                direction.x = this.boxSize;
                break;
        }

        let box = this.boxArray[this.boxArray.length - 1];
        if (this.board[(box.position.x + direction.x) / this.boxSize][-(box.position.z + direction.z) / this.boxSize] == 0)//mock
        {
            for (let i = 0; i < this.boxArray.length - 1; i++) {
                this.boxArray[i].position.set(this.boxArray[i + 1].position.x, this.boxArray[i + 1].position.y, this.boxArray[i + 1].position.z);
            }
            this.boxArray[this.boxArray.length - 1].position.set(box.position.x, box.position.y, box.position.z);
            this.boxArray[this.boxArray.length - 1].position.add(direction);

            for (let i = 0; i < this.boxArray.length - 1; i++) {
                this.pointArray[i].x = this.boxArray[i].position.x;
                this.pointArray[i].y = this.boxArray[i].position.z;
            }
        }
        else {
            this.status = false;
        }
    }

    remove(scene) {
        console.log(this.boxArray);
        for (let i = 0; i < this.boxArray.length; i++) {
            scene.remove(this.boxArray[i]);
        }
    }
}
