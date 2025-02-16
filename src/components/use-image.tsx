import { useEffect, useState } from 'react'

const UseImage = (fileName: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../images/${fileName}`) // change relative path to suit your needs
                setImage(response.default)
            } catch (err) {
                setError(err => err)
            } finally {
                setLoading(false)
            }
        }

        fetchImage()
    }, [fileName])

    return {
        loading,
        error,
        image,
    }
}

export default UseImage