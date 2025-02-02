import { useErrorBoundary } from 'react-error-boundary';

export default function Fallback() {
    const { resetBoundary } = useErrorBoundary();
    return (
        <>
            <p>مشکلی پیش آمد</p>
            <button onClick={resetBoundary}>تلاش مجدد</button>
        </>
    )
}
