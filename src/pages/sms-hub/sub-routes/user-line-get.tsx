import PageTitle from '../../../components/page-title'
import UserByLineIds from './user-by-line-ids'
import LineByUserIds from './line-by-user-ids'

export default function UserLineGet() {
    return (
        <>
            <div className='outer-container'>
                <PageTitle title='جستجو خط' className='simcrd.png' isIcon={false}></PageTitle>
                <div className='d-grid two_columns gap-12'>
                    <UserByLineIds></UserByLineIds>
                    <LineByUserIds></LineByUserIds>
                </div>
            </div>
        </>
    )
}
