import React from "react";

const brands = [
  { src: "/chanel.png", alt: "Chanel" },
  { src: "/lv.png", alt: "Louis Vuitton" },
  { src: "/prada.png", alt: "Prada" },
  { src: "/calvinklein.png", alt: "Calvin Klein" },
  { src: "/denim.png", alt: "Denim" },
];

export default function BrandLogos() {
  return (
    <div className="border-t">
      <div className="max-w-7xl mx-auto py-10 px-8">
        <div className="flex justify-center flex-wrap gap-12">
          {brands.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-14 opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}