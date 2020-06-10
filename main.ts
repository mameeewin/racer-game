namespace SpriteKind {
    export const Road = SpriteKind.create()
    export const Roadd = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Roadd, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.right = otherSprite.left + 8
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-5)
    otherSprite.destroy(effects.disintegrate, 500)
    otherSprite.destroy(effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Road, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.left = otherSprite.right + 8
    scene.cameraShake(4, 500)
})
let Car_ENDERMAN: Sprite = null
let Road_slice_Right: Sprite = null
let Road_slice_left: Sprite = null
let TurnOffset = 0
let Car = sprites.create(img`
. . . . . . e e c c e e . . . . 
. . . . . e 2 2 2 2 2 2 e . . . 
. . . . 2 c 2 2 2 2 2 2 c 2 . . 
. . . e 2 c 4 2 2 2 2 2 c 2 e . 
. . . f 2 2 4 2 2 2 2 2 c 2 f . 
. . . f 2 2 4 2 2 2 2 2 2 2 f . 
. . . f 2 2 4 2 2 2 2 2 2 2 f . 
. . . f 2 c 2 4 4 2 2 2 c 2 f . 
. . . e 2 c e c c c c e c 2 e . 
. . . e 2 e c b b b b c e 2 e . 
. . . e 2 e b b b b b b e 2 e . 
. . . e e e e e e e e e e e e . 
. . . f e d e e e e e e d e f . 
. . . f e 2 d e e e e d 2 e f . 
. . . f f e e e e e e e e f f . 
. . . . f f . . . . . . f f . . 
`, SpriteKind.Player)
controller.moveSprite(Car)
let Speed = 0
info.setLife(100)
Car.setFlag(SpriteFlag.StayInScreen, true)
game.onUpdateInterval(100, function () {
    TurnOffset += Math.randomRange(-2, 2)
    TurnOffset = Math.constrain(TurnOffset, -20, 20)
    Road_slice_left = sprites.createProjectileFromSide(img`
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 7 7 7 7 7 7 c c c c c 7 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 7 7 7 7 7 7 c c c c c 7 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 7 7 7 7 7 7 c c c c c 7 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c c c c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 9 9 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 c c c c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 9 9 9 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 c c c c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 8 9 9 9 9 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 c c c c c c 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 c 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 8 9 8 8 
7 7 7 7 7 8 8 8 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 c c c c c c 9 9 9 9 9 9 9 9 9 9 9 c c c c c 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 8 8 9 9 
7 7 7 7 7 8 8 8 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 c c c c c 9 9 9 9 9 9 9 9 9 9 9 c c c c c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 9 9 9 
7 7 7 7 7 8 8 8 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 c c c c c 9 9 9 9 9 9 9 9 9 9 9 c c c c c 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 9 9 9 9 9 9 
`, 0, 80)
    Road_slice_left.setKind(SpriteKind.Road)
    Road_slice_left.x += 10 + TurnOffset
    Road_slice_Right = sprites.createProjectileFromSide(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 7 7 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 8 8 8 8 8 c c 7 9 9 9 9 c c c c c c c c c c 9 9 9 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 8 8 8 8 8 c c 7 9 9 9 9 c 9 9 9 8 8 8 8 8 9 c 9 9 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 8 8 8 8 8 c c 7 9 9 9 9 c 9 9 9 8 8 8 8 c c c c 9 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 8 8 8 8 8 c c c 9 9 9 9 9 c 9 c c c c c 8 c 9 9 c 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 c c c 7 c c c c c c 7 c c c c c 9 9 9 c 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 c c c c c c c 7 7 7 7 7 7 c 7 9 9 9 9 9 c c c 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 c c c c c c c c c c c c c c c c c c c c c c c 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 9 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 c c c c c c 8 8 8 8 8 7 7 7 7 7 7 c c c c c 9 9 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 9 9 9 8 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 c c c c c 8 8 8 8 8 7 7 7 7 7 7 c c c c c c c 
. . . . . . . . . . . . . . . . . . . . . . . . . . 9 9 9 9 9 8 8 8 8 7 7 7 7 7 7 7 7 7 7 7 7 7 8 8 8 8 8 7 7 7 7 c c c c c 8 8 8 8 8 7 7 7 7 7 7 c c c c c c c 
`, 0, 80)
    Road_slice_Right.setKind(SpriteKind.Roadd)
    Road_slice_Right.right = 200
    Road_slice_Right.x += TurnOffset
})
game.onUpdateInterval(1000, function () {
    Car_ENDERMAN = sprites.createProjectileFromSide(img`
. . . . . . 8 8 c c 8 8 . . . . 
. . . . . 8 b b b b b b 8 . . . 
. . . . b c b b b b b b c b . . 
. . . 8 b c d b b b b b c b 8 . 
. . . f b b d b b b b b c b f . 
. . . f b b d b b b b b b b f . 
. . . f b b d b b b b b b b f . 
. . . f b c 6 d d b b b c b f . 
. . . c b c 8 c c c c 8 c b c . 
. . . c b c c b b b b c c b c . 
. . . c b c b b b b b b c b c . 
. . . c c c c c c c c c c c c . 
. . . f c d c c c c c c d c f . 
. . . f c 6 d c c c c d 6 c f . 
. . . f f c c c c c c c c f f . 
. . . . f f . . . . . . f f . . 
`, 0, 100)
    Car_ENDERMAN.setPosition(Math.randomRange(40, 140), -4)
    Car_ENDERMAN.setKind(SpriteKind.Enemy)
})
