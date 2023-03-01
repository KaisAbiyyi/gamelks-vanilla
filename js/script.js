let playername = localStorage.getItem('name')
let player = document.getElementById('player')
let enemy1 = document.getElementById('enemy1')
let enemy2 = document.getElementById('enemy2')
let enemy3 = document.getElementById('enemy3')
let playerSword = document.getElementById('playersword')
let enemy1sword = document.getElementById('enemysword1')
let enemy2sword = document.getElementById('enemysword2')
let enemy3sword = document.getElementById('enemysword3')
let playercore = document.getElementById('playercore')
let enemy1core = document.getElementById('enemycore1')
let enemy2core = document.getElementById('enemycore2')
let enemy3core = document.getElementById('enemycore3')
let ball = document.getElementById('ball')
let ballcontainer = document.getElementById('ballcontainer')
let attackButton = document.getElementById('attack')

document.getElementById('countdown').style.display = 'none'
function enter() {
    document.getElementById('name').innerHTML = document.getElementById('inputname').value
    localStorage.setItem('name', document.getElementById('inputname').value)
    document.getElementById('startingframe').style.opacity = 0
    document.getElementById('startingframe').style.zIndex = 0
    setTimeout(() => {
        document.getElementById('startingframe').style.display = 'hide'
    }, 400);
}

function overlaps(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();
    const isInHoriztonalBounds = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
    return isOverlapping;
}

function attack() {
    playerSword.style.display = 'block'
    setTimeout(() => {
        playerSword.style.display = 'none'
    }, 500);
}

function livingEnemies() {
    return document.querySelectorAll(".enemy:not(.dead)")
}

function enemyHide(enemy) {
    if (enemy.id === 'enemy1') {
        enemy.style.transform = "translate(100px,100px) rotate(-45deg)"
        enemy1sword.style.display = 'none'
        enemy.classList.add('hide')
        setTimeout(() => {
            enemy.style.transform = "rotate(-45deg)"
            enemy.classList.remove('hide')
        }, 600);
    } else if (enemy.id === 'enemy2') {
        enemy.style.transform = "translate(100px,-100px) rotate(45deg)"
        enemy1sword.style.display = 'none'
        enemy.classList.add('hide')
        setTimeout(() => {
            enemy.style.transform = "rotate(45deg)"
            enemy.classList.remove('hide')
        }, 600);
    } else if (enemy.id === 'enemy3') {
        enemy.style.transform = "translate(-100px,-100px) rotate(-45deg)"
        enemy1sword.style.display = 'none'
        enemy.classList.add('hide')
        setTimeout(() => {
            enemy.style.transform = "rotate(-45deg)"
            enemy.classList.remove('hide')
        }, 600);
    }
}

function enemyBlock(enemy) {
    if (!enemy.classList.contains('hide')) {
        if (enemy.id === 'enemy1') {
            enemy1sword.style.display = 'block'
            setTimeout(() => {
                enemy1sword.style.display = 'none'
            }, 500);
        } else if (enemy.id === 'enemy2') {
            enemy2sword.style.display = 'block'
            setTimeout(() => {
                enemy2sword.style.display = 'none'
            }, 500);
        } else if (enemy.id === 'enemy3') {
            enemy3sword.style.display = 'block'
            setTimeout(() => {
                enemy3sword.style.display = 'none'
            }, 500);
        }
    }
}

let cancelled = false
function randomEnemyHide() {
    if (cancelled == true) {
        return
    }
    var randomEnemyNo = Math.random() * livingEnemies().length
    randomEnemyNo = Math.floor(randomEnemyNo)
    var enemy = livingEnemies()[randomEnemyNo]

    var randomDelay = Math.random() * 500 + 500

    setTimeout(() => {
        enemyHide(enemy)
        randomEnemyHide()
    }, randomDelay);
}

function randomEnemyBlock() {
    if (cancelled == true) {
        return
    }
    var randomEnemyNo = Math.random() * livingEnemies().length
    randomEnemyNo = Math.floor(randomEnemyNo)
    var enemy = livingEnemies()[randomEnemyNo]

    var randomDelay = Math.random() * 500

    setTimeout(() => {
        enemyBlock(enemy)
        randomEnemyBlock()
    }, randomDelay);
}

function start() {
    document.getElementById('countdown').style.display = 'flex'
    document.getElementById('countdown').style.opacity = '100%'
    var timeleft = 3;
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "GO!";
            setTimeout(() => {
                document.getElementById('countdown').style.opacity = '0%'
                setTimeout(() => {
                    document.getElementById('countdown').style.display = 'none'
                    setTimeout(() => {
                        ballcontainer.classList.add('rotateclockwise')
                        cancelled = false
                        randomEnemyHide()
                        randomEnemyBlock()
                    }, 100);
                }, 400);
            }, 1000);
        }
        else if (timeleft == 2) {
            document.getElementById("timer").innerHTML = timeleft;
            document.getElementById('countdown').style.opacity = '85%'
        } else if (timeleft == 1) {
            document.getElementById("timer").innerHTML = timeleft;
            document.getElementById('countdown').style.opacity = '75%'
        } else {
            document.getElementById("timer").innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);
}

function hide() {
    player.style.transform = "translate(-100px,100px) rotate(45deg)"
    setTimeout(() => {
        player.style.transform = "rotate(45deg)"
    }, 600);
}

