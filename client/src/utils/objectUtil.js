import { localeConstants_en } from '../constants/localConstants';
class ObjectUtil {
    isEmpty = (myObject) => {
        for (var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    bindAction = (data, columnName, action) => {
        data.columnDefs.filter((iteratedValue) => {
            if (iteratedValue.field && iteratedValue.field === columnName) {
                return iteratedValue.cellRendererParams.editAction = action;
            }
        });
    };
    getlocalizeData = () => {
        return localeConstants_en;
    };
}
const objectUtil = new ObjectUtil();
export default objectUtil;

