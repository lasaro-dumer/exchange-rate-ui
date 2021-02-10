export interface IQuote {
    rateId: Number;
    currencyCode: String;
    effectiveDate: Date;
    buyValue: Number;
    sellValue: Number;
}

export interface IRefreshResultModel {
    ratesLoaded: IQuote[],
    errors: String[]
}

export class CurrencyExchangeModel {
    constructor(
        public userId?: Number,
        public foreignCurrencyCode?: String,
        public direction?: Number,
        public localCurrencyAmount?: Number) {
    }
}

export class CurrencyExchangeTransactionModel {
    constructor(
        public id?: Number,
        public userId?: Number,
        public localCurrencyAmount?: Number,
        public foreignCurrencyAmount?: Number,
        public foreignCurrencyCode?: String,
        public transactionDate?: Date) {
    }
}