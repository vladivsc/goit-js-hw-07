import { galleryItems } from "./gallery-items.js";

const refs = {
  galleryBox: document.querySelector(".gallery"),
  body: document.body,
};

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, description, original }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

refs.galleryBox.innerHTML = galleryItemsMarkup;

refs.galleryBox.addEventListener("click", onImageClick);

function onImageClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const originalImage = evt.target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${originalImage}" >
`);
  instance.show();

  refs.galleryBox.addEventListener("keydown", () => {
    if (evt.code === "Escape") {
      instance.close();
    }
  });
}
