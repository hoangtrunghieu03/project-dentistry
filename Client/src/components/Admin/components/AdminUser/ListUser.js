import React from 'react';
import User from './User';


function ListUser(props) {
    const {users} = props

    return (
        <div className="admin-user-list">
            <table>
                <tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Số ĐT</th>
                </tr>
                {
                    users.map((item, index) => (<User user={item} number={index}></User>))
                }
            </table>
        </div>
    );
}

export default ListUser;