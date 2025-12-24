// Optional: Add smooth fade-in when scrolling into view
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

function loadImages(folder, prefix, count, galleryId) {
  const gallery = document.getElementById(galleryId);

  for (let i = 1; i <= count; i++) {
    const img = document.createElement("img");
    img.src = `images/${folder}/${prefix}${i}.jpg`;
    img.alt = folder;
    if (i > 3) { // show only first 3 initially
      img.classList.add("hidden");
    }
    gallery.appendChild(img);
  }
}

// Load galleries
loadImages("engagement", "eng", 20, "engagementGallery");
loadImages("wedding", "wed", 20, "weddingGallery");
loadImages("baby", "baby", 20, "babyGallery");
loadImages("festive", "fest", 20, "festiveGallery");


// Handle "View More"
document.querySelectorAll('.viewMoreBtn').forEach(button => {
  button.addEventListener('click', () => {
    const galleryId = button.dataset.gallery;
    const gallery = document.getElementById(galleryId);
    const hiddenImages = Array.from(gallery.querySelectorAll('.hidden'));

    // Reveal next 9 images (to make total 12 visible after first click)
    const toReveal = hiddenImages.slice(0, 9);
    toReveal.forEach(img => {
      img.classList.remove('hidden');
      void img.offsetWidth;
      img.classList.add('reveal');
      img.addEventListener('animationend', () => {
        img.classList.remove('reveal');
      }, { once: true });
    });

    // After 12 visible, make gallery scrollable
    const visibleCount = gallery.querySelectorAll('img:not(.hidden)').length;
    if (visibleCount >= 12) {
      gallery.classList.add('scrollable');
    }

    // Show "View Less" button
    const viewLessBtn = gallery.parentElement.querySelector('.viewLessBtn');
    viewLessBtn.classList.remove('hidden');

    // Hide "View More" if no hidden left
    if (gallery.querySelectorAll('.hidden').length === 0) {
      button.style.display = 'none';
    }
  });
});

// Handle "View Less"
document.querySelectorAll('.viewLessBtn').forEach(button => {
  button.addEventListener('click', () => {
    const galleryId = button.dataset.gallery;
    const gallery = document.getElementById(galleryId);
    const images = Array.from(gallery.querySelectorAll('img'));

    // Hide all except first 3
    images.forEach((img, index) => {
      if (index > 2) {
        img.classList.add('hidden');
      }
    });

    // Reset gallery state: remove scroll and reset height
    gallery.classList.remove('scrollable');
    gallery.scrollTop = 0; // reset scroll position

    // Show "View More" again
    const viewMoreBtn = gallery.parentElement.querySelector('.viewMoreBtn');
    viewMoreBtn.style.display = 'inline-block';

    // Hide "View Less"
    button.classList.add('hidden');
  });
});
