import React from 'react'
import './Card.scss'

interface CardProps {
    img: string
    name: string
    price: number
    description: string
}

const Card: React.FC<CardProps> = ({ name, price, description, img }) => {
    return (
        <div className='card'>
            <div className='card-image'>
                <img src={img} alt={name} />
            </div>
            <div className='card-text'>
                <div className='card-info'>
                    <h2>{name}</h2>
                    <p><strong>${price}</strong></p>
                </div>
                <p className='description'>{description}</p>
            </div>
        </div>
    )
}

export default Card
