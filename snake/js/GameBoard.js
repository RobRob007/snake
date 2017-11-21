class GameBoard {
    constructor(playerId, playerSnake, board, width, height, snakeSize){
        this.playerId = playerId;
        this.playerSnake = playerSnake;
        this.board = board;
        this.width = width;
        this.height = height;
        this.snakeSize = snakeSize;
        this.newGame = false;
        this.camera;
        this.scene;
        this.renderer;
        this.floor;

        this.moveLeft = false;
        this.moveRight = false;
        this.moveForward = false;
        this.moveBackward = false;
    }


    init() {
        //CAMERA
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
        this.camera.position.set(0, 1000, 0); 
        
        //SCENE
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x33ccff);
        this.scene.fog = new THREE.Fog( 0xffff00, 0, 3000 );

        //LIGHTS
        let light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light);
        
        let light1 = new THREE.PointLight(0xffffff, 0.5);
        this.scene.add(light1);

        
        let floorGeometry = new THREE.PlaneGeometry( this.width * this.snakeSize, this.height * this.snakeSize, this.snakeSize, this.snakeSize);

        //let floorMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        let floorMaterial = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
        this.floor = new THREE.Mesh( floorGeometry, floorMaterial );
        this.floor.position.set(0, 300, -2000);
        this.floor.rotateX( - Math.PI / 2 );
        this.scene.add( this.floor );

        //OBJECT
        this.initPlayers();

        //RENDERER
        this.renderer = new THREE.WebGLRenderer({canvas: document.getElementById('snakePlane'), antialias: true});
        this.renderer.setClearColor(0x00ff00);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    game() {
        requestAnimationFrame(() => this.game());
        if(this.playerSnake.status) {
            if(this.moveLeft) {
                this.playerSnake.move(1, this.board);
                console.log("a");
            }
            else if(this.moveRight) {
                this.playerSnake.move(3, this.board);
                 console.log("b");
            }
            else if(this.moveBackward) {
                this.playerSnake.move(2, this.board);
                 console.log("c");
            }
            else if(this.moveForward) {
                this.playerSnake.move(0, this.board);
                 console.log("d");
            }
            else {
                this.playerSnake.move(-1, this.board);
                console.log("e");
            }
            this.renderer.render(this.scene, this.camera);
        }
        else if(this.newGame) {
            this.playerSnake.remove(this.scene);
            this.initPlayers();
        }
    }

    initPlayers() {
        let points = [new Point(1, -15), new Point(2, -15), new Point(3, -15),new Point(4, -15), new Point(5, -15), new Point(6, -15)];
        this.playerSnake = new Snake("Robert", points, new THREE.CubeGeometry(snakeSize, snakeSize, snakeSize), new THREE.MeshLambertMaterial({color: 0x0000ff}), this.snakeSize, true);
        this.playerSnake.draw(this.scene);
    }

}