import { classNames } from 'primereact/utils';
interface IProps<T> {
    collapsed: boolean;
    listOfData: T[];
    displayData: (data: T, index: number) => React.ReactNode;
}
export default function BooleanTableBody<T,>(props: IProps<T>) {

    console.log(props.displayData);
    return (<></>)
    // return (
    //     <i className={classNames('pi', { 'true-icon pi-check-circle': props.displayData, 'false-icon pi-times-circle': !props[0] })}></i>
    // )
}