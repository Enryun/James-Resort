import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import Loading from './Loading';
import {withRoomConsumer} from '../Context';

function RoomsContainer ({context}) {
    
    const {loading, sortedRooms, rooms} = context;

    if (loading) {
        return <Loading />
    }
        
    return (
        <div>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </div>
    )
}

//High Order Function Way
export default withRoomConsumer(RoomsContainer);


// Context API Document Way

// import React from 'react';
// import RoomFilter from './RoomFilter';
// import RoomList from './RoomList';
// import {RoomConsumer} from '../Context';
// import Loading from './Loading';

// const RoomsContainer = () => {
//     return (
//         <RoomConsumer>
//             {value => {
//               const {loading, sortedRooms, rooms} = value;

//                 if (loading) {
//                     return <Loading />
//                 }

//                 return (
//                     <div>
//                         Hello from RoomsContainer
//                         <RoomFilter rooms={rooms} />
//                         <RoomList rooms={sortedRooms} />
//                     </div>
//                 )
//             }}
//         </RoomConsumer>  
//     )
// }

// export default RoomsContainer
