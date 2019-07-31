import React, { Component } from 'react';
import Items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {


    state={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false, 
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
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(room => room.price));
        let maxSize = Math.max(...rooms.map(room => room.size));
        

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice: maxPrice,
            maxSize: maxSize
        })
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    handleChange = event => {
        const type = event.target.type;
        const name = event.target.name;
        const value = event.target.value;
        console.log(type, name, value);
        
    }

    filterRooms = () => {
        console.log('Hi')
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,
                                            getRoom: this.getRoom,
                                            handleChange: this.handleChange
                                            }}>
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