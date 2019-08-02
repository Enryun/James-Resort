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
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        
        this.setState({
            [name]: value,          
        }, this.filterRooms)
    }

    filterRooms = () => {
        let {rooms,
             type,
             capacity,
             price,
             minSize,
             maxSize,
             breakfast,
             pets   
        } = this.state;

        //All the Rooms
        let tempRooms = [...rooms];

        //Transform value for Guest, Price
        capacity = parseInt(capacity);
        price = parseInt(price);

        //filter by Type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        };

        //filter by Capacity 
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //filter by Price
        tempRooms = tempRooms.filter(room => room.price <= price)

        //filter by Size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //filter by Breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //filter by Pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        //Change State
        this.setState({
            sortedRooms: tempRooms
        })
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


//High Order Fuction Way
export function withRoomConsumer (Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export {RoomConsumer, RoomProvider, RoomContext};