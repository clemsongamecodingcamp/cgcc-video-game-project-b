game.onGameUpdateWithHeading(function () {
    controller.moveSprite(playerSprite)
})
function Start_Screen () {
    game.showLongText("This is my game. - By a Clemson First-Year Student", DialogLayout.Bottom)
}
let playerSprite: Sprite = null
scene.centerCameraAt(0, 84)
info.setScore(0)
info.setLife(3)
info.startCountdown(10)
playerSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . 6 6 6 5 5 6 6 6 . . . . 
    . . . 7 7 7 7 6 6 6 6 6 6 . . . 
    . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
    . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
    . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
    . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
    . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
    . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
    . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
    . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
    . . . 6 8 8 8 8 8 8 8 8 6 . . . 
    . . . . 6 6 8 8 8 8 6 6 . . . . 
    . . . . . . 6 6 6 6 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let duckSprite = sprites.create(img`
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
tiles.setTilemap(tiles.createTilemap(hex`1000100003030303030303030303030303030303050505050505050505050503030303030204020402020402040205030303030307070707070707070707050303030303010601060101060106010503030303030101010101010101010105030303030301010101010101010101050303030303010101010101010101010503030303030101010101010101010105030303030305050505050505050505050303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303`, img`
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
    `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile4,myTiles.tile3,myTiles.tile5,myTiles.tile7,myTiles.tile8], TileScale.Sixteen))
tiles.placeOnTile(duckSprite, tiles.getTileLocation(randint(0, 9), 2))