setInterval(() => {
    let playerswordcheck = overlaps(playerSword, ball)
    let playerdies = overlaps(playercore, ball)
    let enemy1dies = overlaps(enemy1core, ball)
    let enemy2dies = overlaps(enemy2core, ball)
    let enemy3dies = overlaps(enemy3core, ball)
    let enemysword1check = overlaps(enemy1sword, ball)
    let enemysword2check = overlaps(enemy2sword, ball)
    let enemysword3check = overlaps(enemy3sword, ball)
    if (playerdies) {
        player.classList.add('dead')
        ballcontainer.className = ''
        setTimeout(() => {
            let deadmessage = confirm("You're Dead, Try again?")
            if (deadmessage) {
                cancelled = true
                ballcontainer.className = ''
                ballcontainer.classList.add('startingpoint')
                player.classList.remove('dead')
                enemy1.classList.remove('dead')
                enemy2.classList.remove('dead')
                enemy3.classList.remove('dead')
                document.getElementById('startingframe').style.opacity = '0%'
                document.getElementById('startingframe').style.zIndex = 0
                setTimeout(() => {
                    document.getElementById('startingframe').style.display = 'none'
                }, 400);
            } else {
                cancelled = false
                window.location.reload()
            }
        }, 100);
    } else if (enemy1dies) {
        enemy1.classList.add('dead')
        if (!livingEnemies().length) {
            let wincheck = confirm('You Win! Wanna play again?')
            if (wincheck) {
                cancelled = true
                ballcontainer.className = ''
                ballcontainer.classList.add('startingpoint')
                player.classList.remove('dead')
                enemy1.classList.remove('dead')
                enemy2.classList.remove('dead')
                enemy3.classList.remove('dead')
                document.getElementById('startingframe').style.opacity = '0%'
                document.getElementById('startingframe').style.zIndex = 0
                setTimeout(() => {
                    document.getElementById('startingframe').style.display = 'none'
                }, 400);
            } else {
                cancelled = false
                window.location.reload()
            }
        }
    } else if (enemy2dies) {
        enemy2.classList.add('dead')
        if (!livingEnemies().length) {
            let wincheck = confirm('You Win! Wanna play again?')
            if (wincheck) {
                cancelled = true
                ballcontainer.className = ''
                ballcontainer.classList.add('startingpoint')
                player.classList.remove('dead')
                enemy1.classList.remove('dead')
                enemy2.classList.remove('dead')
                enemy3.classList.remove('dead')
                document.getElementById('startingframe').style.opacity = '0%'
                document.getElementById('startingframe').style.zIndex = 0
                setTimeout(() => {
                    document.getElementById('startingframe').style.display = 'none'
                }, 400);
            } else {
                cancelled = false
                window.location.reload()
            }
        }
    } else if (enemy3dies) {
        enemy3.classList.add('dead')
        if (!livingEnemies().length) {
            let wincheck = confirm('You Win! Wanna play again?')
            if (wincheck) {
                cancelled = true
                ballcontainer.className = ''
                ballcontainer.classList.add('startingpoint')
                player.classList.remove('dead')
                enemy1.classList.remove('dead')
                enemy2.classList.remove('dead')
                enemy3.classList.remove('dead')
                document.getElementById('startingframe').style.opacity = '0%'
                document.getElementById('startingframe').style.zIndex = 0
                setTimeout(() => {
                    document.getElementById('startingframe').style.display = 'none'
                }, 400);
            } else {
                cancelled = false
                window.location.reload()
            }
        }
    }
    if (playerswordcheck) {
        if (ballcontainer.classList.contains('rotateclockwise')) {
            ballcontainer.classList.add('rotatecounterclockwise')
            ballcontainer.classList.add('fromplayerclockwise')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('rotateclockwise')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromenemy1clockwise')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('fromplayercounter')

        } else {
            ballcontainer.classList.add('fromplayercounter')
            ballcontainer.classList.add('rotateclockwise')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromenemy1clockwise')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('rotatecounterclockwise')
        }
    } else if (enemysword1check) {
        if (ballcontainer.classList.contains('rotatecounterclockwise')) {
            ballcontainer.classList.add('rotateclockwise')
            ballcontainer.classList.add('fromenemy1counter')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('rotatecounterclockwise')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromplayercounter')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('fromenemy1clockwise')
        } else {
            ballcontainer.classList.add('rotatecounterclockwise')
            ballcontainer.classList.add('fromenemy1clockwise')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromplayercounter')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('rotateclockwise')
        }
    } else if (enemysword2check) {
        if (ballcontainer.classList.contains('rotatecounterclockwise')) {
            ballcontainer.classList.add('rotateclockwise')
            ballcontainer.classList.add('fromenemy2counter')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('rotatecounterclockwise')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromplayercounter')
            ballcontainer.classList.remove('fromenemy1clockwise')
        } else {
            ballcontainer.classList.add('rotatecounterclockwise')
            ballcontainer.classList.add('fromenemy2clockwise')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromplayercounter')
            ballcontainer.classList.remove('fromenemy1clockwise')
            ballcontainer.classList.remove('rotateclockwise')
        }
    } else if (enemysword3check) {
        if (ballcontainer.classList.contains('rotatecounterclockwise')) {
            ballcontainer.classList.add('rotateclockwise')
            ballcontainer.classList.add('fromenemy3counter')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('rotatecounterclockwise')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromplayercounter')
            ballcontainer.classList.remove('fromenemy1clockwise')
        } else {
            ballcontainer.classList.add('rotatecounterclockwise')
            ballcontainer.classList.add('fromenemy3clockwise')
            ballcontainer.classList.remove('fromenemy2clockwise')
            ballcontainer.classList.remove('startingpoint')
            ballcontainer.classList.remove('fromenemy2counter')
            ballcontainer.classList.remove('fromenemy1counter')
            ballcontainer.classList.remove('fromplayerclockwise')
            ballcontainer.classList.remove('fromplayercounter')
            ballcontainer.classList.remove('fromenemy1clockwise')
            ballcontainer.classList.remove('rotateclockwise')
        }
    }
}, 150);
