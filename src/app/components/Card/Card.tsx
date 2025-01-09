'use client'
import React from 'react'
import {useRouter} from 'next/navigation'

interface CardProps {
    img: string
    name: string
    price: number
    description: string
    id: number
    categorie: string
    stock: number
}

const Card: React.FC<CardProps> = ({name, price, description, categorie, img, stock, id}) => {
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/product/${id}`)
    }

    return (
        <div className='card' onClick={handleCardClick} style={{cursor: 'pointer'}}>
            <div className='card-image'>
                <img src={img} alt={name}/>
            </div>
            <div className='card-text'>
                <div className={'title-3'}>{name}</div>
                <div className="title-4 category">{categorie}</div>
                <div className={'body price'}>{price} €</div>
                <div className="flex -justify-space-between -align-center">
                    <div className="title-4 tva">{price} € <span className="small">incl. tva</span></div>
                    <div className="body stock">Stock : {stock}</div>
                </div>
            </div>
        </div>
    )
}

export default Card
