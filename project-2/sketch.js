
let photos = [];
let polaroids = [];

let photoWidth = 110;
let photoHeight = 135;

function preload() {
  for (let i = 1; i <= 9; i++) {
    photos.push(loadImage("images/childhood" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 9; i++) {

    let column = i % 3;
    let row = floor(i / 3);

    polaroids.push({
      column: column,
      x: (column + 0.5) * (width / 3),
      y: -row * 350 - 150,
      speed: 1.4,
      angle: random(-12, 12),
      photo: i
    });
  }
}

function draw() {
  clear();

  for (let i = 0; i < polaroids.length; i++) {
    let p = polaroids[i];
    let photo = photos[p.photo];

    push();

    translate(p.x, p.y);
    rotate(radians(p.angle));

    // White Polaroid frame
    noStroke();
    fill(255, 250, 245, 220);
    rect(
      -photoWidth / 2,
      -photoHeight / 2,
      photoWidth,
      photoHeight
    );

    // Crop childhood photo into a square
    let cropSize = min(photo.width, photo.height);
    let cropX = (photo.width - cropSize) / 2;
    let cropY = (photo.height - cropSize) / 2;

    image(
      photo,
      -photoWidth / 2 + 8,
      -photoHeight / 2 + 8,
      photoWidth - 16,
      photoWidth - 16,
      cropX,
      cropY,
      cropSize,
      cropSize
    );

    pop();

    // Falling movement
    p.y = p.y + p.speed;

    // Repeat at the top, spaced from other photos
    if (p.y > height + 100) {
      let highest = 0;

      for (let j = 0; j < polaroids.length; j++) {
        if (polaroids[j].column === p.column) {
          highest = min(highest, polaroids[j].y);
        }
      }

      p.y = highest - 350;
      p.angle = random(-12, 12);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  for (let p of polaroids) {
    p.x = (p.column + 0.5) * (width / 3);
  }
}
