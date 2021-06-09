import TubularLangDef from './languages/TubularLangDef';
export declare class LangBase<T> {
    private data;
    private currentLanguage;
    constructor(langKey: string, initialLanguage: T);
    translate(key: string, ...args: any[]): string;
    changeLanguage(langKey: string): void;
    addLanguage(langKey: string, data: T): void;
}
export declare class LangDefault extends LangBase<TubularLangDef> {
    constructor();
}
declare const Lang: LangDefault;
export default Lang;
