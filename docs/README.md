# DropPixel
A reimplementation of tetris, and the first (and perhaps only) in a set of games that tries to encode color space as a 3rd dimension in classic 2-D games

## Getting started
`npm start` will do it. I don't use docker for dev, but expect to deploy it eventaully, it'll run on localhost:3000


## Playing

### Gameplay
- Fill a row with all white squares to eliminate a row
- The tetrominoes fall in the 3 primary colors (for computers), Red, Green, and Blue
- These primary colors mix together in what might be an unintuitive way
  - Red and Green make Yellow
  - Blue and Green make Cyan
  - Red and Blue make Magenta
  - Red, Blue and Green make White

### Controls
- Arrow keys move
- Up arrow rotates
- Space quick-drops the piece
- P pauses and unpauses the game
- T sets and unsets triplex (read: easy) mode

### Other notes:
This project results less in an entertaining game, and more a sort neat prodding of the limits of human perception and the brain's capacity for information encoding.

## Todo
- make the game end
- make a startup screen (and maybe a thin routing layer to navigate screens)
- put settings on their own screen in the pause menu
- put it on the internet
- keep a user's high score
- tune the pacing of the game, it feels a little slow at first
- re-introduce s and z tiles (maybe, I still never liked them)
