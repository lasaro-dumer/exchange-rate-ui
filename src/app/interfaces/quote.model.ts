export interface IQuote {
    RateId: Number;
    CurrencyCode: String;
    EffectiveDate: Date;
    BuyValue: Number;
    SellValue: Number;
}

export interface IRefreshResultModel {
    RatesLoaded: IQuote[],
    Errors: String[]
}

export class CurrencyExchangeModel {
    constructor(
        public userId?: Number,
        public foreignCurrencyCode?: String,
        public direction?: Number,
        public localCurrencyAmount?: Number) {

    }
}