class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('bg', '/tamir-dev-portfolio/public/bomberMan/assets/images/ground_bg.png');
    this.load.image('box', '/tamir-dev-portfolio/public/bomberMan/assets/images/box.png');
    this.load.image('metal', '/tamir-dev-portfolio/public/bomberMan/assets/images/metal.png');
    this.load.tilemapTiledJSON('map', '/tamir-dev-portfolio/public/bomberMan/assets/map/map.json');

    this.load.spritesheet('player', '/tamir-dev-portfolio/public/bomberMan/assets/spritesheets/john.png', {
      frameWidth: 62,
      frameHeight: 62
    });

    this.load.spritesheet('death', '/tamir-dev-portfolio/public/bomberMan/assets/spritesheets/death.png', {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('bomb', '/tamir-dev-portfolio/public/bomberMan/assets/spritesheets/bomb.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('explosion', '/tamir-dev-portfolio/public/bomberMan/assets/spritesheets/explosion_1.png', {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet('explosion2', '/tamir-dev-portfolio/public/bomberMan/assets/spritesheets/explosion_4.png', {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet('power_ups', '/tamir-dev-portfolio/public/bomberMan/assets/spritesheets/powerUps.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }
  create() {
    this.scene.start('playGame');

    this.anims.create({
      key: 'player_walk',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 5,
      repeat: 1
    });

    this.anims.create({
      key: 'bomb_anim',
      frames: this.anims.generateFrameNumbers('bomb'),
      frameRate: 6,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'bomb_detonated_anim',
      frames: this.anims.generateFrameNumbers('bomb', { start: 12, end: 13 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: false
    });

    this.anims.create({
      key: 'explosion_anim_p1',
      frames: this.anims.generateFrameNumbers('explosion', { start: 1, end: 5 }),
      frameRate: 60,
      repeat: 0,
      hideOnComplete: false
    });

    this.anims.create({
      key: 'explosion_anim_p2',
      frames: this.anims.generateFrameNumbers('explosion', { start: 6 }),
      frameRate: 60,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'middle_explosion_small',
      frames: this.anims.generateFrameNumbers('explosion2', { end: 24 }),
      frameRate: 60,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'middle_explosion_big',
      frames: this.anims.generateFrameNumbers('explosion2', { start: 25 }),
      frameRate: 60,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'bomb_powerup_anim',
      frames: this.anims.generateFrameNumbers('power_ups', { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true
    });
    this.anims.create({
      key: 'fire_powerup_anim',
      frames: this.anims.generateFrameNumbers('power_ups', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true
    });
    this.anims.create({
      key: 'kick_powerup_anim',
      frames: this.anims.generateFrameNumbers('power_ups', { start: 24, end: 29 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true
    });
    this.anims.create({
      key: 'detonate_powerup_anim',
      frames: this.anims.generateFrameNumbers('power_ups', { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true
    });
    this.anims.create({
      key: 'speed_powerup_anim',
      frames: this.anims.generateFrameNumbers('power_ups', { start: 18, end: 23 }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'death_anim',
      frames: this.anims.generateFrameNumbers('death'),
      frameRate: 24,
      repeat: 0,
      hideOnComplete: false
    });
  }
}
