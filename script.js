//your code here
// You can use any 5 unique image URLs. Here are some sample images:
const uniqueImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=200&q=80"
];

let images = [];
let selected = [];
let canClick = true;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupImages() {
    // Pick a random image to duplicate
    const dupIdx = Math.floor(Math.random() * uniqueImages.length);
    images = uniqueImages.slice();
    images.push(uniqueImages[dupIdx]);
    shuffle(images);

    const imagesDiv = document.getElementById('images');
    imagesDiv.innerHTML = '';
    images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'tile';
        img.dataset.idx = idx;
        img.onclick = () => selectImage(idx, img);
        imagesDiv.appendChild(img);
    });
}

function selectImage(idx, imgElem) {
    if (!canClick) return;
    if (selected.length === 2) return;
    if (selected.some(sel => sel.idx === idx)) return; // Prevent double-clicking same image

    imgElem.classList.add('selected');
    selected.push({idx: idx, src: images[idx]});

    document.getElementById('reset').style.display = 'inline';

    if (selected.length === 2) {
        document.getElementById('verify').style.display = 'inline';
    }
}

function resetAll() {
    selected = [];
    canClick = true;
    document.getElementById('para').textContent = '';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('h').textContent = "Please click on the identical tiles to verify that you are not a robot.";
    Array.from(document.getElementsByClassName('tile')).forEach(img => img.classList.remove('selected'));
}

function verify() {
    canClick = false;
    document.getElementById('verify').style.display = 'none';
    if (selected.length === 2 && selected[0].src === selected[1].src) {
        document.getElementById('para').textContent = "You are a human. Congratulations!";
    } else {
        document.getElementById('para').textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
}

document.getElementById('reset').onclick = function() {
    resetAll();
};
document.getElementById('verify').onclick = function() {
    verify();
};

// Initial setup
setupImages();