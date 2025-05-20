// declare interface Item {
//   title: string
//   link: string
// }

declare type FieldSubset<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
