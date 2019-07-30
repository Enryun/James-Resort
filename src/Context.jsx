import React, { Component } from 'react';
import Items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {


    state={
        rooms: [],
        sortedRoom: [],
        featuredRooms: [],
        loading: true
    }
    

    formatData = items => {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image =>
                image.fields.file.url);

            let rooms = {...item.fields, images, id};
            return rooms;
        });

        return tempItems;
    }

    componentDidMount() {
        let rooms = this.formatData(Items);
        console.log(rooms);
        let featuredRooms = rooms.filter(room => room.featured === true);

        this.setState({
            rooms,
            featuredRooms,
            sortedRoom: rooms,
            loading: false
        })
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer (Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export {RoomConsumer, RoomProvider, RoomContext};