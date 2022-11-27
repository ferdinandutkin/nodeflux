export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type SettersOf<T> = {[Property in keyof T as `set${Capitalize<string & Property>}`]-? : (value : T[Property]) => void}

export type WithSetters<T> = T & SettersOf<T>
