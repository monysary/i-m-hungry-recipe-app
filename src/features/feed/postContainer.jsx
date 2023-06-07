import React from 'react';
import PostCard from './card';

const recipe = [
    {
        "ingredients": "[{\"name\":\"Chicken\",\"amount\":4,\"unit\":\"Breasts\"},{\"name\":\"Rice\",\"amount\":2,\"unit\":\"cups\"}]",
        "instructions": "[\"1. In a large skillet, cook chicken over medium heat until browned on both sides.\",\"2. Add rice and 4 cups of water, stir and bring to a boil.\",\"3. Reduce heat, cover and let the chicken and rice simmer for 20-25 minutes, or until the rice is cooked and the chicken is no longer pink inside.\",\"4. Remove from heat and serve.\"]",
        "id": 17,
        "title": "Chicken and Rice",
        "servings": 4,
        "notes": null,
        "createdAt": "2023-06-07T05:20:35.000Z",
        "updatedAt": "2023-06-07T05:20:35.000Z",
        "userId": "0f978e79-b436-46a2-8d4a-8086ccc9c5c9"
    }
]

/** 
 * TODO: 
 *      - add toggle function to show open and closed post card
 *      - include username is savedRecipes table 
 * 
 */
export default function PostContainer() {
    return (
        <div className='px-2 md:px-4'>
            <PostCard recipe={recipe} />
        </div>

    );
}


