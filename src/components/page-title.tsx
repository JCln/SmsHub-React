import { useLocation } from "react-router";
import ImageWrapper from "./image";
import * as ENRoutes from '../constants/ENRoutes';

interface Props {
    title?: string,
    className: string,
    isIcon: boolean
}
const PageTitle = ({ title, className, isIcon }: Props) => {
    const location = useLocation();

    return (
        <h3 className='page-title'>
            {
                ENRoutes.getRoutesAndOptions().map(item => (
                    location.pathname === (item.link) ?
                        isIcon ?
                            <>
                                <i className={className}></i>
                                <div>
                                    {title ? title : item.header}
                                </div>
                            </>
                            :
                            <>
                                <ImageWrapper className='' alt='' fileName={className}></ImageWrapper>
                                <div>
                                    {title ? title : item.header}
                                </div>
                            </>
                        :
                        <></>
                ))
            }
        </h3>
    )
}
export default PageTitle;