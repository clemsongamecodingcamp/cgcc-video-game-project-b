enum ActionKind {
    Walking,
    Idle,
    Jumping
}
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardHole, function (sprite, location) {
    sprite.destroy()
    info.changeScoreBy(100)
})
function animate () {
    catWalkLeft = animation.createAnimation(ActionKind.Walking, 1000)
    catWalkLeft.addAnimationFrame(img`
        e e e . . . . e e e . . . . 
        c d d c . . c d d c . . . . 
        c b d d f f d d b c . . . . 
        c 3 b d d b d b 3 c . . . . 
        f b 3 d d d d 3 b f . . . . 
        e d d d d d d d d e . . . . 
        e d f d d d d f d e . b f b 
        f d d f d d f d d f . f d f 
        f b d d b b d d 2 f . f d f 
        . f 2 2 2 2 2 2 b b f f d f 
        . f b d d d d d d b b d b f 
        . f d d d d d b d d f f f . 
        . f d f f f d f f d f . . . 
        . f f . . f f . . f f . . . 
        `)
    catWalkLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        e e e . . . . e e e . . . . 
        c d d c . . c d d c . . . . 
        c b d d f f d d b c . . . . 
        c 3 b d d b d b 3 c . . . . 
        f b 3 d d d d 3 b f . . . . 
        e d d d d d d d d e . . . . 
        e d f d d d d f d e b f b . 
        f d d f d d f d d f f d f . 
        f b d d b b d d 2 b f d f . 
        . f 2 2 2 2 2 2 d b d b f . 
        . f d d d d d d d f f f . . 
        . f d b d f f f d f . . . . 
        . . f f f f . . f f . . . . 
        `)
    catWalkLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . 
        e e e . . . . e e e . . . . 
        c d d c . . c d d c . . . . 
        c b d d f f d d b c . . . . 
        c 3 b d d b d b 3 c . . . . 
        f b 3 d d d d 3 b f . . . . 
        e d d d d d d d d e . . . . 
        e d f d d d d f d e . b f b 
        f d d f d d f d d f . f d f 
        f b d d b b d d 2 b f f d f 
        . f 2 2 2 2 2 2 d b b d b f 
        . f d d d d d d d f f f f . 
        . . f d b d f d f . . . . . 
        . . . f f f f f f . . . . . 
        `)
    catWalkRight = animation.createAnimation(ActionKind.Walking, 1000)
    catIdleLeft = img`
        e e e . . . . e e e . . . . 
        c d d c . . c d d c . . . . 
        c b d d f f d d b c . . . . 
        c 3 b d d b d b 3 c . . . . 
        f b 3 d d d d 3 b f . . . . 
        e d d d d d d d d e . . . . 
        e d f d d d d f d e . b f b 
        f d d f d d f d d f . f d f 
        f b d d b b d d 2 f . f d f 
        . f 2 2 2 2 2 2 b b f f d f 
        . f b d d d d d d b b d b f 
        . f d d d d d b d d f f f . 
        . f d f f f d f f d f . . . 
        . f f . . f f . . f f . . . 
        `
    catIdleRight = 0
}
function HardDiff () {
    spawnRate = 900
    laserSpeed = 20
    fireRate = 5000
}
game.onGameUpdateWithHeading(function () {
    if (Math.mod(game.runtime(), 2000) <= 40) {
        if (spawnRate > randint(0, 999)) {
            SpawnDuck()
        }
    }
    controller.moveSprite(playerSprite)
    if (sprites.heading(playerSprite) > 15 && sprites.heading(playerSprite) < 165) {
        headingRight = 1
    }
    if (sprites.heading(playerSprite) > 195 && sprites.heading(playerSprite) < 345) {
        headingRight = 0
    }
    for (let thisDuck of ducks) {
        if (thisDuck.x >= 150) {
            sprites.setDataNumber(thisDuck, "direction", -1)
        }
        if (thisDuck.x <= 9) {
            sprites.setDataNumber(thisDuck, "direction", 1)
        }
        thisDuck.setVelocity(sprites.speed(thisDuck) * sprites.readDataNumber(thisDuck, "direction"), 0)
        console.log(sprites.readDataNumber(spawnDuckSprite, "lastLaser") + fireRate)
        if (sprites.readDataNumber(spawnDuckSprite, "lastLaser") + fireRate <= game.runtime()) {
            sprites.setDataNumber(spawnDuckSprite, "lastLaser", game.runtime())
            laser = sprites.createProjectileFromSprite(img`
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                `, thisDuck, 0, laserSpeed)
            laser.setFlag(SpriteFlag.Ghost, true)
        }
    }
    for (let index = 0; index <= buttonTime.length; index++) {
        if (game.runtime() >= buttonTime[index]) {
            tiles.setTileAt(tiles.getTileLocation(buttonX[index], 8), sprites.dungeon.buttonOrange)
            buttonX.removeAt(index)
            buttonTime.removeAt(index)
        }
    }
    for (let index = 0; index <= hatchTime.length; index++) {
        if (game.runtime() >= hatchTime[index]) {
            tiles.setTileAt(tiles.getTileLocation(hatchX[index], 2), myTiles.tile3)
            hatchX.removeAt(index)
            hatchTime.removeAt(index)
        }
    }
})
function EasyDiff () {
    spawnRate = 250
    laserSpeed = 0
    fireRate = 0
}
function SpawnDuck () {
    spawnDuckSprite = sprites.create(img`
        . . . . . . . . . . b 5 b . . . 
        . . . . . . . . . b 5 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 5 5 5 5 5 b . . . 
        . . . . b b 5 d 1 f 5 5 d f . . 
        . . . . b 5 5 1 f f 5 d 4 c . . 
        . . . . b 5 5 d f b d d 4 4 . . 
        . b b b d 5 5 5 5 5 4 4 4 4 4 b 
        b d d d b b d 5 5 4 4 4 4 4 b . 
        b b d 5 5 5 b 5 5 5 5 5 5 b . . 
        c d c 5 5 5 5 d 5 5 5 5 5 5 b . 
        c b d c d 5 5 b 5 5 5 5 5 5 b . 
        . c d d c c b d 5 5 5 5 5 d b . 
        . . c b d d d d d 5 5 5 b b . . 
        . . . c c c c c c c c b b . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    ducks.push(spawnDuckSprite)
    tiles.placeOnTile(spawnDuckSprite, tiles.getTileLocation(randint(0, 9), 2))
    sprites.setDataNumber(spawnDuckSprite, "lastLaser", game.runtime())
    if (Math.percentChance(50)) {
        sprites.setDataNumber(spawnDuckSprite, "direction", -1)
    } else {
        sprites.setDataNumber(spawnDuckSprite, "direction", 1)
    }
    spawnDuckSprite.setVelocity(randint(10, 30), 0)
}
function Start_Screen () {
    game.showLongText("This is my game. - By a Clemson First-Year Student", DialogLayout.Bottom)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonOrange, function (sprite, location) {
    buttonX.push(scene.getTileColCoordinate(location))
    buttonTime.push(game.runtime() + 5000)
    hatchX.push(scene.getTileColCoordinate(location))
    hatchTime.push(game.runtime() + 500)
    tiles.setTileAt(location, sprites.dungeon.buttonTealDepressed)
    tiles.setTileAt(tiles.getTileLocation(scene.getTileColCoordinate(location), 2), sprites.dungeon.hazardHole)
})
function NormalDiff () {
    spawnRate = 500
    laserSpeed = 10
    fireRate = 7000
}
let laser: Sprite = null
let spawnDuckSprite: Sprite = null
let headingRight = 0
let fireRate = 0
let laserSpeed = 0
let spawnRate = 0
let catIdleRight = 0
let catIdleLeft: Image = null
let catWalkRight: animation.Animation = null
let catWalkLeft: animation.Animation = null
let hatchTime: number[] = []
let hatchX: number[] = []
let buttonTime: number[] = []
let buttonX: number[] = []
let playerSprite: Sprite = null
let ducks: Sprite[] = []
ducks = []
let diff = game.askForNumber("")
scene.centerCameraAt(0, 84)
if (diff == 0) {
    EasyDiff()
} else if (diff == 2) {
    HardDiff()
} else {
    NormalDiff()
}
animate()
info.setScore(0)
info.setLife(3)
info.startCountdown(6000)
playerSprite = sprites.create(img`
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
playerSprite.setPosition(80, 110)
tiles.setTilemap(tiles.createTilemap(hex`10001000030303030303030303030303030303030505050505050505050505080303030304020204020204020204050a0303030306060606060606060606050303030303090101090101090101090503030303030901010901010901010905030303030309010109010109010109050303030303090101090101090101090503030303030701010701010701010705030303030305050505050505050505050303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303`, img`
    . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . 2 . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . 2 . . . . . 
    . . . . . . . . . . 2 . . . . . 
    . . . . . . . . . . 2 . . . . . 
    . . . . . . . . . . 2 . . . . . 
    . . . . . . . . . . 2 . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile4,myTiles.tile3,myTiles.tile5,myTiles.tile8,sprites.dungeon.buttonOrange,sprites.dungeon.buttonTealDepressed,myTiles.tile9,sprites.dungeon.hazardHole], TileScale.Sixteen))
SpawnDuck()
buttonX = []
buttonTime = []
hatchX = []
hatchTime = []
