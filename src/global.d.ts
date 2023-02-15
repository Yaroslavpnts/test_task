declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}
