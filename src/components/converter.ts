export class Converter {

    static convertIdToTitle = (dataSource: any, dictionary: any[], toConvert: string) => {
        dictionary.map(dictionary => {
            dataSource.map((dataSource: { [x: string]: any; }) => {
                if (dictionary.id === dataSource[toConvert])
                    dataSource[toConvert] = dictionary.title;
            })
        });
    }
}