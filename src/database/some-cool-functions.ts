interface Mapping {
    [key: string]: string;
}
const mapDataToArray = <T>(dataArray: any[], mapping: Mapping): T[] => {
    const resultArray: T[] = [];

    dataArray.forEach(item => {
        const mappedItem: any = {available:true, quantity:Math.floor(Math.random() * 101),rating:Math.random()*5};
        for (const sourceKey in mapping) {
            const targetKey = mapping[sourceKey];
            switch(sourceKey){
                case 'images':
                case 'specifications':
                    mappedItem[targetKey] = stringsToArray(item[sourceKey]);
                    break;
               default:
                   mappedItem[targetKey] = removeTags(item[sourceKey]);
            }
        }
        resultArray.push(mappedItem);
    });

    return resultArray;
}
const removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}
function stringsToArray(input:string){
    return removeTags(input).split('|')
}

export {mapDataToArray,removeTags}