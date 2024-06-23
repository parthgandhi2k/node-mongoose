type DefaultFieldsType = "createdAt" | "updatedAt" | "isDeleted";

export const excludeFields = <
    T extends object,
    M extends R extends true ? Exclude<keyof T, DefaultFieldsType> : keyof T = never,
    R extends boolean = true
>(
    obj: T,
    removeFields: M[] = [],
    removeDefaults: R = true as R
): Omit<T, R extends true ? M | DefaultFieldsType : M> => {
    const defaultFields = ["createdAt", "updatedAt", "isDeleted"];

    let fieldsToRemove: Array<string | number | symbol> = defaultFields;

    if (!removeDefaults) fieldsToRemove = removeFields;
    else fieldsToRemove.concat(removeFields);

    fieldsToRemove.forEach((k) => delete obj[k as keyof typeof obj]);

    return obj;
};
