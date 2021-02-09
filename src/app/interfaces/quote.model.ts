export interface IQuote {
    RateId: Number;
    CurrencyCode: String;
    EffectiveDate: Date;
    BuyValue: Number;
    SellValue: Number;
}

export interface IRefreshResultModel{
    RatesLoaded: IQuote[],
    Errors: String[]
}