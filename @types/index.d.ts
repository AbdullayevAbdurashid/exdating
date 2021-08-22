// declare module "*.svg?sprite";
// declare module "svg-sprite-loader/runtime/sprite.build";

declare module "*.svg" {
  const content: any;
  export default content;
}
