import React from 'react';
import {useContext} from 'react';
import {RoomContext} from '../Context';
import Title from './Title';

const RoomFilter = () => {

    //React Hook Way
    const context = useContext(RoomContext);

    const {
        handleChange,
        rooms,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    //get All Unique Value for select
    const getUnique = (items, value) => {
        return [...new Set(items.map(item => item[value]))]
    }
    
   
    let types = getUnique(rooms, 'type');
    //add all value
    types = ['all', ...types];
    //map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>
            {item}
        </option>
    })

    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option value={item} key={index}>
            {item}
        </option>
    })

    return (
        <section className='filter-container'>
           <Title title='search rooms' />
           <form className='filter-form'>

                {/* select type */}
                <div className='form-group'>
                    <label htmlFor='type'>room type</label>
                    <select 
                        name='type'
                        id='type'
                        value={type}
                        className='form-control'
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* end select type */}

                {/* guest */}
                <div className='form-group'>
                    <label htmlFor='capacity'>Guests</label>
                    <select 
                        name='capacity'
                        id='capacity'
                        value={capacity}
                        className='form-control'
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* end guest  */}

                {/* room Price */}
                <div className='form-group'>
                    <label htmlFor='price'>
                        room price ${price}
                    </label>
                    <input name='price'
                           type='range'
                           value={price}
                           className='form-control'
                           onChange={handleChange}
                           id='price'
                           min={minPrice}
                           max={maxPrice} 
                     />
                </div>
                {/* end room Price */}

                {/* Size */}
                <div className='form-group'>
                    <label htmlFor='size'>room size SQRT</label>
                    <div className='size-inputs'>
                        <input type='number'
                               name='minSize'
                               id='size'
                               value={minSize}
                               onChange={handleChange}
                               className='size-input' 
                         />
                         <input type='number'
                               name='maxSize'
                               id='size'
                               value={maxSize}
                               onChange={handleChange}
                               className='size-input' 
                         />
                    </div>
                </div>
                {/* end Size */}

                {/* extras */}
                <div className='form-group'>
                    <div className='single-extra'>
                        <input type='checkbox'
                               name='breakfast' 
                               id='breakfast'
                               checked={breakfast}
                               onChange={handleChange} 
                        />
                        <label htmlFor='breakfast'>breakfast</label>
                    </div>
                    <div className='single-extra'>
                        <input type='checkbox'
                               name='pets' 
                               id='pets'
                               checked={pets}
                               onChange={handleChange} 
                        />
                        <label htmlFor='pets'>pets</label>
                    </div>
                </div>
                {/* end extras */}

           </form>
        </section>
    )
}

export default RoomFilter
