declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}
declare module "*.less" {
  const styles: Record<string, string>;
  export default styles;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}
