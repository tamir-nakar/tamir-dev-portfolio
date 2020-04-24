class AiPlayer extends Player {
  // private members--!

  #targetTile;
  #isXsettled;
  #isYsettled;
  #isStuck;

  constructor(scene, x, y, start_angle, id, color) {
    super(scene, x, y, {}, start_angle, id, color);
    this.#targetTile = null;
    this.#isStuck = false;
  }
  create() {}
  update() {
    if (this) {
      this.#move();
    }

    //debug
    //var pointer = this.scene.input.activePointer;
    //console.log(`${pointer.x},${pointer.y}`);
  }

  // private Methods -- !

  #move = () => {
    if (this.body) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.anims.play(`player${this.id}_walk`, true);
      this.#plantBomb();

      if (this.#targetTile) {
        //move
        if (!this.#isStuck) {
          const lastCoords = [this.x, this.y];
          this.#goTo(this.#targetTile[0], this.#targetTile[1]);
          if (this.x === lastCoords[0] && this.y === lastCoords[1]) {
            this.#isStuck = true;
          } else {
            console.log('ss');
            this.#plantBomb();
          }
        }
      } else {
        this.anims.stop();
        this.#targetTile = this.#getClosestExplodable(); // return point or null
      }
    }
  };

  #coordsToTile = (x, y) => {
    return this.scene.map.getTileAt(
      this.scene.map.worldToTileX(x),
      this.scene.map.worldToTileY(y)
    );
  };
  #getTileType = (x, y) => {
    let res;
    const tile = this.#coordsToTile(x, y);

    res = tile ? tile.index : 0;

    return res;
  };

  #getClosestExplodable = (maxRadius = 2) => {
    let x = this.x;
    let y = this.y;
    let s = TILES.SIZE;

    function _addBatchByRadius(set, loc, r) {
      switch (loc) {
        case 'top':
          //for(let i=0; i <= r; i++){
          set.add(`${x},${y + s * r}`); // middle
          //}
          for (let i = 1; i <= r; i++) {
            // ajecent
            set.add(`${x + s * i},${y + s * r}`); // lock y
            set.add(`${x - s * i},${y + s * r}`);
          }
          break;

        case 'bottom':
          //for(let i=0; i <= r; i++){
          set.add(`${x},${y - s * r}`); // middle
          //}
          for (let i = 1; i <= r; i++) {
            // ajecent
            set.add(`${x + s * i},${y - s * r}`); // lock y
            set.add(`${x - s * i},${y - s * r}`);
          }
          break;

        case 'left':
          //for(let i=0; i <= r; i++){
          set.add(`${x - s * r},${y}`); // middle
          //}
          for (let i = 1; i <= r; i++) {
            // ajecent
            set.add(`${x - s * r},${y + s * i}`); // lock x
            set.add(`${x - s * r},${y - s * i}`);
          }
          break;

        case 'right':
          //for(let i=0; i <= r; i++){
          set.add(`${x + s * r},${y}`); // middle
          //}
          for (let i = 1; i <= r; i++) {
            // ajecent
            set.add(`${x + s * r},${y + s * i}`); // lock x
            set.add(`${x + s * r},${y - s * i}`);
          }
          break;
      }
    }
    let candidates;
    let radius = 1;
    let resCand = null;

    while (!resCand) {
      candidates = new Set();

      _addBatchByRadius(candidates, 'top', radius);
      _addBatchByRadius(candidates, 'bottom', radius);
      _addBatchByRadius(candidates, 'left', radius);
      _addBatchByRadius(candidates, 'right', radius);

      radius++;

      resCand = Array.from(candidates).find(
        (cand) =>
          this.#getTileType(
            parseInt(cand.split(',')[0]),
            parseInt(cand.split(',')[1])
          ) === TILES.EXPLOADABLE
      );
    }

    return [parseInt(resCand.split(',')[0]), parseInt(resCand.split(',')[1])];
  };

  #plantBomb = () => {
    if (this.currentAvailableBombs >= 1 && !this.isBombOverlap()) {
      const addBomb = () => this.currentAvailableBombs++;
      this.currentAvailableBombs--;
      new Bomb(
        this.scene,
        this.x,
        this.y,
        addBomb,
        this.firePower,
        this.isDetonator,
        this.id
      );
    }
  };

  #goTo = (x, y) => {
    console.log('go to ' + x + ',' + y);
    console.log('myx' + this.x);
    console.log('myy' + this.y);

    if (!this.#isXsettled) {
      // try settleX
      if (Math.abs(this.x - x) <= 5) {
        this.#isXsettled = true;
        console.error('x setteled');
      } else {
        if (this.x < x) {
          // p    X
          this.body.setVelocityX(this.speed);
          this.angle = ANGLES.RIGHT;
        } else if (this.x > x) {
          // X     p
          this.body.setVelocityX(-this.speed);
          this.angle = ANGLES.LEFT;
        }
      }
    } else if (!this.#isYsettled) {
      // try settleY
      if (Math.abs(this.y - y) <= 5) {
        this.#isYsettled = true;
        console.error('y setteled');
      } else {
        if (this.y > y) {
          //    Y
          //    p
          this.body.setVelocityY(-this.speed);
          this.angle = ANGLES.UP;
        } else if (this.y < y) {
          //    p
          //    Y
          this.body.setVelocityY(this.speed);
          this.angle = ANGLES.DOWN;
        }
      }
    } else {
      // all setteled
      //this.#targetTile = null;
      // this.#isXsettled = false;
      // this.#isYsettled = false;
    }
  };
}
