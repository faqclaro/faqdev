// components/Banner.js
export default function Banner({ banner }) {
  // Certifique-se de que temos as imagens corretas
  if (!banner || !banner.desktopImage || !banner.mobileImage) {
    return null; // ou alguma imagem de fallback
  }

  return (
    <div className="banner-container">
      <picture>
        <source
          media="(max-width: 639px)"
          srcSet={banner.mobileImage.filename}
        />
        <source
          media="(min-width: 640px)"
          srcSet={banner.desktopImage.filename}
        />
        <img
          src={banner.desktopImage.filename} // Imagem padrão para desktop
          alt="Banner"
          style={{ width: '100%', height: 'auto' }}
        />
      </picture>
    </div>
  );
}
