import { Scene } from 'phaser';

const WIDTH = 1024;
const HEIGHT = 768;

export class Game extends Scene {
    constructor() {
        super('Game');
        this.ball = null;
        this.leftpaddle = null;
        this.rightpaddle = null;
        this.ballInMotion = false;
        this.wasd=null;
        this.cursors = null;
    }

    preload() {
        this.load.image('background','assets/background.png');
        this.load.image('ball','assets/ball.png');
        this.load.image('paddle','assets/paddle.png');
    }

    create() {

       

        this.add.image(WIDTH/2,HEIGHT/2,'background').setScale(0.8,0.8);
        this.ball = this.add.image(WIDTH/2,HEIGHT/2,'ball').setScale(0.05,0.05).refreshBody();
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1,1);
        this.ball.setvelocity(200,200);
        this.leftpaddle = this.physics.add.image(50,384,'paddle');
        this.leftpaddle.setImmovable(true);
        this.rightpaddle = this.physics.add.image(974,384,'paddle');
        this.rightpaddle.setImmovable(true);
        this.physics.add.collider(this.ball,this.leftpaddle,this.hitpaddle,null,this)
        this.physics.add.collider(this.ball,this.rightpaddle,this.hitpaddle,null,this)
        this.input.keyboard.on('keydown-SPACE',this.startBall(),this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.input.keyboard.KeyCodes.S
        });

    }

    update() {
        if (this.wasd.up.isDown && this.leftpaddle.y>0){
            this.leftpaddle.y -= 5;

        }else if (this.wasd.down.isDown && this.leftpaddle.y<HEIGHT){
            this.leftpaddle.y += 5;
        }
        if (this.cursors.up.isDown&&this.cursors.y>0){
            this.rightpaddle.y -= 5;

        }else if (this.cursors.down.isDown&&this.cursors.y<HEIGHT){
            this.rightpaddle.y += 5;
        }



    }
    startBall(){
        if(!this.ballinMotion){
            let initialVelocityX = 300*(Phaser.Math.Between(0,1)?1:-1)
            let initialVelocityY = 300*(Phaser.Math.Between(0,1)?1:-1)
            this.ball.setVelocity(intialVelocityX,initialVelocityY);
            this.ballinMotion = true;
        }
    }
    hitpaddle(){

    }

} 