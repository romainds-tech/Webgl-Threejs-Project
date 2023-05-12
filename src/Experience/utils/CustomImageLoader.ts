import { ImageLoader, Texture, TextureLoader } from "three";

export default class CustomImageLoader {
  private static instance: CustomImageLoader;
  private static imageLoader: ImageLoader;
  private static textureLoader: TextureLoader;
  private constructor() {
    CustomImageLoader.instance = this;
    CustomImageLoader.imageLoader = new ImageLoader();
    CustomImageLoader.textureLoader = new TextureLoader();
  }

  public static getInstance(): CustomImageLoader {
    if (!CustomImageLoader.instance) {
      CustomImageLoader.instance = new CustomImageLoader();
    }
    return CustomImageLoader.instance;
  }

  loadOneImageAsTexture(url: string): Texture {
    return new Texture(CustomImageLoader.imageLoader.load(url));
  }

  loadImage(url: string) {
    return CustomImageLoader.textureLoader.load(url);
  }
}
