import React from 'react';
// other imports...
interface IDataContext {
    tData: any
    setCurrentData: any
}
const DataContext = React.createContext<IDataContext|{}>({});
export default DataContext;