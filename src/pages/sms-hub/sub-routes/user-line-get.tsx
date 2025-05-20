import UserByLineIds from './user-by-line-ids'
import LineByUserIds from './line-by-user-ids'

export default function UserLineGet() {
    return (
        <>
            <div className='d-grid two_columns gap-12'>
                <UserByLineIds></UserByLineIds>
                <LineByUserIds></LineByUserIds>
            </div>
        </>
    )
}
