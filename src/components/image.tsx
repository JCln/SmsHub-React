import UseImage from './use-image'
interface IImage {
    fileName: string | any,
    className: string
    alt?: string,
}
const ImageWrapper = ({ fileName, alt, className }: IImage) => {
    const { loading, error, image } = UseImage(fileName);

    return (
        <>
            {loading ? (
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i>
            ) : (
                <img className={`page-title-img Image${className
                    ? className.padStart(className.length + 1)
                    : ''
                    }`}
                    src={image}
                    alt=""
                />


            )}
        </>
    )
}

export default ImageWrapper