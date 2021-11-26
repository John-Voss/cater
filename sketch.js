var player, player_image, player_jump;
var obs, obs_image,  obs_group;
var timeGame = 'INICIO';
var ground, ground1, ground_invis;
var background_star;
var sorteio;
var gameOver;
var pontuacao = 0;
var recorde = 0;

function preload() {
    player_image = loadAnimation('horse_walk1.png', 'horse_walk2.png', 'horse_walk3.png');
    player_jump = loadImage('horse_jump.png');
    ground1 = loadImage('ground.jpg');
    background_star = loadImage('Sem título.png');
    obs_image = loadImage('obstaculo.png');
    gameOver = loadImage('gameOver.jpg');
}
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);

    //creating the ground
    ground = createSprite(width/2 - 100, height - 400, 1400, 800);
    ground.addImage('ground_img', ground1);
    ground.visible = false;
    ground.scale = 2.6
    ground_invis = createSprite(width/2, height - 10, width, 10);
    ground_invis.visible = false;


    //creating the player
    player = createSprite(width - 150, height - 80, 50, 50);
    player.addAnimation('player_img', player_image);
    player.addImage('player_jump', player_jump);
    player.scale = 0.5;
    player.visible = false;

    obs_group = new Group();
}
function draw() {
    player.setCollider('circle', 0, 0, 100);
    player.collide(ground_invis);
    player.velocityY += 0.5
    ground.velocityX = 2
    if(timeGame === 'INICIO'){
        background(background_star);
        fill('#FF1493');
        textSize(30);
        text('Press space to play!', width - 700, height - 35);
        if(keyDown('space')) {
            timeGame = 'PLAY';
        }
    }
    else {
        background('black');
    }
    if(ground.x > width/2) {
        ground.x = width/2 - 50;
    }
    if(timeGame === 'PLAY') {
        pontuacao = pontuacao + (Math.round(frameRate()/60));
        ground.visible = true;
        player.visible = true;
        obstaculo();
        if(keyWentDown('up') && player.y > height - 200) {
            player.velocityY = -20;
            player.velocityX = -5;
            player.x = 1240;
            player.changeAnimation('player_jump', player_jump);
            }
        if(player.x < width - 400) {
            player.velocityX = 3;
        }
        if(player.x > width - 140) {
            player.velocityX = 0;
        }
    }
    if(keyWentUp('up')) {
        player.changeAnimation('player_img', player_image);
    }
    if(player.isTouching(obs_group)) {
        timeGame = 'END';
    }
    if(timeGame === 'END') {
        if(pontuacao > recorde) {
            recorde = pontuacao;
        }
        end();
        if(keyDown('enter')) {
            timeGame = 'INICIO';
        }
    }
    player.velocityY += 0.2;

    drawSprites();
    fill('black');
    textSize(20);
    text('Pontuação: '+ pontuacao, width - 1300, height - 720);
    text('Recorde: ' + recorde, width - 1300, height - 680);
}
function obstaculo() {
    if(frameCount% 250 === 0){
        obs = createSprite(width - width - 10, height - 80, 50, 50);
        obs.addImage('obs_img', obs_image);
        obs.lifetime = 710;
        obs.velocityX = 4
        sorteio = Math.round(random(1, 3));
        switch(sorteio) {
            case 1: obs.scale = 1.5; obs.y = height - 60
            break;
            case 2: obs.scale = 2; obs.y = height - 90
            break;
            case 3: obs.scale = 1.8; obs.y = height - 80
            break;
        }
        obs_group.add(obs);
    }
}
function end() {
    player.visible = false;
    ground.visible = false;
    obs_group.lifetime = -1;
    obs_group.velocityX = 0;
    obs_group.destroyEach();
    ground.velocityX = 0;
    pontuacao = 0;
    background(gameOver);
    fill('orange');
    textSize(20);
    text('Pressione "enter" para recomeçar', width - 1200, height - 100);
}