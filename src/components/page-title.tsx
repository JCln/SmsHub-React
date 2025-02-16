import ImageWrapper from "./image";

interface Props {
    title?: string,
    className: string,
    isIcon: boolean
}
const PageTitle = ({ title, className, isIcon }: Props) => {
    return (
        <h3 className='page-title'>
            {
                isIcon ?
                    <i className={className}></i> :
                    <ImageWrapper className='' alt='' fileName={className}></ImageWrapper>
            }
            {title}
        </h3>
    )
}
export default PageTitle;