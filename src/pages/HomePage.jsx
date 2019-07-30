import React from 'react';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FeaturesRoom from '../components/FeaturesRoom';


const HomePage = () => {
    return (
        <div>
            <Hero>
                <Banner title='luxurious rooms'
                        subtitle='deluxe rooms starting at 299$'>

                    <Link to='/rooms' className='btn-primary'>
                        Our Rooms
                    </Link>
                </Banner>
            </Hero>
            
            <Services />

            <FeaturesRoom />

        </div>
        
    )
}

export default HomePage;
