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

        // Assign .img1 to .img5 to the first five unique images
        let classIndex = uniqueImages.indexOf(src);
        if (classIndex !== -1) {
            img.classList.add('img' + (classIndex + 1));
        } else {
            // For the duplicate, assign the class of the image it duplicates
            img.classList.add('img' + (dupIdx + 1));
        }

        img.dataset.idx = idx;
        img.onclick = () => selectImage(idx, img);
        imagesDiv.appendChild(img);
    });
}