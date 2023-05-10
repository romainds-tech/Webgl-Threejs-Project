import { ImageLoader, Texture } from "three";

export default class CustomImageLoader {
  private static instance: CustomImageLoader;
  private static imageLoader: ImageLoader;
  private constructor() {
    CustomImageLoader.instance = this;
    CustomImageLoader.imageLoader = new ImageLoader();
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
}
