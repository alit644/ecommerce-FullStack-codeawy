import type { IProductCard } from "../interfaces";

//! تقوم بتحويل روابط الصور القديمة (urls) إلى معرفات الصور (IDs) من بيانات المنتج القديم (imagesData)
export function mapUrlsToIds(
  urls: string[],
  imagesData: IProductCard["images"]
) {
  if (!imagesData) return [];
  return urls
    .map((url) => {
      const found = imagesData.find(
        (img) => img.url === url || img.url === url.replace("/small_", "/")
      );
      return found ? found.id : null;
    })
    .filter(Boolean) as (string | number)[];
}