export class Book {
    constructor(
        public title: string,
        public authors: string[],
        public publishedDate: string,
        public description: string,
        public industryIdentifiers: { type: string, identifier: string }[],
        public pageCount: number,
        public printType: string,
        public maturityRating: string,
        public language: string,
        public id: string,
        public link: string,
        public thumbnail: string,
        public images: {}
    ) { }
}