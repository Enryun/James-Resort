import React, { Component } from 'react';
import Title  from './Title';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';



export default class Services extends Component {

    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: 'free cocktails',
                info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sapien lorem, bibendum quis felis a, malesuada ultrices mi. Vestibulum tempus'
            },
            {
                icon: <FaHiking />,
                title: 'Enless Fun',
                info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sapien lorem, bibendum quis felis a, malesuada ultrices mi. Vestibulum tempus'
            },
            {
                icon: <FaShuttleVan />,
                title: 'free shuter',
                info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sapien lorem, bibendum quis felis a, malesuada ultrices mi. Vestibulum tempus'
            },
            {
                icon: <FaBeer />,
                title: 'craft beer',
                info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sapien lorem, bibendum quis felis a, malesuada ultrices mi. Vestibulum tempus'
            }
        ]
    }


    render() {
        return (
            <section className='services'>
                <Title title='services'/>
                <div className='services-center'>
                    {this.state.services.map((item, index) => {
                        return <article key={index} className='service'>
                                    <span>{item.icon}</span>
                                    <h6>{item.title}</h6>
                                    <p>{item.info}</p>
                                </article>
                    })}
                </div>
            </section>
        )
    }
}
